function showHideModal(modal: HTMLElement, blackout: HTMLElement): void {
  const body = document.querySelector<HTMLElement>('.body');
  body?.classList.toggle('overflow-hidden');
  blackout?.classList.toggle('blackout_hidden');
  modal?.classList.toggle('modal_hidden');
}
export default showHideModal;
