/*
  Utility functions and constants use throughout the framework can ba placed here.
  This is just a starting point, and you should add or modify the utilities as neede
  to cover your framework's requirementes.
*/

// Utility function to create an element with a given tag name and attributes.
export function createElement(tag: string, attributes: Record<string, string> = {}): HTMLElement {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}

// Utilitye function to update an element's attributes based on an object of key-value pairs.
export function updateElementAttributes(element: HTMLElement, attributes: Record<string, string>): void {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
}

// Utility function to remove an element's attributes based on an array of attribute names.
export function removeElementAttributes(element: HTMLElement, attributeNames: string[]): void {
  attributeNames.forEach((name) => element.removeAttribute(name));
}