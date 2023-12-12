import { Block, TEvent } from '../../utils/Block';

export type TChatBlockProps = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message?: {
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
  events?: Array<TEvent>
}

export class ChatBlock extends Block<TChatBlockProps> {
  constructor (props: TChatBlockProps) {
    super(props);
  }

  componentDidMount (): void {
    const block = document.querySelector('.chat-user-block');

    block?.removeEventListener('mouseenter', this.onBlockHover);
    block?.removeEventListener('mouseleave', this.onBlockHover);

    block?.addEventListener('mouseenter', this.onBlockHover);
    block?.addEventListener('mouseleave', this.onBlockHover);
  }

  renderMessageCount () {
    if (this.props?.unread_count) {
      return `<div class="chat-user-block__count">${this.props?.unread_count}</div>`;
    }

    return '';
  }

  onBlockHover (event: Event) {
    if (event.target instanceof HTMLDivElement) {
      event.target.classList.toggle('chat-user-block_hovered');
    }
  }

  render () {
    let lastMessageTime = '';

    const date = new Date(this.props?.last_message?.time || '');
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (!isNaN(hours) && !isNaN(minutes)) {
      lastMessageTime = `${hours}:${minutes}`;
    }

    return `
      <div class="chat-user-block">
        <div class="chat-user-block__avatar-wrapper">
          <div class="chat-user-block__avatar">
            ${this.props?.avatar ? `<img class="chat-user-block__avatar-image" src="${this.props.avatar}" alt="avatar" />` : ''}
          </div>
        </div>
        <div class="chat-user-block__info">
          <div class="chat-user-block__username">
            ${this.props?.title}
          </div>
          <div class="chat-user-block__message-preview">${this.props?.last_message?.content || ''}</div>
          ${lastMessageTime ? `<div class="chat-user-block__time">${lastMessageTime}</div>` : ''}
          ${this.renderMessageCount()}
        </div>
      </div>
    `;
  };
}
