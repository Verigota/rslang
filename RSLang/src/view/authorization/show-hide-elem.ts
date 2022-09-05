export default function showHideBlackout(blackout: HTMLElement):void {
  const body = document.querySelector<HTMLElement>('.body');
  body?.classList.toggle('overflow-hidden');
  blackout?.classList.toggle('blackout_hidden');
}
