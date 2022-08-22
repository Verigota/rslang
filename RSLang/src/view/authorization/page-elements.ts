function findModalElements() {
  const modalsContainer = document.querySelector<HTMLElement>('#auth-modals');
  const signInBtn = document.querySelector<HTMLElement>('#sign-in-btn');
  const registerBtn = document.querySelector<HTMLElement>('#register-user-btn');
  const registrationModal = document.querySelector<HTMLElement>('#registration-modal');
  const signInModal = document.querySelector<HTMLElement>('#sign-in-modal');
  const registerLink = document.querySelector<HTMLElement>('#register-link');
  const signInLink = document.querySelector<HTMLElement>('#sign-in-link');
  return {
    modalsContainer,
    signInBtn,
    registerBtn,
    registrationModal,
    signInModal,
    registerLink,
    signInLink,
  };
}
export default findModalElements;
