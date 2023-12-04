import { ChatUserBlock, Link, MessageInput, SearchIcon, TChatUserBlockProps } from '../../components';
import { Modal } from '../../components/Modal';
import { ProfileButton } from '../../components/profileButton';
import ChatController from '../../controllers/ChatController';
import MessageController from '../../controllers/MessageController';
import { Maybe } from '../../types';
import { Block } from '../../utils/Block';
import store from '../../utils/Store';

export type TChatPageProps = {
  activeChat?: Maybe<TChatUserBlockProps>,
  userId?: string,
  chats: Array<TChatUserBlockProps>,
  onProfileClick: () => void,
}

enum EModalType {
  AddChat = 'add-chat',
  AddUser = 'add-user',
  DeleteUser = 'delete-user',
}

export class ChatPage extends Block<TChatPageProps> {
  constructor (props: TChatPageProps) {
    super(props);

    this.loadData();
  }

  componentDidMount (): void {
    this.renderChatBlocks();
    this.renderProfileButton();
    this.renderMessagesWindow();
  }

  async loadData () {
    const data = await ChatController.getChats();

    if (this.props && data) {
      this.setProps({ ...this.props, chats: data });
    }
  }

  renderMessageInput (): void {
    const container = document.querySelector('.chat-page__messages_inputs');

    if (container) {
      container.innerHTML = '';
      container.insertAdjacentElement('afterbegin', new MessageInput({
        events: [
          {
            eventName: 'click',
            callback: (event) => {
              event.preventDefault();

              if (event.target instanceof HTMLButtonElement || event.target instanceof HTMLSpanElement) {
                const form = document.querySelector('.message-input__container');

                if (form instanceof HTMLFormElement) {
                  const formData = new FormData(form);

                  const message = formData.get('message') as string;

                  if (this.props?.activeChat?.id && message.trim().length) {
                    MessageController.sendMessage(this.props?.activeChat?.id, message);
                  }

                  form.reset();
                }
              }
            }
          }
        ]
      }).getContent()!);
    }
  }

  renderChatBlocks (): void {
    const container = document.querySelector('.chat-page__users_users-list');

    if (container) {
      container.innerHTML = '';
      this.props?.chats.forEach(el => {
        const element = new ChatUserBlock({
          ...el,
          events: [{
            eventName: 'click',
            callback: (event) => {
              event.preventDefault();

              if (this.props) {
                this.setProps({ ...this.props, activeChat: el });
              }
            }
          }]
        });

        container.insertAdjacentElement('afterbegin', element.getContent()!);

        element.dispatchComponentDidMount();
      });
    }
  }

  renderProfileButton (): void {
    const container = document.querySelector('.chat-page__users_user-profile');

    if (container) {
      container.innerHTML = '';
      container?.insertAdjacentElement('afterbegin', new ProfileButton({
        events: [
          {
            eventName: 'click',
            callback: (event) => {
              event.preventDefault();
              this.props?.onProfileClick();
            }
          }
        ]
      }).getContent()!);

      container?.insertAdjacentElement('afterbegin', new Link({
        text: '&plus;&nbsp;Добавить чат',
        events: [{
          eventName: 'click',
          callback: (event) => {
            event.preventDefault();

            this.renderModal(EModalType.AddChat);

            const container = document.querySelector('.modal-hidden');

            if (container) {
              container.classList.replace('modal-hidden', 'modal-container');
            }
          }
        }]
      }).getContent()!);
    }
  }

