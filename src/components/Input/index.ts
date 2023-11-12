import { Block, TEvent } from '../../utils/Block';

export type TInputProps = {
  noBorder?: boolean;
  name: string;
  id: string;
  type?: string;
  value?: string;
  label?: string;
  errorText?: string;
  events?: Array<TEvent>
}

export class Input extends Block<TInputProps> {
  constructor (props: TInputProps) {
    super(props);
  }

  getClassName (className: string): string {
    if (this.props?.noBorder) {
      return className + '_no-border';
    } else {
      return className;
    }
  }

  render () {
    return `
      <div class="custom-input__container" tabindex="0">
        <input
          required="true"
          value="${this.props?.value}"
          class=${this.getClassName('custom-input__input')}
          name=${this.props?.name}
          id=${this.props?.id}
          type=${this.props?.type || 'text'}
        />
        <label class="custom-input__label" for=${this.props?.id}>${this.props?.label || ''}</label>
        <span class="${this.getClassName('custom-input__error-text')}">${this.props?.errorText || ''}</span>
      </div>
    `;
  };
}
