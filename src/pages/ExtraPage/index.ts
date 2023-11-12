import { Link, TLinkProps } from '../../components';
import { Block } from '../../utils/Block';

export type TExtraPageProps = {
  errorCode: string;
  infoText: string;
  link: TLinkProps;
}

export class ExtraPage extends Block<TExtraPageProps> {
  constructor (props: TExtraPageProps) {
    super(props);
  }

  componentDidMount (): void {
    this.renderLink();
  }

  renderLink (): void {
    const container = document.querySelector('.extra-page__redirect');

    if (this.props?.link) {
      container?.insertAdjacentElement('afterbegin', new Link(this.props?.link).getContent()!);
    }
  }

  render (): string {
    return `
      <div class="extra-page__container">
        <div class="extra-page__error-code">${this.props?.errorCode}</div>
        <div class="extra-page__info-text">${this.props?.infoText}</div>
        <div class="extra-page__redirect">
        </div>
      </div>
    `;
  }
}
