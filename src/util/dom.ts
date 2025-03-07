import * as R from "remeda";

/**  DOM helper functions that return HTMLElement(s) (or `null`) */

type MaybeHTML = Maybe<Document | Element | EventTarget>;

/**
 * Create an `HTMLElement` with classes, dataset, and children
 * @param nodeName  A valid HTML element tag name,
 * @param [options] Additional options for adjusting the created element
 * @param [options.classes=[]]  A list of class names
 * @param [options.dataset={}]  An object of keys and values with which to populate the `dataset`: nullish values will
 *                              be excluded.
 * @param [options.children=[]] A list of child elements as well as strings that will be converted to text nodes
 * @returns The HTML element with all options applied
 */
function createHTMLElement(
    nodeName: keyof HTMLElementTagNameMap,
    { classes = [], dataset = {}, children = [] }: CreateHTMLElementOptions = {}
): HTMLElement {
    const element = document.createElement(nodeName);
    element.classList.add(...classes);

    for (const [key, value] of Object.entries(dataset).filter(([, v]) => !R.isNil(v))) {
        element.dataset[key] = String(value);
    }

    for (const child of children) {
        const childElement = child instanceof HTMLElement ? child : new Text(child);
        element.appendChild(childElement);
    }

    return element;
}

interface CreateHTMLElementOptions {
    classes?: string[];
    dataset?: Record<string, string | number | null | undefined>;
    children?: (HTMLElement | string)[];
}

function htmlQuery<K extends keyof HTMLElementTagNameMap>(
    parent: MaybeHTML,
    selectors: K
): HTMLElementTagNameMap[K] | null;
function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null;
function htmlQuery<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E | null;
function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null {
    if (!(parent instanceof Element || parent instanceof Document)) return null;
    return parent.querySelector<HTMLElement>(selectors);
}

function htmlQueryAll<K extends keyof HTMLElementTagNameMap>(
    parent: MaybeHTML,
    selectors: K
): HTMLElementTagNameMap[K][];
function htmlQueryAll(parent: MaybeHTML, selectors: string): HTMLElement[];
function htmlQueryAll<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E[];
function htmlQueryAll(parent: MaybeHTML, selectors: string): HTMLElement[] {
    if (!(parent instanceof Element || parent instanceof Document)) return [];
    return Array.from(parent.querySelectorAll<HTMLElement>(selectors));
}

function htmlClosest<K extends keyof HTMLElementTagNameMap>(
    parent: MaybeHTML,
    selectors: K
): HTMLElementTagNameMap[K] | null;
function htmlClosest(child: MaybeHTML, selectors: string): HTMLElement | null;
function htmlClosest<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E | null;
function htmlClosest(child: MaybeHTML, selectors: string): HTMLElement | null {
    if (!(child instanceof Element)) return null;
    return child.closest<HTMLElement>(selectors);
}

export { createHTMLElement, htmlClosest, htmlQuery, htmlQueryAll };
