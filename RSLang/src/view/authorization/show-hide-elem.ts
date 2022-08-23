export function showHideElem(modals: HTMLElement[], className: string): void {
  modals.forEach((modal) => modal?.classList.toggle(className));
}

export function showHideBlackout(blackout: HTMLElement):void {
  const body = document.querySelector<HTMLElement>('.body');
  body?.classList.toggle('overflow-hidden');
  blackout?.classList.toggle('blackout_hidden');
}
