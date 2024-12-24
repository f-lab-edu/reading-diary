import { DBSchema, openDB } from 'idb';
import { BookListTypes } from 'components/common/list/ListBooks';

export type MyReadingsValue = {
  id: number;
  bookInfo: BookListTypes;
  tags: string[];
  myReviews: string;
};

interface MYReadings extends DBSchema {
  'my-readings': {
    value: MyReadingsValue;
    key: number;
    indexes: {
      'book-info': number;
    };
  };
}

export const MyReadingsDb = async () => {
  return await openDB<MYReadings>('reading-diary', 1, {
    upgrade(db) {
      console.log('work?');
      const myReadingStore = db.createObjectStore('my-readings', {
        keyPath: 'id',
        autoIncrement: true,
      });

      myReadingStore.createIndex('book-info', 'id', { unique: true });
    },
  });
};

export const putMyReadings = async (data: MyReadingsValue) => {
  const transaction = await MyReadingsDb();

  transaction.transaction('my-readings', 'readwrite');
  await transaction.put('my-readings', data);
};

export const getMyReadingsCount = async () => {
  const tx = await MyReadingsDb();
  const tranx = tx.transaction('my-readings');

  return tranx.objectStore('my-readings').count();
};

export const getMyReadings = async () => {
  const store = await MyReadingsDb();
  const test = store.transaction('my-readings').objectStore('my-readings');

  console.log(test);

  return await test.get(1);
};
