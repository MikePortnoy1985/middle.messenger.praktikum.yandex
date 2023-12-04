import { Block, TEvent } from '../../utils/Block';
import { Button, TButtonProps } from '../Button';
import { Input, TInputProps } from '../Input';

export type TModalProps = {
  input: TInputProps,
  button: TButtonProps,
  events?: Array<TEvent>,
}

export class Modal extends Block<TModalProps> {
  constructor (props: TModalProps) {
    super(props);
  }

  componentDidMount (): void {
    this.renderInputAndButton();

    const button = document.querySelector('.modal-close');

    button?.removeEventListener('click', this.handleModalClose);
    button?.addEventListener('click', this.handleModalClose);
  }

  renderInputAndButton () {
    const container = document.querySelector('.modal-form');

    if (container && this.props?.input && this.props.button) {
      container.innerHTML = '';
      container.insertAdjacentElement('afterbegin', new Input(this.props.input).getContent()!);
      container.insertAdjacentElement('beforeend', new Button(this.props.button).getContent()!);
    }
  }

  handleModalClose (event: Event) {
    event.preventDefault();

    const container = document.querySelector('.modal-container');

    if (container) {
      container.classList.replace('modal-container', 'modal-hidden');
    }
  }

  render () {
    return `
      <div class="modal-hidden">
        <div class="modal-inner">
          <form class="modal-form"></form>
          <div class="modal-close">&times;</div>
        </div>
      </div>
    `;
  };
}
