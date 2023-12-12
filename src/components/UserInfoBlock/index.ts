import { Block, TEvent } from '../../utils/Block';
import { Input, TInputProps } from '../Input';

export type TUserInfoBlockProps = {
  title: string;
  classTitle: string;
  name?: string;
  value?: string;
  input?: TInputProps;
  events?: Array<TEvent>;
}

export class UserInfoBlock extends Block<TUserInfoBlockProps> {
  constructor (props: TUserInfoBlockProps) {
    super(props);
  }

  componentDidMount (): void {
    this.renderContent();
  }

  renderContent () {
    const container = document.getElementById(this.props?.title || '');

    if (container) {
      if (this.props?.value) {
        container?.insertAdjacentHTML('beforeend', `<div class="user-info-block__value">${this.props?.value}</div>`);
      }

      if (this.props?.input) {
        container?.insertAdjacentElement('beforeend', new Input(this.props.input).getContent()!);
      }
    }
  }

  render () {
    return `
      <div id="${this.props?.title}" class="user-info-block__container" tabindex="0">
        <div class=${this.props?.classTitle}>${this.props?.title}</div>
      </div>
    `;
  };
}
