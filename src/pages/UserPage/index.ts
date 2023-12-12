import { ROUTES } from '../..';
import { Button, LeftArrow, TButtonProps, TUserInfoBlockProps, UploadAvatar, UserInfoBlock } from '../../components';
import UserController from '../../controllers/UserController';
import { Block } from '../../utils/Block';
import Router from '../../utils/Router';
import { validation } from '../../utils/validation';

export type TUserPageProps = {
  title?: string;
  editAvatar?: boolean;
  avatarSrc: string;
  infoBlocks: Array<TUserInfoBlockProps>;
  redirectLinks?: Array<TUserInfoBlockProps>;
  button?: TButtonProps;
}

export class UserPage extends Block<TUserPageProps> {
  constructor (props: TUserPageProps) {
    super(props);

    this.loadData();
  }

  async loadData () {
    try {
      const { error, response } = await UserController.getUser();

      if (!error) {
        this.setProps({
          ...this.props,
          title: response?.login || '',
          avatarSrc: response?.avatar || '',
          infoBlocks: this.props?.infoBlocks.map(block => {
            if (block.name) {
              return { ...block, value: response?.[block.name] };
            }

            if (block.input?.name) {
              return { ...block, input: { ...block.input, value: response?.[block.input.name] } };
            }

            return block;
          }) || []
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount (): void {
    this.renderInfoBlocks();
    this.renderLinksOrButton();
    this.handleArrowClick();
    this.renderAvatar();
  }

  handleArrowClick (): void {
    const arrow = document.querySelector('.user-page__arrow');

    arrow?.removeEventListener('click', this.onArrowClick);
    arrow?.addEventListener('click', this.onArrowClick);
  }

  onArrowClick (event: Event) {
    event.preventDefault();
    Router.go(ROUTES.CHAT_PAGE);
  }

  renderAvatar (): void {
    const container = document.querySelector('.user-page__avatar');

    if (container) {
      container.innerHTML = '';
      if (this.props?.editAvatar) {
        container.insertAdjacentElement('afterbegin', new UploadAvatar({
          src: this.props.avatarSrc,
          editAvatar: true,
          events: [{
            eventName: 'change',
            callback: async (event) => {
              if (event.target instanceof HTMLInputElement) {
                const file = event.target.files?.[0];

                if (file) {
                  const formData = new FormData();
                  formData.append('avatar', file);

                  await UserController.updateAvatar(formData);
                  this.loadData();
                }
              }
            }
          }]
        }).getContent()!);
      } else {
        container.insertAdjacentElement('afterbegin', new UploadAvatar({ src: this.props?.avatarSrc }).getContent()!);
      }
    }
  }

  renderInfoBlocks (): void {
    const container = document.querySelector('.user-page__user-info-blocks');

    if (container) {
      container.innerHTML = '';
      this.props?.infoBlocks.forEach(el => {
        const element = new UserInfoBlock({ ...el, events: [{ eventName: 'focusout', callback: this.onBlur.bind(this) }] });

        container.insertAdjacentElement('beforeend', element.getContent()!);

        element.dispatchComponentDidMount();
      });
    }
  }

  renderLinksOrButton (): void {
    const container = document.querySelector('.user-page__layout');

    if (container) {
      if (this.props?.redirectLinks) {
        const innerContainer = document.querySelector('.user-page__user-redirect-links')!;

        innerContainer.innerHTML = '';
        this.props?.redirectLinks.map(el => innerContainer.insertAdjacentElement('beforeend', new UserInfoBlock(el).getContent()!));

        container.appendChild(innerContainer);
      }

      if (this.props?.button) {
        const innerContainer = document.querySelector('.user-page__user-save-button')!;

        innerContainer.innerHTML = '';
        innerContainer.insertAdjacentElement('afterbegin', new Button({ ...this.props.button, events: [{ eventName: 'click', callback: this.onSubmit.bind(this) }] }).getContent()!);

        container.appendChild(innerContainer);
      }
    }
  }

  handleValidation (name: string, value: string): void {
    const error = validation[name]?.(value);

    if (this.props?.infoBlocks) {
      this.setProps({
        ...this.props,
        infoBlocks: this.props.infoBlocks.map(block => {
          if (name && block.input?.name === name) {
            block.input.errorText = error;
            block.input.value = value;
          }

          return block;
        })
      });
    }
  }

  formValidation (): Record<string, string | File> | void {
    const form = document.querySelector('.user-page__user-info-blocks');

    if (form instanceof HTMLFormElement) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      [...formData.entries()].forEach(([name, value]) => this.handleValidation(name, value.toString()));

      return data;
    }
  }

  onBlur (): void {
    this.formValidation();
  }

  async onSubmit (): Promise<void> {
    const data = this.formValidation();

    if (this.props?.infoBlocks.some(block => {
      if (block.input) {
        return block.input.errorText;
      }

      return false;
    })) {
      return;
    }

    if (data) {
      await UserController.updateUser(data);
    }

    Router.go(ROUTES.PROFILE);
  }

  render (): string {
    return `
      <div>
        <div class="user-page__container">
          <div class="user-page__arrow">
            ${LeftArrow}
          </div>
          <div class="user-page__page">
            <div class="user-page__layout">
              <div class="user-page__avatar"></div>
              ${this.props?.title ? `<div class="user-page__title">${this.props?.title}</div>` : ''}
              <form class="user-page__user-info-blocks"></form>
              ${this.props?.redirectLinks ? '<div class="user-page__user-redirect-links"></div>' : ''}
              ${this.props?.button ? '<div class="user-page__user-save-button"></div>' : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
