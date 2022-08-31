export function checkLevelsBtns(): boolean {
  const levelBtns = document.querySelectorAll('.choice__level');
  return (Array.prototype.slice.call(levelBtns).some((el) => el.classList.contains('selected')));
}

export function setGamesButtonsActions() {
  const levelBtns = document.querySelectorAll('.choice__level');
  levelBtns.forEach((el) => {
    el.addEventListener('click', () => {
      const isSelected = el.classList.contains('selected');
      levelBtns.forEach((elem) => {
        elem.classList.remove('selected');
      });
      if (!isSelected) {
        el.classList.add('selected');
      }
    });
  });
}
