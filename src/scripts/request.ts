import jsonp from 'fetch-jsonp';

const noop = () => {};

export const enum RequestStatus {
  Fetching,
  Success,
  Error,
}

export type RequestEvent<T = any> =
  | {
      status: RequestStatus.Fetching;
    }
  | {
      status: RequestStatus.Success;
      data: T;
    }
  | {
      status: RequestStatus.Error;
      error: Error;
    };

export type RequestCallback<T> = (event: RequestEvent<T>) => void;

export const request = <T = any>(
  url: string,
  callback: RequestCallback<T> = noop
) => {
  callback({ status: RequestStatus.Fetching });

  return jsonp(url)
    .then(res => res.json())
    .then(({ data }) => {
      callback({ status: RequestStatus.Success, data });
      return data;
    })
    .catch(error => {
      callback({ status: RequestStatus.Error, error });
      return Promise.reject(error);
    });
};
