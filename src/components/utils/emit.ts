/** Sends an event from an element that bubbles and crosses shadow roots, so whatever holds the element hears it. */
export function emit<T>(from: HTMLElement, name: string, detail: T): void {
  from.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
}
