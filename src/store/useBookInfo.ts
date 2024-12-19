import { create } from 'zustand';

import { BookListTypes } from 'components/common/list/ListBooks';

type BookInfoState = {
  bookInfo: BookListTypes;
};

type BookInfoAction = {
  updateBookInfo: (bookInfo: BookListTypes) => void;
};

const useBookInfoStore = create<BookInfoState & BookInfoAction>((set) => ({
  bookInfo: {
    isbn: '',
    authors: [],
    publisher: '',
    thumbnail: '',
    title: '',
  },
  updateBookInfo: (bookItem) =>
    set((state) => ({ bookInfo: { ...state.bookInfo, ...bookItem } })),
}));

export default useBookInfoStore;
