import { isDemo, type RoomLink } from "../../archipelago/room-link.js";

/** Whether a room shows Simulate's buttons: a demo in any build, a real room in a development build, and a real room on the built site never. */
export function canSimulate(link: RoomLink, isDevelopment: boolean): boolean {
  return isDevelopment || isDemo(link);
}
