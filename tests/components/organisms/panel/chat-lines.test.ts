import { describe, expect, test } from "bun:test";
import {
  chatLines,
  partsText,
  type ChatNames,
} from "../../../../src/components/organisms/panel/chat-lines.js";
import type { PrintedEvent } from "../../../../src/state/slices/log.js";

// Slot 1 is this slot; names say what they were asked for, so a test sees which was used.
const NAMES: ChatNames = {
  slot: 1,
  player: (slot) => `player ${slot}`,
  item: (id, owner) => `item ${id} of ${owner}`,
  location: (id, owner) => `location ${id} of ${owner}`,
};
const NO_ITEM = { item: 1, location: 2, player: 1, flags: 0 };
const stamped = (value: PrintedEvent, at?: number) =>
  at === undefined ? { value } : { value, at };

describe("chatLines", () => {
  test("a player's chat is theirs, and this slot's own line starting with ! is its command", () => {
    const lines = chatLines(
      [
        stamped({ kind: "chat", team: 0, slot: 2, message: "hello", parts: [] }, 5),
        stamped({ kind: "chat", team: 0, slot: 1, message: "!hint Rusty Key", parts: [] }),
        stamped({ kind: "chat", team: 0, slot: 2, message: "!hint Hookshot", parts: [] }),
      ],
      NAMES
    );
    expect(lines.map(({ kind, who, text, at }) => ({ kind, who, text, at }))).toEqual([
      { kind: "chat", who: "player 2", text: "hello", at: 5 },
      { kind: "command", who: "player 1", text: "!hint Rusty Key", at: undefined },
      { kind: "chat", who: "player 2", text: "!hint Hookshot", at: undefined },
    ]);
  });

  test("a reply, a hint and the room's events are each their own kind, and items sent stay out", () => {
    const parts = [{ text: "said" }];
    const lines = chatLines(
      [
        stamped({ kind: "command result", parts }),
        stamped({ kind: "hint", item: NO_ITEM, receiving: 1, found: false, parts }),
        stamped({ kind: "item sent", item: NO_ITEM, receiving: 2, parts }),
        stamped({ kind: "join", team: 0, slot: 2, tags: [], parts }),
        stamped({ kind: "goal", team: 0, slot: 2, parts }),
        stamped({ kind: "message", type: "Release", parts }),
      ],
      NAMES
    );
    expect(lines.map(({ kind }) => kind)).toEqual(["reply", "hint", "room", "room", "room"]);
  });
});

describe("partsText", () => {
  test("names a player, an item and a location by their ids, and the item's and location's owner", () => {
    expect(
      partsText(
        [
          { text: "2", type: "player_id" },
          { text: " found " },
          { text: "77", type: "item_id", player: 3 },
          { text: " at " },
          { text: "900", type: "location_id", player: 2 },
        ],
        NAMES
      )
    ).toBe("player 2 found item 77 of 3 at location 900 of 2");
  });

  test("keeps a part's text as it is when it's plain, or its id isn't a number", () => {
    expect(
      partsText(
        [
          { text: "<b>not markup</b>" },
          { text: "Sam", type: "player_name" },
          { text: "x", type: "item_id", player: 3 },
        ],
        NAMES
      )
    ).toBe("<b>not markup</b>Samx");
  });
});
