/**
 * ─ Apworld source ─
 *
 * Reads the Elden Ring apworld's Python source just far enough for the
 * repo's tools: each call to one of its data classes with its arguments as
 * text, the pieces of a bracketed list, and Python string literals. Strings,
 * nested brackets and comments are respected, and a call on a commented-out
 * line is left out. It also holds the licence line a file built from it ends on.
 */

/** A call in the source: where its name starts, and its arguments as text, split at top-level commas. */
export interface SourceCall {
  readonly at: number;
  readonly args: readonly string[];
}

/** Every call to `callee` in the source, left out where its line is commented out. */
export function callsIn(source: string, callee: string): SourceCall[] {
  const opening = `${callee}(`;
  const calls: SourceCall[] = [];
  let at = source.indexOf(opening);
  while (at !== -1) {
    const line = source.slice(source.lastIndexOf("\n", at) + 1, at);
    const isWholeName = !/[\w.]$/.test(line);
    if (isWholeName && !line.includes("#")) {
      calls.push({ at, args: piecesFrom(source, at + opening.length) });
    }
    at = source.indexOf(opening, at + opening.length);
  }
  return calls;
}

/**
 * The top-level pieces of a bracketed run, from just inside its opening
 * bracket to its close, split at commas, with comments dropped and empty
 * pieces left out.
 */
export function piecesFrom(source: string, start: number): string[] {
  const pieces: string[] = [];
  let depth = 0;
  let quote = "";
  let piece = "";
  for (let i = start; i < source.length; i++) {
    const char = source.charAt(i);
    if (quote !== "") {
      piece += char;
      if (char === "\\") {
        piece += source.charAt(++i);
      } else if (char === quote) {
        quote = "";
      }
    } else if (char === "#") {
      const end = source.indexOf("\n", i);
      if (end === -1) {
        break;
      }
      i = end - 1;
    } else if (char === '"' || char === "'") {
      quote = char;
      piece += char;
    } else if (char === "," && depth === 0) {
      pieces.push(piece.trim());
      piece = "";
    } else if (")]}".includes(char) && depth === 0) {
      pieces.push(piece.trim());
      break;
    } else {
      depth += "([{".includes(char) ? 1 : ")]}".includes(char) ? -1 : 0;
      piece += char;
    }
  }
  return pieces.filter((value) => value !== "");
}

/** The pieces of the list that opens on `opening`, such as `region_order = [`; empty when it isn't there. */
export function listAt(source: string, opening: string): string[] {
  const at = source.indexOf(opening);
  return at === -1 ? [] : piecesFrom(source, at + opening.length);
}

/** A Python string literal's value: `"Fia's Champions"` or `'say \"hi\"'`. */
export function pythonString(literal: string): string {
  const quote = literal.charAt(0);
  const inner = literal.slice(1, -1);
  const escaped = quote === "'" ? inner.replace(/\\'/g, "'").replace(/"/g, '\\"') : inner;
  return JSON.parse(`"${escaped.replace(/\\'/g, "'")}"`) as string;
}

/** The names of a call's keyword arguments that are set to True. */
export function trueKeywords(args: readonly string[]): Set<string> {
  const names = new Set<string>();
  for (const arg of args) {
    const keyword = /^(\w+)\s*=\s*True$/.exec(arg);
    if (keyword?.[1] !== undefined) {
      names.add(keyword[1]);
    }
  }
  return names;
}

/** The apworld's copyright and licence, as the notice of a file built from its source ends. */
export const APWORLD_LICENCE =
  "Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt.";
