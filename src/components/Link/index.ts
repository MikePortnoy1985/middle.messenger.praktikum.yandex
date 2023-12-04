import { Block, TEvent } from '../../utils/Block';

export type TLinkProps = {
  href?: string;
  text: string;
  id?: string;
  events?: Array<TEvent>
}

export class Link extends Block<TLinkProps> {
  constructor (props: TLinkProps) {
    super(props);
  }

  render () {
    return `
      <a class="custom-link" id="${this.props?.id || ''}" href=${this.props?.href}>${this.props?.text}</a>
    `;
  };
}
