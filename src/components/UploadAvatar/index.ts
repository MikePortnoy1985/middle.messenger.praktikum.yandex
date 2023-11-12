import { Block, TEvent } from '../../utils/Block';
import { UserAvatar } from '../UserAvatar';

export type TUploadAvatarProps = {
  events?: Array<TEvent>
}

export class UploadAvatar extends Block<TUploadAvatarProps> {
  constructor (props: TUploadAvatarProps = {}) {
    super(props);
  }

  render () {
    return `
    <div>
      <label for="avatar">
        ${UserAvatar}
      </label>
      <input name="avatar" id="avatar" type="file" accept="image/*" hidden/>
    </div>
    `;
  };
}
