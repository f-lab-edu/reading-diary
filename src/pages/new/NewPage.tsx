import { useEffect, useState, useRef, useCallback } from 'react';

import styles from './NewPage.module.scss';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';

// import { getBooks } from 'api/book';
import { mockApi } from 'utils/api';

import { MouseEvent } from 'react';

import SearchCommon from 'components/common/search/SearchCommon';
import ListBooks, { BookListTypes } from 'components/common/list/ListBooks';

const ReadingNewPage = () => {
  const [bookList, setBookList] = useState<BookListTypes[]>([]);
  const [step, setStep] = useState<number>(2);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [bookItem, setBookItem] = useState<BookListTypes | null>({
    authors: ['할미언니'],
    isbn: '1193262232 9791193262238',
    publisher: '필름(Feelm)',
    thumbnail:
      'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6717156%3Ftimestamp%3D20241123152903',
    title: '돈 공부를 시작하고 인생의 불안이 사라졌다',
  });

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

    console.log(bookItem);

    setBookItem(bookItem[0]);
    setStep(2);
  };

  // const onChangeEdit = useCallback(() => {
  //   if (!editRef.current) return;
  //   console.log(editRef.current.getInstance().getMarkdown());
  //   console.log(editRef.current.getInstance().getHTML());
  // }, []);

  // const onChangeEdit = () => {
  //   if (!editRef.current) return;
  //   console.log(editRef.current.getInstance().getMarkdown());
  //   console.log(editRef.current.getInstance().getHTML());
  // };

  useEffect(() => {
    const mockBookSearch = mockApi('/data/mock/bookList.json');

    // const test = getBooks('최고의 공부');
    mockBookSearch
      .then((data) => {
        const { documents, meta } = data;
        setBookList(documents);
      })
      .catch((error) => console.log(error));
  }, []);

  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
  ];

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
              <Editor
                ref={editRef}
                initialValue="### 읽고 기억하고 싶은걸 써보자!"
                previewStyle="tab"
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={true}
                toolbarItems={toolbarItems}
                hideModeSwitch={true}
              />
            </div>
            {/*<button onClick={onChangeEdit}>test</button>*/}
          </section>
        </>
      )}
    </>
  );
};

export default ReadingNewPage;
