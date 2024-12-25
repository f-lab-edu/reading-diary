import { create } from 'zustand';

type BookTagListState = {
  tagList: string[];
};

type BookTagAction = {
  updateBookTag: (tag: string) => void;
  removeBookTag: (tag: string) => void;
  resetBookTag: () => void;
};

const useBookTagStore = create<BookTagListState & BookTagAction>((set) => ({
  tagList: [],
  updateBookTag: (tag: string) =>
    set((state) => ({ tagList: [...state.tagList, tag] })),
  removeBookTag: (tag: string) =>
    set((state) => ({
      tagList: state.tagList.filter((tagItem) => tagItem !== tag),
    })),
  resetBookTag: () => set(() => ({ tagList: [] })),
}));

export default useBookTagStore;
