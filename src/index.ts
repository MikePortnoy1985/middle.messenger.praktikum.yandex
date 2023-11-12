import { CHAT_PAGE_DATA, ERROR_PAGE_DATA, LOGIN_PAGE_DATA, NOT_FOUND_PAGE_DATA, REGISTRATION_PAGE_DATA, USER_EDIT_DATA_PAGE_DATA, USER_EDIT_PASSWORD_PAGE_DATA, USER_PROFILE_PAGE_DATA } from './data';
import { Auth } from './pages/Auth';
import { ChatPage } from './pages/ChatPage';
import { ExtraPage } from './pages/ExtraPage';
import { renderNavigation } from './pages/Navigation';
import { UserPage } from './pages/UserPage';
import { renderPage } from './utils/renderPage';

const appRouter = (href: string, main: HTMLElement) => {
  switch (true) {
    case href.endsWith('/login'):
      renderPage(main, new Auth(LOGIN_PAGE_DATA));
      break;
    case href.endsWith('/registration'):
      renderPage(main, new Auth(REGISTRATION_PAGE_DATA));
      break;
    case href.endsWith('/500'):
      renderPage(main, new ExtraPage(ERROR_PAGE_DATA));
      break;
    case href.endsWith('/404'):
      renderPage(main, new ExtraPage(NOT_FOUND_PAGE_DATA));
      break;
    case href.endsWith('/chat'):
      renderPage(main, new ChatPage(CHAT_PAGE_DATA));
      break;
    case href.endsWith('/user-profile'):
      renderPage(main, new UserPage(USER_PROFILE_PAGE_DATA));
      break;
    case href.endsWith('/user-edit'):
      renderPage(main, new UserPage(USER_EDIT_DATA_PAGE_DATA));
      break;
    case href.endsWith('/user-edit-password'):
      renderPage(main, new UserPage(USER_EDIT_PASSWORD_PAGE_DATA));
      break;
    default:
      renderPage(main, new ExtraPage(NOT_FOUND_PAGE_DATA));
      break;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')!;

  const nav = renderNavigation();

  root.insertAdjacentElement('afterbegin', nav);

  const main = document.createElement('main');

  root.appendChild(main);

  nav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      event.preventDefault();

      appRouter(event.target.href, main);
    }
  });

  appRouter('/login', main);
});
