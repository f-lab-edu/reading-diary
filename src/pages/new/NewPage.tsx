import styles from './NewPage.module.scss';

import { useEffect, useState, useRef, useCallback, MouseEvent } from 'react';
import { Editor } from '@toast-ui/react-editor';

// import { getBooks } from 'api/book'; 추후 api 연동하기 위해 남겨 놓음
import { mockApi } from 'utils/api';

import SelectBook from 'components/new/selectBook/SelectBook';
import WriteReading from 'components/new/WriteReading/WriteReading';

import { BookListTypes } from 'components/common/list/ListBooks';

type StepType = 'SELECT-BOOK' | 'WRITE-READING';

const ReadingNewPage = () => {
  const [bookList, setBookList] = useState<BookListTypes[]>([]);
  const [bookItem, setBookItem] = useState<BookListTypes | null>();
  const [step, setStep] = useState<StepType>('SELECT-BOOK');

  const editRef = useRef<Editor>(null);

  const sendReading = useCallback(() => {
    if (!editRef.current) return;
    console.log(editRef.current.getInstance().getMarkdown());
  }, []);

  const onClickBookDetail = (e: MouseEvent<HTMLButtonElement>) => {
    const { dataset } = e.currentTarget;

    if (!dataset) {
      return;
    }

    const bookItem = bookList.filter(
      (item) => e.currentTarget.dataset.isbn === item.isbn,
    );

    setBookItem(bookItem[0]);
    setStep('WRITE-READING');
  };

  const stepMessage = (step: StepType): string => {
    switch (step) {
      case 'WRITE-READING':
        return '소감을 써봐요.';

      default:
        return '읽은책을 골라봐요.';
    }
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
      <h2>Reading Diary: {stepMessage(step)}</h2>
      {step === 'SELECT-BOOK' && (
        <SelectBook bookList={bookList} BookClickHandler={onClickBookDetail} />
      )}
      {!!bookItem && step === 'WRITE-READING' && (
        <WriteReading
          bookItem={bookItem}
          editorRef={editRef}
          sendHandler={sendReading}
        />
      )}
    </>
  );
};

export default ReadingNewPage;
