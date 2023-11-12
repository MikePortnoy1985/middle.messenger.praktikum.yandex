import { ChatUserBlock, MessageInput, ProfileArrow, SearchIcon, TChatUserBlockProps } from '../../components';
import { TEvent, Block } from '../../utils/Block';

export type TChatPageProps = {
  users: Array<TChatUserBlockProps>
  events?: Array<TEvent>
}

export class ChatPage extends Block<TChatPageProps> {
  constructor (props: TChatPageProps) {
    super(props);
  }

  componentDidMount (): void {
    this.renderChatUserBlocks();
    this.renderMessageInput();
  }

  renderMessageInput (): void {
    const container = document.querySelector('.chat-page__messages_inputs');

    container?.insertAdjacentElement('afterbegin', new MessageInput().getContent()!);
  }

  renderChatUserBlocks (): void {
    const container = document.querySelector('.chat-page__users_users-list');

    if (container) {
      this.props?.users.map(el => container.insertAdjacentElement('beforeend', new ChatUserBlock(el).getContent()!));
    }
  }

  render (): string {
    return `
    <div class="chat-page">
      <div class="chat-page__users">
        <div class="chat-page__users_user-profile">
          <span>Профиль ${ProfileArrow}</span>
        </div>
        <div class="chat-page__users_user-search">
          <span>${SearchIcon} Поиск</span>
        </div>
        <div class="chat-page__users_users-list">
        </div>
      </div>
      <div class="chat-page__messages">
        <div class="chat-page__messages_messages-start">
          <div>Выберите чат чтобы отправить сообщение</div>
        </div>
        <div class="chat-page__messages_inputs">
        </div>
      </div>
  </div>
    `;
  }
}
