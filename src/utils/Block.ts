import { Maybe } from '../types';
import { EventBus } from './EventBus';

export type TEvent = {
  eventName: string;
  callback: (event: Event) => void;
}

export type TBlockProps = object & {
  events?: Array<TEvent>;
}

export abstract class Block<T extends TBlockProps> {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private _element: Maybe<HTMLElement> = null;
  private _tagName?: string;
  props: Maybe<T> = null;
  eventBus: () => EventBus<T>;

  constructor (props: T, tagName?: string) {
    const eventBus = new EventBus<T>();

    this.props = this._makePropsProxy(props);
    this._tagName = tagName;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents (eventBus: EventBus<T>): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources (): void {
    if (this._tagName) {
      this._element = this._createDocumentElement(this._tagName);
    }
  }

  init (): void {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount (): void {
    this.componentDidMount && this.componentDidMount();
  }

  componentDidMount? (): void {}

  dispatchComponentDidMount () {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate (oldProps: T, newProps: T): void {
    if (this.componentDidUpdate) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (!response) {
        return;
      }
      this._removeEvents();
      this._render();
      this._componentDidMount();
    }
  }

  componentDidUpdate (oldProps?: T, newProps?: T): boolean {
    return oldProps !== newProps;
  }

  setProps = (nextProps: T): void => {
    if (!nextProps || !this.props) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element (): Maybe<HTMLElement> {
    return this._element;
  }

  private _addEvents (): void {
    if (this.props?.events && this._element) {
      this.props.events.forEach(({ eventName, callback }) => {
        this._element?.addEventListener(eventName, callback);
      });
    }
  }

  private _removeEvents (): void {
    if (this.props?.events && this._element) {
      this.props.events.forEach(({ eventName, callback }) => {
        this._element?.removeEventListener(eventName, callback);
      });
    }
  }

  private _render (): void {
    const block = this.render();
    if (this._element) {
      this._element.innerHTML = '';
      this._element.insertAdjacentHTML('afterbegin', block);
    } else {
      const template = document.createElement('template');

      template.innerHTML = block;

      const child = template.content.firstElementChild;

      if (child instanceof HTMLElement) {
        this._element = child;
      }
    }

    this._addEvents();
  }

  abstract render (): string

  getContent (): Maybe<HTMLElement> {
    return this.element;
  }

  private _makePropsProxy (props: T): T {
    const self = this;

    return new Proxy(props, {
      get (target, prop) {
        const value = target[prop as keyof T];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set (target, prop, value) {
        target[prop as keyof T] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty () {
        throw new Error('Нет доступа');
      }
    });
  }

  private _createDocumentElement (tagName: string) {
    return document.createElement(tagName);
  }

  show (): void {
    const content = this.getContent();

    if (content) {
      content.style.display = 'flex';
    }
  }

  hide (): void {
    const content = this.getContent();

    if (content) {
      content.style.display = 'none';
    }
  }
}
