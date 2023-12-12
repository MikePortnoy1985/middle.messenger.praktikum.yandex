import ChatAPI from '../api/ChatApi';
import MessageController from './MessageController';

type TChat = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      email: string,
      login: string,
      phone: string
    },
    time: Date,
    content: number
  }
}

type TResponse = {
  status: number,
  response: Array<TChat>
}

type TTokenResponse = {
  response: {
    token: string,
  }
}

class ChatController {
  constructor () {}

  async getChats () {
    try {
      const data = await ChatAPI.getChats();

      if ((data as TResponse).response) {
        (data as TResponse).response.map(async (chat) => {
          const token = await this.getToken(chat.id);

          if (token) {
            await MessageController.connect(chat.id, token);
          }
        });
      }

      return (data as TResponse).response;
    } catch (error) {
      console.error(error);
    }
  }

  async createChat ({ title }: {title: string}) {
    try {
      const data = await ChatAPI.createChat(title);

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async addUsersToChat (chatId: number, users: Array<number>) {
    try {
      const data = await ChatAPI.addUsersToChat(chatId, users);

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUsersFromChat (chatId: number, users: Array<number>) {
    try {
      const data = await ChatAPI.deleteUsersFromChat(chatId, users);

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getToken (chatId: number) {
    try {
      const data = await ChatAPI.getToken(chatId);

      return (data as TTokenResponse).response.token;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new ChatController();
