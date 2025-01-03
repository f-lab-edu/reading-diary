import { useEffect, useState, MouseEvent } from 'react';
import useBookInfoStore from 'store/useBookInfo';

// import { getBooks } from 'api/book'; 추후 api 연동하기 위해 남겨 놓음
import { mockApi } from 'utils/api';

import SelectBook from 'components/new/selectBook/SelectBook';
import WriteReading from 'components/new/WriteReading/WriteReading';

import { BookListTypes } from 'components/common/list/ListBooks';

type StepType = 'SELECT-BOOK' | 'WRITE-READING';

const ReadingNewPage = () => {
  const [bookList, setBookList] = useState<BookListTypes[]>([]);
  const [step, setStep] = useState<StepType>('SELECT-BOOK');

  const bookInfo = useBookInfoStore((state) => state.bookInfo);
  const updateBookInfo = useBookInfoStore((state) => state.updateBookInfo);

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
