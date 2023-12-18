import { expect } from 'chai';
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';

import { HTTPTransport } from './HttpTransport';

describe('HTTP Transport test suite', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: Array<SinonFakeXMLHttpRequest> = [];
  const service = new HTTPTransport('/test')
  const stub = (requestType: keyof HTTPTransport) => sinon.stub(service, requestType)

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (request) => {
      requests.push(request);
    };
    requests = [];
  });

  afterEach(() => {
    requests = [];
    sinon.restore();
  });

  it('should send GET request', () => {
    const request = stub('get');
    service.get('');
    expect(request.calledOnce).to.be.true;
  });

  it('should send POST request', () => {
    const request = stub('post');
    service.post('');
    expect(request.calledOnce).to.be.true;
  });

  it('should send PUT request', () => {
    const request = stub('put');
    service.put('');
    expect(request.calledOnce).to.be.true;
  });

  it('should send DELETE request', () => {
    const request = stub('delete');
    service.delete('');
    expect(request.calledOnce).to.be.true;
  });
});
