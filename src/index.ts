import Components from "./components";
import { renderLogin } from "./pages/Auth/Login";
import { renderRegistration } from "./pages/Auth/Registration";
import { renderStartChatPage } from "./pages/ChatPage/StartChatPage";
import { renderErrorPage } from "./pages/ExtraPage/ErrorPage";
import { renderNotFoundPage } from "./pages/ExtraPage/NotFoundPage";
import { renderNavigation } from "./pages/Navigation/Navigation";
import { renderUserEditPage } from "./pages/UserPage/UserEditDataPage";
import { renderUserEditPasswordPage } from "./pages/UserPage/UserEditPasswordPage";
import { renderUserProfilePage } from "./pages/UserPage/UserProfilePage";

Components.registerPartials();

const appRouter = (href: string, main: HTMLElement) => {
  switch (true) {
    case href.endsWith("/login"):
      main.innerHTML = renderLogin();
      break;
    case href.endsWith("/registration"):
      main.innerHTML = renderRegistration();
      break;
    case href.endsWith("/500"):
      main.innerHTML = renderErrorPage();
      break;
    case href.endsWith("/404"):
      main.innerHTML = renderNotFoundPage();
      break;
    case href.endsWith("/chat"):
      main.innerHTML = renderStartChatPage();
      break;
    case href.endsWith("/user-profile"):
      main.innerHTML = renderUserProfilePage();
      break;
    case href.endsWith("/user-edit"):
      main.innerHTML = renderUserEditPage();
      break;
    case href.endsWith("/user-edit-password"):
      main.innerHTML = renderUserEditPasswordPage();
      break;
    default:
      main.innerHTML = "";
      break;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root")!;

  const nav = renderNavigation();

  root.insertAdjacentElement("afterbegin", nav);

  const main = document.createElement("main");

  root.appendChild(main);

  main.innerHTML = renderStartChatPage();

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      event.preventDefault();

      appRouter(event.target.href, main);
    }
  });

  appRouter("/login", main);
});
