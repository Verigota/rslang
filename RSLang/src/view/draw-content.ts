export function drawContent(fragment: HTMLElement) {
  const main = document.querySelector<HTMLElement>('#main');
  main?.prepend(fragment);
}

export function deleteContent(fragment: HTMLElement) {
  fragment.parentElement?.removeChild(fragment);
}
