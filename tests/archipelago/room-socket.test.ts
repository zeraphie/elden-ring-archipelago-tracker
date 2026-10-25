import { describe, expect, test } from "bun:test";
import { clientVersion, LoginError, RoomSocket } from "../../src/archipelago/room-socket.js";
import { version } from "../../package.json";
import { roomInfo, TestSocket, TRACKER_VERSION } from "../fixtures/sockets.js";

const VERSION = roomInfo(false).version;

// A socket opened to a room that has, or hasn't, a password.
async function opened(password = false) {
  const socket = new TestSocket();
  const opening = RoomSocket.open("wss://archipelago.gg:61475", () => socket);
  socket.serve(roomInfo(password));
  return { socket, room: await opening };
}

describe("RoomSocket", () => {
  test("opens once the server sends RoomInfo, and says whether the room has a password", async () => {
    const { room } = await opened(true);
    expect(room.info.password).toBe(true);
  });

  test("logs in on the slot with its own tag and the Tracker tag, the server's version and every item", async () => {
    const { socket, room } = await opened();
    const login = room.logIn("Tarnished", TRACKER_VERSION);
    socket.serve({ cmd: "Connected", team: 0, slot: 1, slot_data: {} });
    expect((await login).slot).toBe(1);
    expect(socket.sent).toEqual([
      expect.objectContaining({
        cmd: "Connect",
        name: "Tarnished",
        game: "",
        password: "",
        tags: ["EldenRingTracker", "Tracker"],
        version: VERSION,
        items_handling: 0b111,
        slot_data: true,
      }),
    ]);
  });

  test("sends the password only when the room has one", async () => {
    const locked = await opened(true);
    void locked.room.logIn("Tarnished", TRACKER_VERSION, "hunter2");
    expect(locked.socket.sent).toEqual([expect.objectContaining({ password: "hunter2" })]);
    const open = await opened(false);
    void open.room.logIn("Tarnished", TRACKER_VERSION, "hunter2");
    expect(open.socket.sent).toEqual([expect.objectContaining({ password: "" })]);
  });

  test("a wrong password and a wrong slot are errors of their own", async () => {
    const password = await opened(true);
    const wrongPassword = password.room.logIn("Tarnished", TRACKER_VERSION, "nope");
    password.socket.serve({ cmd: "ConnectionRefused", errors: ["InvalidPassword"] });
    await expect(wrongPassword).rejects.toMatchObject({
      problem: "invalid password",
      reasons: ["InvalidPassword"],
    });

    const slot = await opened();
    const wrongSlot = slot.room.logIn("Nobody", TRACKER_VERSION);
    slot.socket.serve({ cmd: "ConnectionRefused", errors: ["InvalidSlot"] });
    await expect(wrongSlot).rejects.toMatchObject({ problem: "invalid slot" });
  });

  test("any other refusal keeps the server's reasons", async () => {
    const { socket, room } = await opened();
    const login = room.logIn("Tarnished", TRACKER_VERSION);
    socket.serve({ cmd: "ConnectionRefused", errors: ["IncompatibleVersion"] });
    await expect(login).rejects.toMatchObject({
      problem: "refused",
      reasons: ["IncompatibleVersion"],
    });
  });

  test("a socket that closes before RoomInfo, or before Connected, fails as closed", async () => {
    const socket = new TestSocket();
    const opening = RoomSocket.open("wss://archipelago.gg:1", () => socket);
    socket.emit("error");
    await expect(opening).rejects.toBeInstanceOf(LoginError);

    const { socket: open, room } = await opened();
    const login = room.logIn("Tarnished", TRACKER_VERSION);
    open.emit("close");
    await expect(login).rejects.toMatchObject({ problem: "closed" });
  });

  test("packets before Connected, and messages that aren't packets, are passed over", async () => {
    const { socket, room } = await opened();
    const login = room.logIn("Tarnished", TRACKER_VERSION);
    socket.emit("message", "not json");
    socket.serve({ cmd: "PrintJSON", data: [] }, { cmd: "Connected", team: 0, slot: 2 });
    expect((await login).slot).toBe(2);
  });
});

describe("clientVersion", () => {
  test("says the Archipelago release a version is tested against, its own build left off", () => {
    const release = { class: "Version", major: 0, minor: 6, build: 8 } as const;
    expect(clientVersion("0.6.8+2")).toEqual(release);
    expect(clientVersion("0.6.8")).toEqual(release);
  });

  test("refuses a version not in that form", () => {
    expect(() => clientVersion("next")).toThrow();
  });

  test("the repo's own version is one a login can say", () => {
    expect(() => clientVersion(version)).not.toThrow();
  });
});
