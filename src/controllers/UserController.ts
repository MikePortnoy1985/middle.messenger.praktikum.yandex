import AuthAPI from '../api/AuthApi';
import UserApi from '../api/UserApi';

export type TCreateUserData = {
  email: string,
  first_name: string,
  login: string,
  password: string,
  second_name: string,
  phone: string,
}

export type TLoginUserData = {
  login: string,
  password: string,
}

type TResponse = {
  status: number,
  response: Record<string, string>
}

class UserController {
  constructor () {}

  async getUser () {
    try {
      const data = await AuthAPI.getUserInfo();

      if ((data as TResponse).status === 200) {
        return { error: false, response: (data as TResponse).response };
      } else {
        return { error: true };
      }
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async createUser (data: TCreateUserData) {
    try {
      const response = await AuthAPI.createUser(data);

      if ((response as TResponse).status === 200) {
        return { error: false };
      } else {
        return { error: true };
      }
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async loginUser (data: TLoginUserData) {
    try {
      const response = await AuthAPI.loginUser(data);

      if ((response as TResponse).status === 200) {
        return { error: false };
      } else {
        return { error: true };
      }
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async logoutUser () {
    try {
      const response = await AuthAPI.logoutUser();

      if ((response as TResponse).status === 200) {
        return { error: false };
      } else {
        return { error: true };
      }
    } catch (error) {
      console.error(error);
      return { error: true };
    }
  }

  async updateUser (params: Record<string, string | File>) {
    try {
      const data = await UserApi.updateUser(params);

      return (data as TResponse).response;
    } catch (error) {
      console.error(error);
    }
  }

  async updateAvatar (params: FormData) {
    try {
      const data = await UserApi.updateAvatar(params);

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getAvatar () {}
}

export default new UserController();
