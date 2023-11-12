import { Block } from '../../utils/Block';

export type TChatUserBlockProps = {
  username: string;
  messageCount: number;
  time: string;
  message: string;
}

export class ChatUserBlock extends Block<TChatUserBlockProps> {
  constructor (props: TChatUserBlockProps) {
    super(props);
  }

  renderMessageCount () {
    if (this.props?.messageCount) {
      return `<div class="chat-user-block__count">${this.props?.messageCount}</div>`;
    }
  }

  render () {
    return `
      <div class="chat-user-block">
        <div class="chat-user-block__avatar-wrapper">
          <div class="chat-user-block__avatar"></div>
        </div>
        <div class="chat-user-block__info">
          <div class="chat-user-block__username">
            ${this.props?.username}
          </div>
          <div class="chat-user-block__message-preview">${this.props?.message}</div>
          <div class="chat-user-block__time">${this.props?.time}</div>
          ${this.renderMessageCount()}
        </div>
      </div>
    `;
  };
}
