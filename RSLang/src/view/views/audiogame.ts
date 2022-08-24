export const sectionAudioGameStart = `
            <section class="audio-game content__item">
                <div class="audio-game__about">
                    <h2 class="audio-game__title">Аудиовызов</h2>
                    <p class="audio-game__desc">Используйте  эту тренировку для улучшения восприятия речи на слух.</p>
                    <img class="audio-game__icon" src="./public/assets/images/audio.png" width="300" height="150" alt="">
                </div>
                <div class="audio-game__help">
                    <p class="audio-game__help-item">Для игры с помощью клавиатуры, используйте клавиши:</p>
                    <p class="audio-game__help-item">1, 2, 3, 4, 5 - чтобы дать ответ,</p>
                    <p class="audio-game__help-item">space - для воспроизведения звука,</p>
                    <p class="audio-game__help-item">enter - чтобы пропустить вопрос,</p>
                    <p class="audio-game__help-item">стрелка-вправо - чтобы перейти к следующему вопросу.</p>
                </div>
                <div class="audio-game__start">
                    <button class="audio-game__start-btn">Начнём!</button>
                </div>
            </section>`;

export const sectionAudioGameBody = `
            <section class="audio-game content__item">
                <div class="audio-game__audio">
                    <a href="#" class="audio-game__audio-btn">
                        <img src="./public/assets/icons/sound-beat.svg" alt="play" class="audio-game__audio-img">
                    </a>
                </div>
                <div class="answers audio-game__answers">
                    <a id="answer1" href="#" class="answer answers__item">
                        <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                        <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                        <p class="answer__text">Перевод</p>
                    </a>
                    <a id="answer2" href="#" class="answer answers__item">
                        <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                        <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                        <p class="answer__text">Перевод</p>
                    </a>
                    <a id="answer3" href="#" class="answer answers__item">
                        <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                        <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                        <p class="answer__text">Перевод</p>
                    </a>
                    <a id="answer4" href="#" class="answer answers__item">
                        <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                        <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                        <p class="answer__text">Перевод</p>
                    </a>
                    <a id="answer5" href="#" class="answer answers__item">
                        <img src="./public/assets/icons/success.svg" width="30" height="30" alt="ok" class="answer__ok">
                        <img src="./public/assets/icons/cancel.svg" width="30" height="30" alt="fault" class="answer__fault">
                        <p class="answer__text">Перевод</p>
                    </a>
                </div>
                <div class="audio-game__skip">
                    <button class="audio-game__skip-btn">Не знаю</button>
                </div>
            </section>`;
