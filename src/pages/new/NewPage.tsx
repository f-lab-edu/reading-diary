import { useEffect, useState, MouseEvent } from 'react';
import useBookInfoStore from 'store/useBookInfo';

// import { getBooks } from 'api/book'; 추후 api 연동하기 위해 남겨 놓음
import { mockApi } from 'utils/api';
import { openDB, DBSchema } from 'idb';

import SelectBook from 'components/new/selectBook/SelectBook';
import WriteReading from 'components/new/WriteReading/WriteReading';

import { BookListTypes } from 'components/common/list/ListBooks';

type StepType = 'SELECT-BOOK' | 'WRITE-READING';

interface MyDB extends DBSchema {
  'favourite-number': {
    key: string;
    value: number;
  };
  products: {
    value: {
      name: string;
      price: number;
      productCode: string;
    };
    key: string;
    indexes: { 'by-price': number };
  };
}

const dbTest = async () => {
  const db = await openDB<MyDB>('my-db', 1, {
    upgrade(db) {
      db.createObjectStore('favourite-number');

      const productStore = db.createObjectStore('products', {
        keyPath: 'productCode',
      });

      productStore.createIndex('by-price', 'price');
    },
  });

  // This works
  await db.put('favourite-number', 7, 'Jen');
  // This fails at compile time, as the 'favourite-number' store expects a number.
  // await db.put('favourite-number', 'Twelve', 'Jake');

  const test = await db.get('my-db', 'favourite-number');

  console.log(test);
};

const ReadingNewPage = () => {
  const [bookList, setBookList] = useState<BookListTypes[]>([]);
  const [step, setStep] = useState<StepType>('SELECT-BOOK');

  const bookInfo = useBookInfoStore((state) => state.bookInfo);
  const updateBookInfo = useBookInfoStore((state) => state.updateBookInfo);

  dbTest();

  const onClickBookDetail = (e: MouseEvent<HTMLButtonElement>) => {
    const { dataset } = e.currentTarget;

    if (!dataset) {
      return;
    }

    const bookItem = (): BookListTypes => {
      const item = bookList.filter(
        (item) => e.currentTarget.dataset.isbn === item.isbn,
      );

      return { ...item[0] };
    };

    updateBookInfo(bookItem());
    setStep('WRITE-READING');
  };

  useEffect(() => {
    const mockBookSearch = mockApi('/data/mock/bookList.json');

    mockBookSearch
      .then((data) => {
        const { documents, meta } = data;
        setBookList(documents);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  return (
    <>
      <h2>Reading Diary</h2>
      {step === 'SELECT-BOOK' && (
        <SelectBook bookList={bookList} BookClickHandler={onClickBookDetail} />
      )}
      {!!bookInfo && step === 'WRITE-READING' && <WriteReading />}
    </>
  );
};

export default ReadingNewPage;
