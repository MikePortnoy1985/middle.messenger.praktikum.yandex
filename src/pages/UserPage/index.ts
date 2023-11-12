import { Button, LeftArrow, TButtonProps, TUserInfoBlockProps, UploadAvatar, UserAvatar, UserInfoBlock } from '../../components';
import { Block } from '../../utils/Block';
import { validation } from '../../utils/validation';

export type TUserPageProps = {
  title?: string;
  editAvatar?: boolean;
  infoBlocks: Array<TUserInfoBlockProps>;
  redirectLinks?: Array<TUserInfoBlockProps>;
  button?: TButtonProps;
}

export class UserPage extends Block<TUserPageProps> {
  constructor (props: TUserPageProps) {
    super(props);
  }

  componentDidMount (): void {
    this.renderAvatar();
    this.renderInfoBlocks();
    this.renderLinksOrButton();
  }

  renderAvatar (): void {
    const container = document.querySelector('.user-page__avatar');

    if (container) {
      if (this.props?.editAvatar) {
        container.insertAdjacentElement('afterbegin', new UploadAvatar().getContent()!);
      } else {
        container.insertAdjacentHTML('afterbegin', UserAvatar);
      }
    }
  }

  renderInfoBlocks (): void {
    const container = document.querySelector('.user-page__user-info-blocks');

    if (container) {
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

        this.props?.redirectLinks.map(el => innerContainer.insertAdjacentElement('beforeend', new UserInfoBlock(el).getContent()!));

        container.appendChild(innerContainer);
      }

      if (this.props?.button) {
        const innerContainer = document.querySelector('.user-page__user-save-button')!;

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

  onSubmit (): void {
    const data = this.formValidation();
    console.log(data);
  }

  render (): string {
    return `
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
    `;
  }
}
