/** What makes a goal boss's row the same one in any room, as a key, by the flag the game sets for it. */
export const bossKey = (flag: number): string => `boss:${flag}`;
