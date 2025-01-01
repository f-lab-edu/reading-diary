import { useCallback, useEffect, useState } from 'react';
import { openDB, IDBPDatabase } from 'idb';
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

export const useIndexedDB = () => {
  const [db, setDb] = useState<IDBPDatabase<MYReadings> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const database = await initDB();
        if (isMounted) {
          setDb(database);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error as Error);
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const getCount = useCallback(async () => {
    if (!db) throw new Error('DB is not initialized');

    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return await store.count();
  }, [db]);

  const addMyReadings = useCallback(
    async (data: MyReadingsValue) => {
      if (!db) throw new Error('DB is not initialized');

      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      await store.add(data);
      await tx.done;
    },
    [db],
  );

  const putMyReadings = useCallback(
    async (data: MyReadingsValue) => {
      if (!db) throw new Error('DB is not initialized');
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      await store.put(data);
      await tx.done;
    },
    [db],
  );

  const getMyReadingList = useCallback(async () => {
    if (!db) throw new Error('DB is not initialized');

    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return await store.getAll();
  }, [db]);

  const getMyReading = useCallback(
    async (id: number) => {
      if (!db) throw new Error('DB is not initialized');

      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);

      return store.get(id);
    },
    [db],
  );

  const deleteMyReadings = useCallback(
    async (id: number) => {
      if (!db) throw new Error('DB is not initialized');

      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      await store.delete(id);
      await tx.done;
    },
    [db],
  );

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
