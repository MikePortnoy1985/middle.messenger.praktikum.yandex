import UserController from './controllers/UserController';
import { CHAT_PAGE_DATA, ERROR_PAGE_DATA, LOGIN_PAGE_DATA, NOT_FOUND_PAGE_DATA, REGISTRATION_PAGE_DATA, USER_EDIT_DATA_PAGE_DATA, USER_EDIT_PASSWORD_PAGE_DATA, USER_PROFILE_PAGE_DATA } from './data';
import { Auth } from './pages/Auth';
import { ChatPage } from './pages/ChatPage';
import { ExtraPage } from './pages/ExtraPage';
import { UserPage } from './pages/UserPage';
import Router, { TView } from './utils/Router';
import Store from './utils/Store';
import { connect } from './utils/connect';

export const ROUTES = {
  LOGIN: '/',
  REGISTRATION: '/sign-up',
  PROFILE: '/settings',
  EDIT_PROFILE: '/edit-profile',
  EDIT_PASSWORD: '/edit-password',
  CHAT_PAGE: '/messenger',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500'
} as const;

window.addEventListener('load', async () => {
  Router.use(ROUTES.LOGIN, Auth as TView, LOGIN_PAGE_DATA)
    .use(ROUTES.REGISTRATION, Auth as TView, REGISTRATION_PAGE_DATA)
    .use(ROUTES.SERVER_ERROR, ExtraPage as TView, ERROR_PAGE_DATA)
    .use(ROUTES.NOT_FOUND, ExtraPage as TView, NOT_FOUND_PAGE_DATA)
    .use(ROUTES.CHAT_PAGE, connect(ChatPage), CHAT_PAGE_DATA)
    .use(ROUTES.PROFILE, UserPage as TView, USER_PROFILE_PAGE_DATA)
    .use(ROUTES.EDIT_PROFILE, UserPage as TView, USER_EDIT_DATA_PAGE_DATA)
    .use(ROUTES.EDIT_PASSWORD, UserPage as TView, USER_EDIT_PASSWORD_PAGE_DATA);

  Router.start();

  const currentPathname = window.location.pathname;

  const paths = Object.values(ROUTES);

  if (paths.every(path => path !== currentPathname)) {
    Router.go(ROUTES.NOT_FOUND);
  };

  try {
    const data = await UserController.getUser();

    Store.set('userId', data.response?.id || '');

    if (data.error) {
      Router.go(ROUTES.LOGIN);
      return;
    }

    if (currentPathname === ROUTES.LOGIN) {
      Router.go(ROUTES.CHAT_PAGE);
    }
  } catch (error) {
    console.error(error);

    Router.go(ROUTES.LOGIN);
  }
});
