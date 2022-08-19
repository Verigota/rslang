export default function getNewElement(elem: string, elemClass: string, elemTextContent?: string):
HTMLElement {
  const element = document.createElement(elem);
  element.className = elemClass;
  if (elemTextContent) element.textContent = elemTextContent;
  return element;
}
