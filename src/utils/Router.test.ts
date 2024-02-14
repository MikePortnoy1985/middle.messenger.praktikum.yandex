import { expect } from 'chai';
import Router, { TView } from './Router.ts';
import { beforeEach } from 'mocha';
import { Block } from './Block.ts';
import { TState } from './Store.ts';
import { ROUTES } from '../index.ts';

describe('Router test suite', () => {
  class TestPage extends Block<{}> {
    constructor({}) {
      super({}, 'div')
    }

    render () {
      return '<div>Test page</div>';
    }
  }

  beforeEach(() => {
    Router
      .use(ROUTES.LOGIN, TestPage as unknown as TView, {} as TState)
      .use(ROUTES.REGISTRATION, TestPage as unknown as TView, {} as TState)
      .start();
  });

  it('should render login page on login route', () => {
    Router.go(ROUTES.LOGIN);
    expect(window.location.href).to.be.equal('http://localhost:3000/');
  });

  it('should render registration page on registration route', () => {
    Router.go(ROUTES.REGISTRATION);
    expect(window.location.href).to.be.equal('http://localhost:3000/sign-up');
  });

  it('history should change on route change', () => {
    Router.go(ROUTES.REGISTRATION);
    expect(history.length).to.eq(4);
  });
});
