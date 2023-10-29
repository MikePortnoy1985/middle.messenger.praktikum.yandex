import ExtraPage from "./ExtraPage.hbs";

export const renderErrorPage = () =>
  ExtraPage({
    errorCode: "500",
    infoText: "Мы уже фиксим",
    linkText: "Назад к чатам",
  });
