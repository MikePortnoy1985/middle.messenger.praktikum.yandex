import { Block } from '../../utils/Block';

export type TLinkProps = {
  href: string;
  text: string;
  id?: string;
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
