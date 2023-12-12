import store from '../utils/Store';
import WSSTransport from '../utils/WSSTransport';

export type TMessage = {
  chat_id: number,
  time: string,
  type: string,
  user_id: number,
  content: string,
  file?: {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  };
}

class MessageController {
  sockets: Map<number, WSSTransport> = new Map();
  base = 'wss://ya-praktikum.tech/ws/chats';

  constructor () {}

  async connect (chatId: number, token: string) {
    if (this.sockets.has(chatId)) {
      return;
    }

    const userId = store.getState()?.userId;

    const wssTransport = new WSSTransport({ url: `${this.base}/${userId}/${chatId}/${token}` });

    this.sockets.set(chatId, wssTransport);

    await wssTransport.connect();

    this.subscribe(wssTransport, chatId);
    this.fetchOldMessages(chatId);
  }

  sendMessage (chatId: number, message: string) {
    const socket = this.sockets.get(chatId);

    if (socket) {
      socket.send({
        type: 'message',
        content: message
      });
    }
  }

  fetchOldMessages (chatId: number) {
    const socket = this.sockets.get(chatId);

    if (socket) {
      socket.send({ type: 'get old', content: '0' });
    }
  }

  closeAll () {
    Array.from(this.sockets.values()).forEach(socket => socket.close());
  }

  onMessage (chatId: number, messages: TMessage | Array<TMessage>) {
    let messagesToAdd: Array<TMessage> = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = store.getState().messages?.[chatId] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${chatId}`, messagesToAdd);
  }

  onClose (id: number) {
    this.sockets.delete(id);
  }

  subscribe (transport: WSSTransport, chatId: number) {
    transport.on(transport.WEB_SOCKET_EVENTS.Message, (message) => {
      if (message instanceof Event) {
        return;
      }
      this.onMessage(chatId, message);
    });
    transport.on(transport.WEB_SOCKET_EVENTS.Close, () => this.onClose(chatId));
  }
}

const messageController = new MessageController();

export default messageController;
