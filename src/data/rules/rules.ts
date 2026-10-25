/**
 * ─ Rules ─
 *
 * The apworld's unlock rules written as data, so one rule both decides whether
 * something is open and says in English what it still needs. A rule is an
 * item, all or any of other rules, a count over items (great runes, Stonesword
 * Keys that come in threes and fives), an area or a location being reachable,
 * or a rule that holds only when an option says so. `needs` gives what's
 * missing as a tree, `describe` reads that tree out.
 */

import { listed } from "../words.js";

/** An item a count takes in, and how many it counts for: a "Stonesword Key x3" counts for three. */
export interface Weighted {
  readonly item: string;
  readonly weight: number;
}

/** How an option is tested: equal to a value, not equal to it, or at least it. Booleans count as 1 and 0. */
export type OptionTest =
  | { readonly option: string; readonly is: number }
  | { readonly option: string; readonly isNot: number }
  | { readonly option: string; readonly atLeast: number };

/** One of the apworld's rules, as data. */
export type Rule =
  | { readonly kind: "item"; readonly item: string }
  | { readonly kind: "all"; readonly rules: readonly Rule[] }
  | { readonly kind: "any"; readonly rules: readonly Rule[] }
  | {
      readonly kind: "count";
      /** What the count is of, plural, as a person reads it: "Great Runes". */
      readonly label: string;
      readonly items: readonly Weighted[];
      readonly needs: number;
    }
  | { readonly kind: "area"; readonly area: string }
  | { readonly kind: "location"; readonly location: string }
  | {
      readonly kind: "when";
      readonly test: OptionTest;
      /** What holds when the test passes. */
      readonly rule: Rule;
      /** What holds when the test fails; nothing is needed when it's left out. */
      readonly otherwise?: Rule;
    };

/** What a rule is decided against: the items received, the room's options, and what's reachable so far. */
export interface RuleState {
  /** How many of each item has been received, by name. */
  readonly items: ReadonlyMap<string, number>;
  /** slot_data's options, with the apworld's names. */
  readonly options: Readonly<Record<string, unknown>>;
  canReach(area: string): boolean;
  canGet(location: string): boolean;
}

/** What a rule still needs: the parts of it not yet met, with a count's progress. */
export type Need =
  | { readonly kind: "item"; readonly item: string }
  | { readonly kind: "all"; readonly needs: readonly Need[] }
  | { readonly kind: "any"; readonly needs: readonly Need[] }
  | {
      readonly kind: "count";
      readonly label: string;
      readonly have: number;
      readonly needs: number;
      /** The items it counts, by name. */
      readonly items: readonly string[];
    }
  | { readonly kind: "area"; readonly area: string }
  | { readonly kind: "location"; readonly location: string };

/** How areas and locations are named in the English; each is shown as it comes when left out. */
export interface RuleWords {
  area?(area: string): string;
  location?(location: string): string;
}

/** A rule that holds once the item is received. */
export function item(name: string): Rule {
  return { kind: "item", item: name };
}

/** A rule that holds once the area is reached. */
export function area(name: string): Rule {
  return { kind: "area", area: name };
}

/** A rule that holds once the location can be got. */
export function location(name: string): Extract<Rule, { readonly kind: "location" }> {
  return { kind: "location", location: name };
}

/** Whether a rule is met. */
export function decide(rule: Rule, state: RuleState): boolean {
  return needs(rule, state) === undefined;
}

/** What a rule still needs, or undefined when it's met. An "any" that isn't met needs one of all its parts. */
export function needs(rule: Rule, state: RuleState): Need | undefined {
  switch (rule.kind) {
    case "item":
      return (state.items.get(rule.item) ?? 0) > 0 ? undefined : rule;
    case "count": {
      const have = rule.items.reduce(
        (total, { item, weight }) => total + (state.items.get(item) ?? 0) * weight,
        0
      );
      return have >= rule.needs
        ? undefined
        : {
            kind: "count",
            label: rule.label,
            have,
            needs: rule.needs,
            items: rule.items.map(({ item }) => item),
          };
    }
    case "area":
      return state.canReach(rule.area) ? undefined : rule;
    case "location":
      return state.canGet(rule.location) ? undefined : rule;
    case "all": {
      const missing = rule.rules.flatMap((part) => needs(part, state) ?? []);
      return missing.length === 0
        ? undefined
        : missing.length === 1
          ? missing[0]
          : { kind: "all", needs: missing };
    }
    case "any": {
      const missing: Need[] = [];
      for (const part of rule.rules) {
        const need = needs(part, state);
        if (need === undefined) {
          return undefined;
        }
        missing.push(need);
      }
      return missing.length === 1 ? missing[0] : { kind: "any", needs: missing };
    }
    case "when":
      if (passes(rule.test, state.options)) {
        return needs(rule.rule, state);
      }
      return rule.otherwise === undefined ? undefined : needs(rule.otherwise, state);
  }
}

/** A rule's still-needed parts in English, "Needs Liurnia Lock and Rusty Key"; undefined when it's met. */
export function describe(rule: Rule, state: RuleState, words: RuleWords = {}): string | undefined {
  const need = needs(rule, state);
  return need === undefined ? undefined : describeNeed(need, words);
}

/** What's still needed in English, "Needs Liurnia Lock and Rusty Key". */
export function describeNeed(need: Need, words: RuleWords = {}): string {
  return `Needs ${phrase(need, words)}`;
}

function phrase(need: Need, words: RuleWords): string {
  switch (need.kind) {
    case "item":
      return need.item;
    case "count":
      return `${need.needs} ${need.label}: ${need.have} of ${need.needs}`;
    case "area":
      return words.area?.(need.area) ?? need.area;
    case "location":
      return words.location?.(need.location) ?? need.location;
    case "all":
      return listed(
        need.needs.map((part) => phrase(part, words)),
        "and"
      );
    case "any": {
      const parts = need.needs.map((part) => phrase(part, words));
      // Alternatives that hold an "and" of their own are set apart with a comma.
      return parts.some((part) => part.includes(" and "))
        ? parts.join(", or ")
        : listed(parts, "or");
    }
  }
}

function passes(test: OptionTest, options: Readonly<Record<string, unknown>>): boolean {
  const value = Number(options[test.option] ?? 0);
  if ("is" in test) {
    return value === test.is;
  }
  if ("isNot" in test) {
    return value !== test.isNot;
  }
  return value >= test.atLeast;
}
