import UserPage from "./UserPage.hbs";

export const renderUserEditPage = () => UserPage({
  editAvatar: true,
  infoBlocks: [
    {
      input: true,
      userInfoBlockTitleClass: "user-info-block__title",
      userInfoBlockTitle: "Почта",
      inputValue: "batman@yandex.ru",
      inputName: 'email',
      inputId: 'email',
      noBorder: true,
    },
    {
      input: true,
      userInfoBlockTitleClass: "user-info-block__title",
      userInfoBlockTitle: "Логин",
      inputValue: "batman",
      inputName: 'login',
      inputId: 'login',
      noBorder: true,
    },
    {
      input: true,
      userInfoBlockTitleClass: "user-info-block__title",
      userInfoBlockTitle: "Имя",
      inputValue: "Bat",
      inputName: 'first_name',
      inputId: 'first_name',
      noBorder: true,
    },
    {
      input: true,
      userInfoBlockTitleClass: "user-info-block__title",
      userInfoBlockTitle: "Фамилия",
      inputValue: "Man",
      inputName: 'second_name',
      inputId: 'second_name',
      noBorder: true,
    },
    {
      input: true,
      userInfoBlockTitleClass: "user-info-block__title",
      userInfoBlockTitle: "Имя в чате",
      inputValue: "Batman",
      inputName: 'display_name',
      inputId: 'display_name',
      noBorder: true,
    },
    {
      input: true,
      userInfoBlockTitleClass: "user-info-block__title",
      userInfoBlockTitle: "Телефон",
      inputValue: "+7 (707) 777 77 77",
      inputName: 'phone',
      inputId: 'phone',
      noBorder: true,
    },
  ],
  buttonName: 'save',
  buttonText: 'Сохранить'
});
