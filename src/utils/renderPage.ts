import { Block } from './Block';

export function renderPage<T extends object> (targetElement: HTMLElement, page: Block<T>): void {
  targetElement.innerHTML = '';

  targetElement.replaceChildren(page.getContent()!);

  page.dispatchComponentDidMount();
}