  renderModal (type: EModalType): void {
    const container = document.getElementById('modal');

    let element;

    if (container) {
      container.innerHTML = '';

      switch (type) {
        case EModalType.AddChat:
          element = new Modal({
            input: { label: 'Название чата', value: '', name: 'title', id: 'title' },
            button: {
              text: 'Создать',
              id: 'create',
              name: 'create',
              events: [{
                eventName: 'click',
                callback: async (event) => {
                  event.preventDefault();

                  const form = document.querySelector('.modal-form');

                  if (form instanceof HTMLFormElement) {
                    const formData = new FormData(form);
                    const title = formData.get('title') as string;

                    await ChatController.createChat({ title });
                    this.loadData();
                  }
                }
              }]
            }
          });
          break;
        case EModalType.AddUser:
          element = new Modal({
            input: { label: 'ID пользователя', value: '', name: 'id', id: 'id' },
            button: {
              text: 'Добавить',
              id: 'add',
              name: 'add',
              events: [{
                eventName: 'click',
                callback: async (event) => {
                  event.preventDefault();

                  const form = document.querySelector('.modal-form');

                  if (form instanceof HTMLFormElement) {
                    const formData = new FormData(form);
                    const id = formData.get('id');

                    if (this.props?.activeChat?.id) {
                      await ChatController.addUsersToChat(this.props?.activeChat?.id, [Number(id)]);
                    }
                  }
                }
              }]
            }
          });
          break;
        case EModalType.DeleteUser:
          element = new Modal({
            input: { label: 'ID пользователя', value: '', name: 'id', id: 'id' },
            button: {
              text: 'Удалить',
              id: 'delete',
              name: 'delete',
              events: [{
                eventName: 'click',
                callback: async (event) => {
                  event.preventDefault();

                  const form = document.querySelector('.modal-form');

                  if (form instanceof HTMLFormElement) {
                    const formData = new FormData(form);
                    const id = formData.get('id');

                    if (this.props?.activeChat?.id) {
                      await ChatController.addUsersToChat(this.props?.activeChat?.id, [Number(id)]);
                    }
                  }
                }
              }]
            }
          });
          break;
        default:
          return;
      }

      container.insertAdjacentElement('beforeend', element.getContent()!);

      element.dispatchComponentDidMount();
    }
  }

  renderMessagesWindow () {
    const container = document.querySelector('.chat-page__messages');

    if (container) {
      container.innerHTML = '';

      if (!this.props?.activeChat) {
        container.innerHTML = `<div class="chat-page__messages_messages-start">
                                 <div>Выберите чат чтобы отправить сообщение</div>
                              </div>`;
        return;
      }

      container.innerHTML =
      `<div class="chat-page__messages_page">
        <div class="chat-page__messages_page-controls">
          <div class="chat-page__messages_page-controls-left">
            <div class="chat-page__messages_page-controls-avatar"></div>
            <div class="chat-page__messages_page-controls-title">${this.props.activeChat.title}</div>
          </div>
          <div class="chat-page__messages_page-controls-right">
          </div>
        </div>
        <div class="chat-page__messages_page-chat">
          <div class="chat-page__messages_messages"></div>
        </div>
        <div class="chat-page__messages_inputs"></div>
      </div>`;

      this.renderChatButtons();
      this.renderMessageInput();
      this.renderMessages();
    }
  }

  renderChatButtons () {
    const addButtonsContainer = document.querySelector('.chat-page__messages_page-controls-right');

    if (addButtonsContainer) {
      addButtonsContainer.insertAdjacentElement('beforeend', new Link({
        text: '&plus;&nbsp;Добавить пользователя',
        events: [{
          eventName: 'click',
          callback: (event) => {
            event.preventDefault();

            this.renderModal(EModalType.AddUser);

            const container = document.querySelector('.modal-hidden');

            if (container) {
              container.classList.replace('modal-hidden', 'modal-container');
            }
          }
        }]
      }).getContent()!);

      addButtonsContainer.insertAdjacentElement('beforeend', new Link({
        text: '&minus;&nbsp;Удалить пользователя',
        events: [{
          eventName: 'click',
          callback: (event) => {
            event.preventDefault();

            this.renderModal(EModalType.DeleteUser);

            const container = document.querySelector('.modal-hidden');

            if (container) {
              container.classList.replace('modal-hidden', 'modal-container');
            }
          }
        }]
      }).getContent()!);
    }
  }

  renderMessages () {
    const container = document.querySelector('.chat-page__messages_messages');

    if (container) {
      container.innerHTML = '';

      if (this.props?.activeChat) {
        store.getState().messages[this.props?.activeChat.id].forEach((message) => {
          if (message.user_id === store.getState().userId) {
            container.insertAdjacentHTML('afterbegin', `<div class="message message__right">${message.content}</div`);
          } else {
            container.insertAdjacentHTML('afterbegin', `<div class="message message__left">${message.content}</div`);
          }
        });
      }
    }
  }

  render (): string {
    return `
    <div>
      <div class="chat-page">
        <div class="chat-page__users">
          <div class="chat-page__users_user-profile">
          </div>
          <div class="chat-page__users_user-search">
            <span>${SearchIcon} Поиск</span>
          </div>
          <div class="chat-page__users_users-list">
          </div>
        </div>
        <div class="chat-page__messages">
        </div>
      </div>
      <div id="modal">
      </div>
    </div>
    `;
  }
}
