import { TMessage } from '../controllers/MessageController';
import { set } from '../helpers/set';
import { TAuthProps } from '../pages/Auth';
import { TChatPageProps } from '../pages/ChatPage';
import { TExtraPageProps } from '../pages/ExtraPage';
import { TUserPageProps } from '../pages/UserPage';
import { EventBus } from './EventBus';

export type TStore = {
  userId: number,
  messages: Record<string, Array<TMessage>>
}

export type TState = TAuthProps | TExtraPageProps | TChatPageProps | TUserPageProps
export type TUnionState = TAuthProps & TExtraPageProps & TChatPageProps & TUserPageProps & TStore

export class Store extends EventBus<TStore> {
  STORE_EVENTS = {
    Updated: 'updated'
  };

  private state: TStore = {} as TStore;

  getState (): TStore {
    if (this?.state) {
      return this.state;
    }

    return {} as TStore;
  }

  set (path: string, value: unknown) {
    if (!this.listeners[this.STORE_EVENTS.Updated]) {
      this.on(this.STORE_EVENTS.Updated, this.getState);
    }

    set(this.state, path, value);

    this.emit(this.STORE_EVENTS.Updated);
  };
}

const store = new Store();

export default store as Store;
