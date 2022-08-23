import RegistrationController from '../controller/registration';

interface IApp {
  registrationController: RegistrationController;
  start: () => void
}
export default IApp;
