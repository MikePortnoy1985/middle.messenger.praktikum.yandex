import { Button, Input, Link, TButtonProps, TInputProps, TLinkProps } from '../../components';
import { Block } from '../../utils/Block';
import { validation } from '../../utils/validation';

export type TAuthProps = {
  title: string;
  inputs: Array<TInputProps>;
  button: TButtonProps;
  link: TLinkProps;
}

export class Auth extends Block<TAuthProps> {
  constructor (props: TAuthProps) {
    super(props);
  }

  componentDidMount (): void {
    this.renderInputs();
    this.renderButton();
    this.renderLink();
  }

  renderInputs (): void {
    const form = document.querySelector('.page__form');
    if (this.props?.inputs && form) {
      this.props.inputs.map(el => form.insertAdjacentElement('beforeend', new Input({ ...el, events: [{ eventName: 'focusout', callback: this.onBlur.bind(this) }] }).getContent()!));
    }
  }

  renderButton (): void {
    const wrapper = document.querySelector('.page__buttons');
    if (this.props?.button && wrapper) {
      wrapper.insertAdjacentElement('afterbegin', new Button({ ...this.props?.button, events: [{ eventName: 'click', callback: this.onSubmit.bind(this) }] }).getContent()!);
    }
  }

  renderLink (): void {
    const wrapper = document.querySelector('.page__buttons');

    if (this.props?.link) {
      wrapper?.insertAdjacentElement('beforeend', new Link(this.props?.link).getContent()!);
    }
  }

  handleValidation (name: string, value: string): void {
    const error = validation[name]?.(value);

    if (this.props?.inputs) {
      this.setProps({
        ...this.props,
        inputs: this.props.inputs.map(input => {
          if (input.name && input.name === name) {
            input.errorText = error;
            input.value = value;
          }

          return input;
        })
      });
    }
  }

  formValidation (): Record<string, string | File> | void {
    const form = document.querySelector('.page__form');

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
      <div class="page__container">
        <div class="page__form-wrapper">
          <h2 class="page__title">${this.props?.title}</h2>
          <form class="page__form">
          </form>
          <div class="page__buttons">
          </div>
        </div>
      </div>
    `;
  };
}
