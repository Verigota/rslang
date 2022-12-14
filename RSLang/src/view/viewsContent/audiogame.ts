export const sectionAudioGameStart = `
            <section class="game content__item">
                <div class="game__about">
                    <h2 class="game__title">Аудиовызов</h2>
                    <p class="game__desc">Используйте  эту тренировку для улучшения восприятия речи на слух.</p>
                    <img class="game__icon" src="./public/assets/images/audio.png" width="300" height="150" alt="">
                </div>
                <div class="game__help">
                    <p class="game__help-item">Для игры с помощью клавиатуры, используйте клавиши:</p>
                    <p class="game__help-item">1, 2, 3, 4, 5 - чтобы дать ответ,</p>
                    <p class="game__help-item">space - для воспроизведения звука,</p>
                    <p class="game__help-item">enter - чтобы пропустить вопрос,</p>
                    <p class="game__help-item">стрелка-вправо - чтобы перейти к следующему вопросу.</p>
                </div>
                <div class="game__start">
                    <button class="game__start-btn button">Начнём!</button>
                </div>
            </section>`;

export const sectionAudioGameBody = `
            <section class="game content__item" tabindex="-1">
                <div class="game__audio">
                    <a href="#" class="game__audio-btn">
                        <img class="game__audio-question" src="./public/assets/icons/sound-beat.svg" alt="answer image">
                        <img class="game__audio-answer" src="./public/assets/icons/question.svg" alt="question image">
                    </a>
                </div>
                <div class="answers game__answers">
                    <a id="answer1" href="#" class="answer answers__item">
                        <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                        <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                        <p class="answer__help">1</p>
                        <p class="answer__text">Перевод</p>
                    </a>
                    <a id="answer2" href="#" class="answer answers__item">
                        <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                        <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                        <p class="answer__help">2</p>
                        <p class="answer__text">Перевод</p>
                    </a>
                    <a id="answer3" href="#" class="answer answers__item">
                        <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                        <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                        <p class="answer__help">3</p>
                        <p class="answer__text">Перевод</p>
                    </a>
                    <a id="answer4" href="#" class="answer answers__item">
                        <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                        <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                        <p class="answer__help">4</p>
                        <p class="answer__text">Перевод</p>
                    </a>
                    <a id="answer5" href="#" class="answer answers__item">
                        <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                        <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                        <p class="answer__help">5</p>
                        <p class="answer__text">Перевод</p>
                    </a>
                </div>
                <div class="game__skip">
                    <button class="game__skip-btn button" data-word="не знаю">Не знаю</button>
                </div>
            </section>`;
