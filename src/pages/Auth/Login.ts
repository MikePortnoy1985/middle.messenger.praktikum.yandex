import Auth from "./Auth.hbs";

export const renderLogin = () =>
  Auth({
    inputs: [
      {
        inputName: "login",
        inputType: "text",
        inputId: "login",
        inputLabel: "Логин",
      },
      {
        inputName: "password",
        inputType: "password",
        inputId: "password",
        inputLabel: "Пароль",
      },
    ],
    pageTitle: "Вход",
    buttonText: "Войти",
    linkText: "Создать аккаунт",
    href: "/login",
  });
