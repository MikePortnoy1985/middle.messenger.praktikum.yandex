import { Block } from './Block';
import { expect } from 'chai';

describe('Block test suite', () => {
  class TestPage extends Block<{}> {
    constructor({}){
      super({}, 'div')
    }

    render() {
      return '<div>Test page</div>';
    }
  }

  it('should create Test page', () => {
    const content = new TestPage({}).getContent()
    expect(content?.innerHTML).to.be.equals('<div>Test page</div>')
  });
});
