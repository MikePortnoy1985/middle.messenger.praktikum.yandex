import UserPage from "./UserPage.hbs";

export const renderUserProfilePage = () =>
  UserPage({
    userTitle: "Batman",
    infoBlocks: [
      {
        value: true,
        userInfoBlockTitleClass: "user-info-block__title",
        userInfoBlockTitle: "Почта",
        userInfoBlockValue: "batman@yandex.ru",
      },
      {
        value: true,
        userInfoBlockTitleClass: "user-info-block__title",
        userInfoBlockTitle: "Логин",
        userInfoBlockValue: "batman",
      },
      {
        value: true,
        userInfoBlockTitleClass: "user-info-block__title",
        userInfoBlockTitle: "Имя",
        userInfoBlockValue: "Bat",
      },
      {
        value: true,
        userInfoBlockTitleClass: "user-info-block__title",
        userInfoBlockTitle: "Фамилия",
        userInfoBlockValue: "Man",
      },
      {
        value: true,
        userInfoBlockTitleClass: "user-info-block__title",
        userInfoBlockTitle: "Имя в чате",
        userInfoBlockValue: "Batman",
      },
      {
        value: true,
        userInfoBlockTitleClass: "user-info-block__title",
        userInfoBlockTitle: "Телефон",
        userInfoBlockValue: "+7 (707) 777 77 77",
      },
    ],
    redirectLinks: [
      {
        userInfoBlockTitleClass: "user-info-block__title_with-link",
        userInfoBlockTitle: "Изменить данные",
      },
      {
        userInfoBlockTitleClass: "user-info-block__title_with-link",
        userInfoBlockTitle: "Изменить пароль",
      },
      {
        userInfoBlockTitleClass: "user-info-block__title",
        userInfoBlockTitle: "Выход",
      },
    ],
  });
