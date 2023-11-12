import { Block, TEvent } from '../../utils/Block';

export type TButtonProps = {
  name?: string;
  id?: string;
  text: string;
  events?: Array<TEvent>;
}

export class Button extends Block<TButtonProps> {
  constructor (props: TButtonProps) {
    super(props);
  }

  render () {
    return `
      <button id="${this.props?.id}" class="custom-button" name="${this.props?.name}">${this.props?.text}</button>
    `;
  };
}
