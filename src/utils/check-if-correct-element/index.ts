export function checkIfCorrectElement(element: HTMLElement, tag: string) {
  return element.nodeName.toLowerCase() === tag;
}
