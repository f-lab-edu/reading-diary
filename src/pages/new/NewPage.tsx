import { useEffect, useState } from 'react';

import styles from './NewPage.module.scss';

// import { getBooks } from 'api/book';
import { mockApi } from 'utils/api';

import IconCommon from 'components/icons/IconCommon';

const ReadingNewPage = () => {
  const [bookList, setBookList] = useState([]);
  const [step, setStep] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const onChangeKeyword = (e: any) => {
    setSearchKeyword(e.target.value);
  };

  const onClickReset = () => {
    setSearchKeyword('');
  };

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

  return (
    <>
      <h2>Reading Diary 추가하기 - step{step}</h2>
      <section className={styles['section-search']}>
        <h3>도서 검색</h3>
        <div className={styles['search']}>
          <div className={styles['search-box']}>
            <input
              type="text"
              placeholder="도서검색해 주세요."
              className={styles['search-tf']}
              onChange={onChangeKeyword}
              value={searchKeyword}
            />
            {searchKeyword && (
              <button
                type="reset"
                className={styles['search-btn-reset']}
                onClick={onClickReset}>
                <IconCommon
                  name="cancel"
                  className={styles['search-icon-reset']}
                />
                <span className="sr-only">삭제</span>
              </button>
            )}
          </div>
          <button type="button" className={styles['search-btn-search']}>
            <IconCommon
              name="search"
              className={styles['search-icon-search']}
            />
            <span className="sr-only">검색</span>
          </button>
        </div>
      </section>

      <section className={styles['section-result']}>
        <h3>책을 선택해주세요.</h3>
        <ul className={styles['book-list']}>
          {bookList.map((book: any) => {
            const { isbn, authors, publisher, thumbnail, title } = book;
            return (
              <li key={isbn}>
                <div className={styles['book-list-inner']}>
                  <img
                    src={thumbnail}
                    alt={title}
                    className={styles['book-list-thumbnail']}
                  />
                  <dl className={styles['book-list-item']}>
                    <div className={styles['book-list-item-box']}>
                      <dt>책제목</dt>
                      <dd>{title}</dd>
                    </div>
                    <div className={styles['book-list-item-box']}>
                      <dt>저자</dt>
                      <dd>{authors.join(', ')}</dd>
                    </div>
                    <div className={styles['book-list-item-box']}>
                      <dt>출판사</dt>
                      <dd>{publisher}</dd>
                    </div>
                  </dl>
                  <div className={styles['book-list-dimmed']}>
                    <button type="button" className={styles['book-list-btn']}>
                      <IconCommon
                        name="book"
                        className={styles['book-list-btn-icon']}
                      />
                      선택하기
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default ReadingNewPage;
