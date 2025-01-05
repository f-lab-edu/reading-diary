import { create } from 'zustand';

import { BookListTypes } from 'components/common/list/ListBooks';

type BookInfoState = {
  bookInfo: BookListTypes;
  bookList: BookListTypes[];
};

type BookInfoAction = {
  updateBookInfo: (bookInfo: BookListTypes) => void;
  updateBookList: (bookList: BookListTypes[]) => void;
  resetBookInfo: () => void;
  resetBookList: () => void;
};

const useBookInfoStore = create<BookInfoState & BookInfoAction>((set) => ({
  bookInfo: {
    isbn: '',
    authors: [],
    publisher: '',
    thumbnail: '',
    title: '',
  },
  bookList: [],
  updateBookInfo: (bookItem) =>
    set((state) => ({ bookInfo: { ...state.bookInfo, ...bookItem } })),
  resetBookInfo: () =>
    set(() => ({
      bookInfo: {
        isbn: '',
        authors: [],
        publisher: '',
        thumbnail: '',
        title: '',
      },
    })),
  updateBookList: (bookList) =>
    set((state) => ({ bookList: [...state.bookList, ...bookList] })),
  resetBookList: () => set(() => ({ bookList: [] })),
}));

export default useBookInfoStore;
