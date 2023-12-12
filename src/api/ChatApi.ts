import { HTTPTransport } from '../utils/HttpTransport';

const chatAPIInstance = new HTTPTransport('api/v2/chats');

class ChatAPI {
  constructor () {}

  getChats () {
    return chatAPIInstance.get('', { limit: 100 });
  }

  createChat (title: string) {
    return chatAPIInstance.post('', { data: { title } });
  }

  addUsersToChat (chatId: number, users: Array<number>) {
    return chatAPIInstance.put('/users', { data: { users, chatId } });
  }

  deleteUsersFromChat (chatId: number, users: Array<number>) {
    return chatAPIInstance.delete('/users', { data: { users, chatId } });
  }

  getToken (chatId: number) {
    return chatAPIInstance.post(`/token/${chatId}`, { data: { id: chatId } });
  }
}

export default new ChatAPI();
