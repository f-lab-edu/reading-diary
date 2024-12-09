interface ApiPramsProp {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'UPDATE' | 'DELETE';
  params?: any;
  header?: {
    [key: string]: string;
  };
}

export const mockApi = async function (mockUrl: string) {
  const fetchData = await fetch(mockUrl);

  return fetchData.json();
};

export const api = async function ({
  url,
  method,
  header = {},
  params,
}: ApiPramsProp) {
  try {
    const response = await fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application / json',
        ...header,
      },
      body:
        (method || '').match('/POST|PUT/') && params
          ? JSON.stringify(params)
          : null,
      credentials: 'omit',
    });

    const { status } = response;

    if (status >= 400 && status < 500) {
      throw await response.json();
    } else if (status >= 500) {
      throw new Error('Server Error');
    } else {
      return response.json();
    }
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error(`${error}`).message;
    } else {
      throw error;
    }
  }
};
