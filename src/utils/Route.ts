import { Maybe } from '../types';
import { TAppPages, TView } from './Router';
import { TState } from './Store';

type TRouteParams = {
  pathname: string,
  view: TView,
  rootQuery: string,
  props: TState,
}

function render (query: string, page: TAppPages): void {
  const targetElement = document.getElementById(query)!;

  targetElement.innerHTML = '';

  if (page) {
    targetElement.insertAdjacentElement('afterbegin', page.getContent()!);

    page.dispatchComponentDidMount();
  }
}

export default class Route {
  private block: Maybe<TAppPages> = null;
  private pathname = '';
  private View: Maybe<TView> = null;
  private rootQuery = '';
  private props: Maybe<TState> = null;

  constructor ({ pathname, view, rootQuery, props }: TRouteParams) {
    this.pathname = pathname;
    this.View = view;
    this.rootQuery = rootQuery;
    this.props = props;
  }

  navigate (currentPathname: string): void {
    if (this.match(currentPathname)) {
      this.pathname = currentPathname;
      this.render();
    }
  }

  leave (): void {
    if (this.block) {
      this.block.hide();
    }
  }

  match (currentPathname: string): boolean {
    return currentPathname === this.pathname;
  }

  render (): void {
    if (this.View && this.props) {
      this.block = new this.View(this.props);
      render(this.rootQuery, this.block);
    }

    this.block?.show();
  }
}
