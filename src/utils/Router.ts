import { Auth } from '../pages/Auth';
import { ChatPage } from '../pages/ChatPage';
import { ExtraPage } from '../pages/ExtraPage';
import { UserPage } from '../pages/UserPage';
import { Maybe } from '../types';
import Route from './Route';
import { TState } from './Store';

export type TTypeOfAppPages = typeof Auth | typeof ExtraPage | typeof ChatPage | typeof UserPage

export type TAppPages = Auth | ChatPage | ExtraPage | UserPage

export type TView = new (props: TState) => TAppPages

class Router {
  // eslint-disable-next-line
  private static instance: Maybe<Router> = null;
  private history: History = window.history;
  private routes: Array<Route> = [];
  private currentRoute: Maybe<Route> = null;

  constructor (private rootQuery: string) {
    if (Router.instance) {
      return Router.instance;
    }

    Router.instance = this;
  }

  use (pathname: string, block: TView, props: TState): Router {
    if (this.routes.some(route => route.match(pathname))) {
      return this;
    }

    const route = new Route({ pathname, view: block, rootQuery: this.rootQuery, props });

    this.routes.push(route);
    return this;
  }

  start (): void {
    window.onpopstate = (event: PopStateEvent) => {
      if (event.currentTarget instanceof Window) {
        this.onRoute(event.currentTarget.location.pathname);
      }
    };

    this.onRoute(window.location.pathname);
  }

  private onRoute (pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go (pathname: string): void {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  getRoute (pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }
}

export default new Router('root');
