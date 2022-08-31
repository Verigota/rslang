export const popupGameStatView = `
                <a href="#header" class="popup__area"></a>
                <div class="popup__content game-stat">
                    <a href="#header" class="popup__close">
                        <img src="./public/assets/icons/cross.svg" alt="close">
                    </a>
                    <div class="game-stat__about">
                        <h2 class="game-stat__title">Аудиовызов</h2>
                        <p class="game-stat__result">Ваш результат <span class="game-stat__result-val">250</span></p>
                        <p class="game-stat__serie">Длина серии: <span class="game-stat__serie-val">10</span></p>
                    </div>
                    <div class="game-stat__container">
                        <div class="game-stat__slider">
                            <div id="game-stat-common" class="game-stat__item">
                                <div class="game-stat__percent"><span>50</span>%</div>
                            </div>
                            <div id="game-stat-answers" class="game-stat__item">
                                <p class="stat-header header-errors">Ошибки: <span class="game-stat__errors">10</span></p>
                                <div class="game-stat__errors-words"></div>
                                <div class="stat-separator"></span></div>
                                <p class="stat-header header-rights">Правильные: <span class="game-stat__rights">5</span></p>
                                <div class="game-stat__rights-words"></div>
                            </div>
                        </div>
                    </div>
                    <div class="game-stat__pagination">
                        <a id="game-stat-left" href="#" class="game-stat__pag-btn active-page"></a>
                        <a id="game-stat-right" href="#" class="game-stat__pag-btn"></a>
                    </div>
                    <div class="game-stat__action">
                        <button class="button game-stat__restart">Cнова</button>
                        <button class="button game-stat__game-select">Игры</button>
                    </div>
                </div>`;

export const gameStatWord = `
                            <a href="#" class="game-stat__el-play">
                                <img src="./public/assets/icons/play.svg" alt="play">
                                <p class="game-stat__el-word"></p>
                                <p class="game-stat__el-dash">-</p>
                                <p class="game-stat__el-transl"></p>
                            </a>`;
