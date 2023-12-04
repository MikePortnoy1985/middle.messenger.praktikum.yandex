import { TMessage } from '../controllers/MessageController';
import { Maybe } from '../types';
import { EventBus } from './EventBus';

type TParams = {
  url: string,
}

type TWSSTransportEvent = TMessage | Array<TMessage> | Event

export default class WSTransport extends EventBus<TWSSTransportEvent> {
  WEB_SOCKET_EVENTS = {
    Connected: 'connected',
    Error: 'error',
    Message: 'message',
    Close: 'close'
  };

  socket: Maybe<WebSocket> = null;
  intervalDuration = 5000;
  interval?: ReturnType<typeof setInterval>;
  url = '';

  constructor ({ url }: TParams) {
    super();

    this.url = url;
  }

  send (data: unknown) {
    if (!this.socket) {
      throw new Error('Сокеты не подключены');
    }

    this.socket.send(JSON.stringify(data));
  }

  connect () {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(this.WEB_SOCKET_EVENTS.Connected, () => {
        resolve('');
      });
    });
  }

  close () {
    this.socket?.close();
  }

  setupPing () {
    this.interval = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.intervalDuration);

    this.on(this.WEB_SOCKET_EVENTS.Close, () => {
      clearInterval(this.interval);
    });
  }

  subscribe (socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(this.WEB_SOCKET_EVENTS.Connected);
    });
    socket.addEventListener('close', () => {
      this.emit(this.WEB_SOCKET_EVENTS.Close);
    });

    socket.addEventListener('error', (e) => {
      this.emit(this.WEB_SOCKET_EVENTS.Error, e);
    });

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data);

        if (data.type && data.type === 'pong') {
          return;
        }

        this.emit(this.WEB_SOCKET_EVENTS.Message, data);
      } catch (error) {
        console.error('Invalid message data');
      }
    });
  }
}
