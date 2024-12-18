import styles from './SelectBook.module.scss';

import { FC, MouseEvent } from 'react';
import SearchCommon from 'components/common/search/SearchCommon';
import ListBooks, { BookListTypes } from 'components/common/list/ListBooks';

interface SelectBookProps {
  bookList: BookListTypes[];
  BookClickHandler(e: MouseEvent<HTMLButtonElement>): void;
}

const onClickSearch = () => {
  console.log('onClickSearch');
};

const SelectBook: FC<SelectBookProps> = ({ bookList, BookClickHandler }) => {
  return (
    <>
      <section className={styles['section-search']}>
        <h3>도서 검색</h3>
        <SearchCommon
          searchHandler={onClickSearch}
          placeholder="검색할 책이름을 입력해주세요."
        />
      </section>

      <section className={styles['section-result']}>
        <h3>책을 선택해주세요.</h3>
        <ListBooks bookList={bookList} bookDetailHandler={BookClickHandler} />
      </section>
    </>
  );
};

export default SelectBook;
