import { ROUTES } from '..';
import UserController, { TCreateUserData, TLoginUserData } from '../controllers/UserController';
import { TAuthProps } from '../pages/Auth';
import { TChatPageProps } from '../pages/ChatPage';
import { TExtraPageProps } from '../pages/ExtraPage';
import { TUserPageProps } from '../pages/UserPage';
import Router from '../utils/Router';

export const LOGIN_PAGE_DATA: TAuthProps = {
  inputs: [
    {
      name: 'login',
      type: 'text',
      id: 'login',
      label: 'Логин',
      value: ''
    },
    {
      name: 'password',
      type: 'password',
      id: 'password',
      label: 'Пароль',
      value: ''
    }
  ],
  title: 'Вход',
  button: {
    text: 'Войти',
    id: 'loginButton'
  },
  link: {
    text: 'Создать аккаунт'
  },
  submitRedirectCallback: async (data: TLoginUserData) => {
    const { error } = await UserController.loginUser(data);

    if (!error) {
      Router.go(ROUTES.CHAT_PAGE);
    }
  },
  linkRedirectCallback: () => {
    Router.go(ROUTES.REGISTRATION);
  }
};

export const REGISTRATION_PAGE_DATA: TAuthProps = {
  inputs: [
    {
      name: 'email',
      type: 'email',
      id: 'email',
      label: 'Почта',
      value: ''
    },
    {
      name: 'login',
      type: 'text',
      id: 'login',
      label: 'Логин',
      value: ''
    },
    {
      name: 'first_name',
      type: 'text',
      id: 'first_name',
      label: 'Имя',
      value: ''
    },
    {
      name: 'second_name',
      type: 'text',
      id: 'second_name',
      label: 'Фамилия',
      value: ''
    },
    {
      name: 'phone',
      type: 'phone',
      id: 'phone',
      label: 'Телефон',
      value: ''
    },
    {
      name: 'password',
      type: 'password',
      id: 'password',
      label: 'Пароль',
      value: ''
    }
  ],
  title: 'Регистрация',
  button: {
    text: 'Зарегистрироваться'
  },
  link: {
    text: 'Войти'
  },
  submitRedirectCallback: async (data: TCreateUserData) => {
    const { error } = await UserController.createUser(data);

    if (!error) {
      Router.go(ROUTES.LOGIN);
    }
  },
  linkRedirectCallback: () => {
    Router.go(ROUTES.LOGIN);
  }

};

export const CHAT_PAGE_DATA: TChatPageProps = {
  activeChat: null,
  chats: [],
  onProfileClick: () => Router.go(ROUTES.PROFILE)
};

export const ERROR_PAGE_DATA: TExtraPageProps = {
  errorCode: '500',
  infoText: 'Мы уже фиксим',
  link: {
    text: 'Назад к чатам'
  },
  redirectCallback: () => {
    Router.go(ROUTES.CHAT_PAGE);
  }
};

export const NOT_FOUND_PAGE_DATA: TExtraPageProps = {
  errorCode: '404',
  infoText: 'Не туда попали',
  link: {
    text: 'Назад к чатам'
  },
  redirectCallback: () => {
    Router.go(ROUTES.CHAT_PAGE);
  }
};

export const USER_PROFILE_PAGE_DATA: TUserPageProps = {
  title: '',
  avatarSrc: '',
  infoBlocks: [
    {
      classTitle: 'user-info-block__title',
      title: 'Почта',
      value: '',
      name: 'email'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Логин',
      value: '',
      name: 'login'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Имя',
      value: '',
      name: 'first_name'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Фамилия',
      value: '',
      name: 'second_name'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Имя в чате',
      value: '',
      name: 'display_name'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Телефон',
      value: '',
      name: 'phone'
    }
  ],
  redirectLinks: [
    {
      classTitle: 'user-info-block__title_with-link',
      title: 'Изменить данные',
      events: [{
        eventName: 'click',
        callback: (event) => {
          event.preventDefault();
          if (event.target instanceof HTMLDivElement && event.target?.className === 'user-info-block__title_with-link') {
            Router.go(ROUTES.EDIT_PROFILE);
          };
        }
      }]
    },
    {
      classTitle: 'user-info-block__title_with-link',
      title: 'Изменить пароль',
      events: [{
        eventName: 'click',
        callback: (event) => {
          event.preventDefault();
          if (event.target instanceof HTMLDivElement && event.target?.className === 'user-info-block__title_with-link') {
            Router.go(ROUTES.EDIT_PASSWORD);
          };
        }
      }]
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Выход',
      events: [{
        eventName: 'click',
        callback: async (event) => {
          event.preventDefault();
          if (event.target instanceof HTMLDivElement && event.target?.className === 'user-info-block__title') {
            const { error } = await UserController.logoutUser();

            if (!error) {
              Router.go(ROUTES.LOGIN);
            }
          };
        }
      }]
    }
  ]
};

export const USER_EDIT_DATA_PAGE_DATA: TUserPageProps = {
  editAvatar: true,
  avatarSrc: '',
  infoBlocks: [
    {
      input: {
        value: '',
        name: 'email',
        id: 'email',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Почта'
    },
    {
      input: {
        value: '',
        name: 'login',
        id: 'login',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Логин'
    },
    {
      input: {
        value: '',
        name: 'first_name',
        id: 'first_name',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Имя'
    },
    {
      input: {
        value: '',
        name: 'second_name',
        id: 'second_name',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Фамилия'
    },
    {
      input: {
        value: '',
        name: 'display_name',
        id: 'display_name',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Имя в чате'
    },
    {
      input: {
        value: '',
        name: 'phone',
        id: 'phone',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Телефон'
    }
  ],
  button: {
    name: 'save',
    id: 'save',
    text: 'Сохранить'
  }
};

export const USER_EDIT_PASSWORD_PAGE_DATA: TUserPageProps = {
  editAvatar: true,
  avatarSrc: '',
  infoBlocks: [
    {
      input: {
        value: '',
        name: 'oldPassword',
        id: 'oldPassword',
        type: 'password',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Старый пароль'
    },
    {
      input: {
        value: '',
        name: 'newPassword',
        id: 'newPassword',
        type: 'password',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Новый пароль'
    }
  ],
  button: {
    name: 'save',
    text: 'Сохранить'
  }
};
