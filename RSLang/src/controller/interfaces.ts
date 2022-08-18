import { IUserInfo } from '../api/interfaces';

interface IRegistrationController {
  registerNewUser: (newUser: IUserInfo) => void
}
export default IRegistrationController;
