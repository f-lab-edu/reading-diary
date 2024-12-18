import { create } from 'zustand';

import { BookListTypes } from 'components/common/list/ListBooks';

type BookInfoState = {
  bookInfo: BookListTypes | {};
};

type BookInfoAction = {
  updateBookInfo: (bookInfo: BookInfoState) => void;
};

export const useBookInfoStore = create<BookInfoState & BookInfoAction>(
  (set) => ({
    bookInfo: {},
    updateBookInfo: (bookItem) => set(() => ({ bookInfo: bookItem })),
  }),
);

export default useBookInfoStore;
