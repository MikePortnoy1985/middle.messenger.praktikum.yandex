import Auth from "./Auth.hbs";

export const renderRegistration = () =>
  Auth({
    inputs: [
      {
        inputName: "email",
        inputType: "email",
        inputId: "email",
        inputLabel: "Почта",
      },
      {
        inputName: "login",
        inputType: "text",
        inputId: "login",
        inputLabel: "Логин",
      },
      {
        inputName: "first_name",
        inputType: "text",
        inputId: "first_name",
        inputLabel: "Имя",
      },
      {
        inputName: "second_name",
        inputType: "text",
        inputId: "second_name",
        inputLabel: "Фамилия",
      },
      {
        inputName: "phone",
        inputType: "phone",
        inputId: "phone",
        inputLabel: "Телефон",
      },
      {
        inputName: "password",
        inputType: "password",
        inputId: "password",
        inputLabel: "Пароль",
      },
      {
        inputName: "password",
        inputType: "password",
        inputId: "password",
        inputLabel: "Пароль (еще раз)",
      },
    ],
    pageTitle: "Регистрация",
    buttonText: "Зарегистрироваться",
    linkText: "Войти",
    href: "/registration",
  });
