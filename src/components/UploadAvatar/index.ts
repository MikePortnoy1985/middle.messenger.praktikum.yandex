import { Block, TEvent } from '../../utils/Block';
import { UserAvatar } from '../UserAvatar';

export type TUploadAvatarProps = {
  src?: string;
  editAvatar?: boolean;
  events?: Array<TEvent>
}

export class UploadAvatar extends Block<TUploadAvatarProps> {
  constructor (props: TUploadAvatarProps = {}) {
    super(props);
  }

  render () {
    const path = `https://ya-praktikum.tech/api/v2/resources${this.props?.src}`;

    return `
    <div>
      <label for="avatar">
        <div class="user-avatar__container">
          ${this.props?.src ? `<img class="user-avatar__image" src="${path}" alt="avatar" />` : UserAvatar}
        </div>
      </label>
      ${this.props?.editAvatar ? '<input name="avatar" id="avatar" type="file" accept="image/*" hidden/>' : ''}
    </div>
    `;
  };
}
