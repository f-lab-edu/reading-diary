import styles from './NewPage.module.scss';

import { useEffect, useState, useRef, useCallback, MouseEvent } from 'react';
import { Editor } from '@toast-ui/react-editor';

// import { getBooks } from 'api/book'; 추후 api 연동하기 위해 남겨 놓음
import { mockApi } from 'utils/api';

import SearchCommon from 'components/common/search/SearchCommon';
import ListBooks, { BookListTypes } from 'components/common/list/ListBooks';
import ToastEditor from 'components/common/ToastEditor';
import BtnCommon from '../../components/common/Buttons/BtnCommon';

const ReadingNewPage = () => {
  const [bookList, setBookList] = useState<BookListTypes[]>([]);
  const [step, setStep] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [bookItem, setBookItem] = useState<BookListTypes | null>();

  const editRef = useRef<Editor>(null);

  const onChangeKeyword = (e: any) => {
    setSearchKeyword(e.target.value);
  };

  const onClickReset = () => {
    setSearchKeyword('');
  };

  const onClickSearch = () => {
    console.log(searchKeyword);
  };

  const onClickBookDetail = (e: MouseEvent<HTMLButtonElement>) => {
    const { dataset } = e.currentTarget;

    if (!dataset) {
      return;
    }

    const bookItem = bookList.filter(
      (item) => e.currentTarget.dataset.isbn === item.isbn,
    );

    setBookItem(bookItem[0]);
    setStep(2);
  };

  const onChangeEdit = useCallback(() => {
    if (!editRef.current) return;
    console.log(editRef.current.getInstance().getMarkdown());
  }, []);

  useEffect(() => {
    const mockBookSearch = mockApi('/data/mock/bookList.json');

    mockBookSearch
      .then((data) => {
        const { documents, meta } = data;
        setBookList(documents);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2>Reading Diary 추가하기 - step{step}</h2>
      {step === 1 && (
        <>
          <section className={styles['section-search']}>
            <h3>도서 검색</h3>
            <SearchCommon
              keywordHandler={onChangeKeyword}
              resetHandler={onClickReset}
              searchHandler={onClickSearch}
              searchKeyword={searchKeyword}
              placeholder="검색할 책이름을 입력해주세요."
            />
          </section>

          <section className={styles['section-result']}>
            <h3>책을 선택해주세요.</h3>
            <ListBooks
              bookList={bookList}
              bookDetailHandler={onClickBookDetail}
            />
          </section>
        </>
      )}
      {!!bookItem && step === 2 && (
        <>
          <section className={styles['section-book']}>
            <div className={styles['section-book-inner']}>
              <div className={styles['box-thumbnail']}>
                <img
                  src={bookItem.thumbnail}
                  alt={`${bookItem.title} 책 표지`}
                />
              </div>

              <dl className={styles['book-info']}>
                <div className={styles['book-info-item']}>
                  <dt>작가:</dt>
                  <dd>{bookItem.authors.join(', ')}</dd>
                </div>
                <div className={styles['book-info-item']}>
                  <dt>제목:</dt>
                  <dd>{bookItem.title}</dd>
                </div>
                <div className={styles['book-info-item']}>
                  <dt>출판사:</dt>
                  <dd>{bookItem.publisher}</dd>
                </div>
              </dl>
            </div>
          </section>
          <section className={styles['section-edit']}>
            <h3>기록 남기기</h3>
            <div className={styles['edit-box']}>
              <ToastEditor
                editorRef={editRef}
                initValue="### 읽고 기억하고 싶은걸 써보자!"
              />
            </div>
            <div className={styles['edit-group-btn']}>
              <BtnCommon
                type="button"
                clickHandler={onChangeEdit}
                bgType="primary"
                size="medium">
                저장하기
              </BtnCommon>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ReadingNewPage;
