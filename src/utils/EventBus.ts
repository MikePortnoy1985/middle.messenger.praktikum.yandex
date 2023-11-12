type TCallback<T extends object> = (...args: Array<T>) => void;
type TListeners<T extends object> = Record<string, Array<TCallback<T>>>;

export class EventBus<T extends object> {
  listeners: TListeners<T>;

  constructor () {
    this.listeners = {};
  };

  on (event: string, callback: TCallback<T>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off (event: string, callback: TCallback<T>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit (event: string, ...args: Array<T>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(cb => cb(...args));
  }
}
