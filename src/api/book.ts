import { api } from '../utils/api';

const bookSearch = {
  baseUrl: 'https://dapi.kakao.com/v3/search/book',
  header: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
  },
} as const;

export const getBooks = async (searchTitle: string, page = 1) => {
  const { baseUrl, header } = bookSearch;

  return await api({
    url: `${baseUrl}?query=${searchTitle}&size=20&page=${page}`,
    method: 'GET',
    header: { ...header },
  })
    .then((data) => data)
    .catch((error) => error);
};
