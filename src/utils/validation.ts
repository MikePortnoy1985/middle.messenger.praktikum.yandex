export const validation: Record<string, (value: string) => string> = {
  login (value: string) {
    if (value.trim().length <= 3 || value.trim().length >= 20) {
      return 'Логин не может быть меньше 3 и больше 20 символов';
    }

    if (!value.match(/^[a-zA-Z0-9_-]{3,}$/)) {
      return 'Логин может содержать только буквы, цифры, дефис или нижнее подчеркивание';
    }
    return '';
  },

  password (value: string) {
    if (value.trim().length <= 8 || value.trim().length >= 40) {
      return 'Пароль не может содержать меньше 8 и больше 40 символов';
    }

    if (!value.match(/(?=.*[A-Z])/)) {
      return 'Пароль должен содержать хотя бы одну заглавную букву';
    }

    if (!value.match(/(?=.*[0-9])/)) {
      return 'Пароль должен содержать хотя бы 1 цифру';
    }

    return '';
  },

  oldPassword (value: string) {
    if (value.trim().length <= 8 || value.trim().length >= 40) {
      return 'Пароль не может содержать меньше 8 и больше 40 символов';
    }

    if (!value.match(/(?=.*[A-Z])/)) {
      return 'Пароль должен содержать хотя бы одну заглавную букву';
    }

    if (!value.match(/(?=.*[0-9])/)) {
      return 'Пароль должен содержать хотя бы 1 цифру';
    }

    return '';
  },

  newPassword (value: string) {
    if (value.trim().length <= 8 || value.trim().length >= 40) {
      return 'Пароль не может содержать меньше 8 и больше 40 символов';
    }

    if (!value.match(/(?=.*[A-Z])/)) {
      return 'Пароль должен содержать хотя бы одну заглавную букву';
    }

    if (!value.match(/(?=.*[0-9])/)) {
      return 'Пароль должен содержать хотя бы 1 цифру';
    }

    return '';
  },

  email (value: string) {
    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return 'Неверный email';
    }
    return '';
  },

  phone (value: string) {
    if (!value.match(/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/)) {
      return 'Некорректный номер телефона';
    }
    return '';
  },

  name (value: string) {
    if (!value.match(/^([A-ZА-Я]{1})([A-ZА-Яa-zа-я-]{0,})$/)) {
      return 'Имя должно начинаться с заглавной буквы';
    }
    return '';
  },

  first_name (value: string) {
    if (!value.match(/^([A-ZА-Я]{1})([A-ZА-Яa-zа-я-]{0,})$/)) {
      return 'Имя должно начинаться с заглавной буквы';
    }
    return '';
  },

  second_name (value: string) {
    if (!value.match(/^([A-ZА-Я]{1})([A-ZА-Яa-zа-я-]{0,})$/)) {
      return 'Фамилия должна начинаться с заглавной буквы';
    }
    return '';
  }
};
