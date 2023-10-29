import ExtraPage from "./ExtraPage.hbs";

export const renderNotFoundPage = () =>
  ExtraPage({
    errorCode: "404",
    infoText: "Не туда попали",
    linkText: "Назад к чатам",
  });
