import Handlebars from "handlebars/runtime";
import Button from "./Button/Button.hbs";
import Input from "./Input/Input.hbs";
import Link from "./Link/Link.hbs";
import UserInfoBlock from "./UserInfoBlock/UserInfoBlock.hbs";
import UserAvatar from "./UserAvatar/UserAvatar.hbs";
import LeftArrow from "./LeftArrow/LeftArrow.hbs";
import RightArrow from "./RightArrow/RightArrow.hbs";
import ChatUserBlock from "./ChatUserBlock/ChatUserBlock.hbs";
import ProfileArrow from "./ProfileArrow/ProfileArrow.hbs";
import SearchIcon from "./SearchIcon/SearchIcon.hbs";
import UploadAvatar from './UploadAvatar/UploadAvatar.hbs';
import MessageInput from './MessageInput/MessageInput.hbs';

class Components {
  constructor(public data: Record<string, (params?: any) => string>) {}

  registerPartials = () => {
    Object.entries(this.data).forEach(([name, template]) =>
      Handlebars.registerPartial(name, template)
    );
  };
}

export default new Components({
  Button,
  Input,
  Link,
  UserInfoBlock,
  UserAvatar,
  LeftArrow,
  RightArrow,
  ChatUserBlock,
  ProfileArrow,
  SearchIcon,
  UploadAvatar,
  MessageInput,
});
