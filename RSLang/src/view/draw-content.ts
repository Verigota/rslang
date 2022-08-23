export function drawContent(fragment: HTMLElement) {
  const main = document.querySelector<HTMLElement>('#main');
  main?.prepend(fragment.cloneNode(true));
}

export function deleteContent(fragment: HTMLElement) {
  fragment.parentElement?.removeChild(fragment);
}
