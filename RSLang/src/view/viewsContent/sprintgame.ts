export const sectionSprintGameStart = `
            <section class="game content__item">
                <div class="game__about">
                    <h2 class="game__title">Спринт</h2>
                    <p class="game__desc">Используйте эту тренировку для того, чтобы проверить насколько хорошо вы запомнили слова</p>
                    <img class="game__icon" src="./public/assets/images/sprint.png" width="300" height="150" alt="">
                </div>
                <div class="game__help sprint__help">
                    <p class="game__help-item">Чтобы дать ответ с помощью клавиатуры, используйте клавиши:</p>
                    <p class="game__help-item">стрелка влево, стрелка вправо</p>
                </div>
                <div class="game__start">
                    <button class="game__start-btn button">Начнём!</button>
                </div>
            </section>`;

export const sectionSprintGameBody = `
<section class="game content__item" tabindex="-1">
                    <div class="game__timer-wrap">
                        <div class="timer">
                            <div class="timer__line"></div>
                            <div class="timer__body">
                                <div class="timer__counter">
                                    <span>1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span>4</span>
                                    <span>5</span>
                                    <span>6</span>
                                    <span>7</span>
                                    <span>8</span>
                                    <span>9</span>
                                    <span>10</span>
                                    <span>11</span>
                                    <span>12</span>
                                    <span>13</span>
                                    <span>14</span>
                                    <span>15</span>
                                    <span>16</span>
                                    <span>17</span>
                                    <span>18</span>
                                    <span>19</span>
                                    <span>20</span>
                                    <span>21</span>
                                    <span>22</span>
                                    <span>23</span>
                                    <span>24</span>
                                    <span>25</span>
                                    <span>26</span>
                                    <span>27</span>
                                    <span>28</span>
                                    <span>29</span>
                                    <span>30</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="game__questions">
                        <p class="game__word" id="engWord">Слово</p>
                        <p class="game__word-translate" id="translation">Перевод</p>
                    </div>
                    <div class="game__answer-btns">
                        <button id="answer1" href="#" class="answer answer-btns__item" name="right">
                            <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                            <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                            <p class="answer__text">Верно</p>
                        </button>
                        <button id="answer2" href="#" class="answer answer-btns__item" name="wrong">
                            <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                            <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                            <p class="answer__text">Не верно</p>
                        </button>
                    </div>
               </section>`;
