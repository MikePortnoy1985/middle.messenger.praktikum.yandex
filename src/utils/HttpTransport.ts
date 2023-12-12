export enum EMethods {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Delete = 'Delete',
};

type TData = Record<string, unknown>

type TOptions = {
  data?: TData | any,
  method?: EMethods,
  headers?: Record<string, string>,
  timeout?: number,
} & Record<string, any>

type HTTPMethod = (url: string, options?: TOptions) => Promise<unknown>

function queryStringify<T extends Record<string, unknown>> (data: T): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  base = 'https://ya-praktikum.tech/';
  constructor (base: string) {
    this.base = this.base + base;
  }

  get: HTTPMethod = (url = '', options = {}) => {
    return this.request(
      this.base + url,
      { ...options, method: EMethods.Get },
      options.timeout
    );
  };

  post: HTTPMethod = (url = '', options = {}) => {
    return this.request(
      this.base + url,
      { ...options, method: EMethods.Post },
      options.timeout
    );
  };

  put:HTTPMethod = (url = '', options = {}) => {
    return this.request(
      this.base + url,
      { ...options, method: EMethods.Put },
      options.timeout
    );
  };

  delete:HTTPMethod = (url = '', options = {}) => {
    return this.request(
      this.base + url,
      { ...options, method: EMethods.Delete },
      options.timeout
    );
  };

  request = (url: string = '', options: TOptions = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    const rootUrl = this.base + url;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === EMethods.Get;

      xhr.open(method, isGet && !!data ? `${rootUrl}${queryStringify(data)}` : url);

      if (data instanceof FormData) {
        xhr.setRequestHeader('Accept', 'application/json');
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (isGet || !data) {
        xhr.send();
      } else if (data && (data instanceof Document || data instanceof Blob || data instanceof FormData || data instanceof URLSearchParams)) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
};
