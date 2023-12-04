import { Block, TEvent } from '../../utils/Block';

export type TMessageInputProps = {
  events?: Array<TEvent>;
}

export class MessageInput extends Block<TMessageInputProps> {
  constructor (props: TMessageInputProps = {}) {
    super(props);
  }

  render () {
    return `
      <form class="message-input__container">
        <input class="message-input__input" type="text" placeholder="Сообщение" name="message">
        <button class="message-input__button" id="arrow">
          <span class="message-input__arrow">&rarr;</span>
        </button>
      </form>
    `;
  };
}
