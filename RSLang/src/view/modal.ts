export function showHideModal(modals: HTMLElement[]): void {
  modals.forEach((modal) => modal?.classList.toggle('modal_hidden'));
}

export function showHideBlackout(blackout: HTMLElement):void {
  const body = document.querySelector<HTMLElement>('.body');
  body?.classList.toggle('overflow-hidden');
  blackout?.classList.toggle('blackout_hidden');
}
