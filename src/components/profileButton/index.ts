import { Block, TEvent } from '../../utils/Block';
import { ProfileArrow } from '../ProfileArrow';

export type TProfileButtonProps = {
  events?: Array<TEvent>;
}

export class ProfileButton extends Block<TProfileButtonProps> {
  constructor (props: TProfileButtonProps) {
    super(props);
  }

  render () {
    return `
      <span>Профиль ${ProfileArrow}</span>
    `;
  };
}
