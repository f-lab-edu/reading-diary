import { useEffect, useState } from 'react';

import styles from './NewPage.module.scss';

// import { getBooks } from 'api/book';
import { mockApi } from 'utils/api';

import SearchCommon from 'components/common/search/SearchCommon';
import ListBooks from 'components/common/list/ListBooks';

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

  const onClickSearch = () => {
    console.log(searchKeyword);
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
        <ListBooks bookList={bookList} />
      </section>
    </>
  );
};

export default ReadingNewPage;
