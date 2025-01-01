import { useCallback, useEffect, useState } from 'react';
import { openDB, IDBPDatabase, IDBPTransaction, IDBPObjectStore } from 'idb';
import { BookListTypes } from '../components/common/list/ListBooks';

const DB_NAME = 'reading-diary';
const DB_VERSION = 1;
const STORE_NAME = 'my-readings';

export type MyReadingsValue = {
  id: number;
  bookInfo: BookListTypes;
  tags: string[];
  myReviews: string;
};

interface MYReadings {
  'my-readings': {
    value: MyReadingsValue;
    key: number;
    indexes: {
      'book-info': number;
    };
  };
}

async function initDB() {
  return await openDB<MYReadings>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export const useIDb = () => {
  const [db, setDb] = useState<IDBPDatabase<MYReadings> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const database = await initDB();

        setDb(database);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
      }
    })();
  }, []);

  const idbAction = useCallback(
    async (option?: 'readonly' | 'readwrite') => {
      if (!db) throw new Error('DB is not initialized');

      const tx = db.transaction(STORE_NAME, option);
      const store = tx.objectStore(STORE_NAME);

      return { tx, store };
    },
    [db],
  );

  const getCount = async () => {
    const { store } = await idbAction();

    return await store.count();
  };

  const addMyReadings = async (data: MyReadingsValue) => {
    const { tx, store } = await idbAction('readwrite');

    if (!store?.add) {
      throw new Error('store not found');
    }

    await store.add(data);
    await tx.done;
  };

  const putMyReadings = async (data: MyReadingsValue) => {
    const { tx, store } = await idbAction('readwrite');

    if (!store?.put) {
      throw new Error('store not found');
    }

    await store.put(data);
    await tx.done;
  };

  const getMyReadingList = async () => {
    const { store } = await idbAction('readonly');

    return await store.getAll();
  };

  const getMyReading = async (id: number) => {
    const { store } = await idbAction('readonly');

    return store.get(id);
  };

  const deleteMyReadings = async (id: number) => {
    const { tx, store } = await idbAction('readwrite');

    if (!store?.delete) {
      throw new Error('store not found');
    }

    await store.delete(id);
    await tx.done;
  };

  return {
    db,
    isLoading,
    error,
    getCount,
    addMyReadings,
    putMyReadings,
    getMyReading,
    getMyReadingList,
    deleteMyReadings,
  };
};
