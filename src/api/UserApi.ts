import { HTTPTransport } from '../utils/HttpTransport';

const userAPIInstance = new HTTPTransport('api/v2/user');

class UserApi {
  constructor () {}

  updateUser (data: Record<string, string | File>) {
    if (data.newPassword) {
      return userAPIInstance.put('/password', { data });
    }

    return userAPIInstance.put('/profile', { data });
  };

  updateAvatar (data: FormData) {
    return userAPIInstance.put('/profile/avatar', { data });
  }

  getAvatar () {

  }
}

export default new UserApi();
