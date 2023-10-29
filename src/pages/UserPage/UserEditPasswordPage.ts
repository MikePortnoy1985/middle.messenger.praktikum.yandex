import UserPage from "./UserPage.hbs";

export const renderUserEditPasswordPage = () => UserPage({
  editAvatar: true,
  infoBlocks: [
    {
      input: true,
      userInfoBlockTitleClass: "user-info-block__title",
      userInfoBlockTitle: "Старый пароль",
      inputValue: "qwerty",
      inputName: 'oldPassword',
      inputId: 'oldPassword',
      inputType: 'password',
      noBorder: true,
    },
    {
      input: true,
      userInfoBlockTitleClass: "user-info-block__title",
      userInfoBlockTitle: "Новый пароль",
      inputValue: "qwerty123",
      inputName: 'newPassword',
      inputId: 'newPassword',
      inputType: 'password',
      noBorder: true,
    },
    {
      input: true,
      userInfoBlockTitleClass: "user-info-block__title",
      userInfoBlockTitle: "Повторите новый пароль",
      inputValue: "qwerty123",
      inputName: 'newPassword',
      inputId: 'newPassword',
      inputType: 'password',
      noBorder: true,
    },
  ],
  buttonName: 'save',
  buttonText: 'Сохранить'
});
