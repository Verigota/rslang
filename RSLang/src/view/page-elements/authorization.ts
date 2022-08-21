const registrationForm = `
<div class="modal content__item modal_hidden" id="registration-modal">
                <h3 class="modal__title section-title">Регистрация</h3>
                <form class="modal__form registration-form" id="create-user-form">
                    <input type="text" placeholder="Имя" name='name' class="form-input" required>
                    <input type="email" placeholder="E-mail" name='email' class="form-input" required>
                    <input type="password" placeholder="Пароль" name='password' class="form-input" required>
                    <input type="password" placeholder="Подтвердите пароль" name='confirmPassword' class="form-input" required>
                    <button type="submit" id="register-user-btn" class="registration__regbtn">Зарегистрироваться</button>
                </form>
                <p>У вас уже есть аккаунта? Тогда срочно надо <a href='' id="sign-in-link">войти!</a></p>
            </div>
`;

const signInForm = `
<div class="modal content__item" id="sign-in-modal">
                    <h3 class="modal__title section-title">Вход</h3>
                    <form class="modal__form sign-in-form" id="sign-in-form">
                        <input type="email" placeholder="E-mail" name='email' class="form-input" required>
                        <input type="password" placeholder="Пароль" name='password' class="form-input" required>
                        <button type="submit" id="sign-in-btn" class="registration__regbtn">Войти</button>
                    </form>
                    <p>У вас нет аккаунта? Давайте <a href='' id="register-link">зарегистрируемся!</a></p>
                </div>
`;

const authModals = document.createElement('div');
authModals.id = 'auth-modals';
authModals.innerHTML = `${signInForm}${registrationForm}`;
export default authModals;
