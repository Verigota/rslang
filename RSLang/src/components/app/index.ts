import RegistrationController from '../controller/registration';

class App {
  registrationController: RegistrationController;

  constructor() {
    this.registrationController = new RegistrationController();
  }

  public start() {
    const registerBtn = document.querySelector('#registerUserBtn');

    registerBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.registrationController.registerNewUser();
    });
  }
}
export default App;
