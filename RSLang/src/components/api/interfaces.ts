export interface IUserInfo {
  name: string,
  email: string,
  password: string,
}

export interface IApi {
  createUser: (userRegistration: IUserInfo) => void,
}
