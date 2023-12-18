import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html lang="ru"><body><main id="root"></main></body></html>', {
  url: 'http://localhost:3000'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.FormData = dom.window.FormData;
global.history = dom.window.history;
