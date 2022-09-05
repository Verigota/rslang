export function getNewElement(elem: string, elemClass: string, elemTextContent?: string):
HTMLElement {
  const element = document.createElement(elem);
  element.className = elemClass;
  if (elemTextContent) element.innerHTML = elemTextContent;
  return element;
}

export function getNewImageElement(imgClass: string, imgSrc: string, imgAlt: string):
HTMLImageElement {
  const img = new Image();
  img.className = imgClass;
  img.src = imgSrc;
  img.alt = imgAlt;
  return img;
}

export function getMeaningOrExampleContainer(
  containerClass: string,
  titleClass: string,
  titleContent: string,
  paragraphRuClass: string,
  paragraphRuContent: string,
  paragraphEnClass: string,
  paragraphEnContent: string,
) {
  const container = getNewElement('div', containerClass);
  container.append(
    getNewElement('h5', titleClass, titleContent),
    getNewElement('p', paragraphRuClass, `${paragraphRuContent}`),
    getNewElement('p', paragraphEnClass, `${paragraphEnContent}`),
  );
  return container;
}
