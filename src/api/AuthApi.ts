import { TCreateUserData, TLoginUserData } from '../controllers/UserController';
import { HTTPTransport } from '../utils/HttpTransport';

export type TUserData = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
  login: string,
  avatar: string,
  email: string,
}

const authAPIInstance = new HTTPTransport('api/v2/auth');

class AuthAPI {
  constructor () {}

  createUser (data: TCreateUserData) {
    return authAPIInstance.post('/signup', { data });
  }

  loginUser (data: TLoginUserData) {
    return authAPIInstance.post('/signin', { data });
  }

  getUserInfo () {
    return authAPIInstance.get('/user');
  };

  logoutUser () {
    return authAPIInstance.post('/logout');
  }
}

export default new AuthAPI();
