import { TAuthProps } from '../pages/Auth';
import { TChatPageProps } from '../pages/ChatPage';
import { TExtraPageProps } from '../pages/ExtraPage';
import { TUserPageProps } from '../pages/UserPage';

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
    text: 'Создать аккаунт',
    href: '/login'
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
    },
    {
      name: 'password',
      type: 'password',
      id: 'password',
      label: 'Пароль (еще раз)',
      value: ''
    }
  ],
  title: 'Регистрация',
  button: {
    text: 'Зарегистрироваться'
  },
  link: {
    text: 'Войти',
    href: '/registration'
  }
};

export const CHAT_PAGE_DATA: TChatPageProps = {
  users: [
    {
      username: 'Robin',
      message:
        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      time: '12:38',
      messageCount: 9
    },
    {
      username: 'Robin',
      message:
        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      time: '12:38',
      messageCount: 9
    }
  ]
};

export const ERROR_PAGE_DATA: TExtraPageProps = {
  errorCode: '500',
  infoText: 'Мы уже фиксим',
  link: {
    text: 'Назад к чатам',
    href: '/'
  }
};

export const NOT_FOUND_PAGE_DATA: TExtraPageProps = {
  errorCode: '404',
  infoText: 'Не туда попали',
  link: {
    text: 'Назад к чатам',
    href: '/'
  }
};

export const USER_PROFILE_PAGE_DATA: TUserPageProps = {
  title: 'Batman',
  infoBlocks: [
    {
      classTitle: 'user-info-block__title',
      title: 'Почта',
      value: 'batman@yandex.ru'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Логин',
      value: 'batman'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Имя',
      value: 'Bat'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Фамилия',
      value: 'Man'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Имя в чате',
      value: 'Batman'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Телефон',
      value: '+7 (707) 777 77 77'
    }
  ],
  redirectLinks: [
    {
      classTitle: 'user-info-block__title_with-link',
      title: 'Изменить данные'
    },
    {
      classTitle: 'user-info-block__title_with-link',
      title: 'Изменить пароль'
    },
    {
      classTitle: 'user-info-block__title',
      title: 'Выход'
    }
  ]
};

export const USER_EDIT_DATA_PAGE_DATA: TUserPageProps = {
  editAvatar: true,
  infoBlocks: [
    {
      input: {
        value: 'batman@yandex.ru',
        name: 'email',
        id: 'email',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Почта'
    },
    {
      input: {
        value: 'batman',
        name: 'login',
        id: 'login',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Логин'
    },
    {
      input: {
        value: 'Bat',
        name: 'first_name',
        id: 'first_name',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Имя'
    },
    {
      input: {
        value: 'Man',
        name: 'second_name',
        id: 'second_name',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Фамилия'
    },
    {
      input: {
        value: 'Batman',
        name: 'display_name',
        id: 'display_name',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Имя в чате'
    },
    {
      input: {
        value: '+7 (707) 777 77 77',
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
  infoBlocks: [
    {
      input: {
        value: 'qwerty',
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
        value: 'qwerty123',
        name: 'newPassword',
        id: 'newPassword',
        type: 'password',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Новый пароль'
    },
    {
      input: {
        value: 'qwerty123',
        name: 'newPassword',
        id: 'newPassword',
        type: 'password',
        noBorder: true
      },
      classTitle: 'user-info-block__title',
      title: 'Повторите новый пароль'
    }
  ],
  button: {
    name: 'save',
    text: 'Сохранить'
  }
};
