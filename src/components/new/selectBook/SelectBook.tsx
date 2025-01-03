import styles from './SelectBook.module.scss';

import { FC, MouseEvent, useState, useRef, ChangeEvent } from 'react';
import SearchCommon from 'components/common/search/SearchCommon';
import { getBooks, PagingInfo } from 'api/book';
import ListBooks from 'components/common/list/ListBooks';
import useBookInfoStore from 'store/useBookInfo';
import BtnCommon from 'components/common/Buttons/BtnCommon';

interface SelectBookProps {
  BookClickHandler(e: MouseEvent<HTMLButtonElement>): void;
}

const SelectBook: FC<SelectBookProps> = ({ BookClickHandler }) => {
  const [pagingInfo, setPagingInfo] = useState<PagingInfo | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isResetShow, setResetShow] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  const updateBookList = useBookInfoStore((state) => state.updateBookList);
  const bookList = useBookInfoStore((state) => state.bookList);
  const resetBookList = useBookInfoStore((state) => state.resetBookList);

  const onClickSearch = () => {
    if (!searchInput?.current) return;

    const { value } = searchInput.current;

    getBooks(value, currentPage).then((data) => {
      updateBookList([...data.documents]);
      setPagingInfo(data.meta);
    });
  };

  const onClickMore = () => {
    if (!searchInput?.current) return;

    const { value } = searchInput.current;

    getBooks(value, currentPage + 1).then((data) => {
      updateBookList([...data.documents]);
      setPagingInfo(data.meta);
      setCurrentPage(currentPage + 1);
    });
  };

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!searchInput?.current) return;

    const { value } = searchInput.current;

    if (value) {
      setResetShow(true);
    } else {
      setResetShow(false);
    }
  };

  const searchReset = () => {
    if (!searchInput?.current) return;

    searchInput.current.value = '';
    setResetShow(false);

    if (!!bookList.length) {
      resetBookList();
    }
  };

  return (
    <>
      <section className={styles['section-search']}>
        <h3>도서 검색</h3>
        <SearchCommon
          searchHandler={onClickSearch}
          inputRef={searchInput}
          changeHandler={onChangeSearch}
          isResetShow={isResetShow}
          resetHandler={searchReset}
          placeholder="검색할 책이름을 입력해주세요."
        />
      </section>

      {!!bookList.length ? (
        <section className={styles['section-result']}>
          <h3>책을 선택해주세요.</h3>
          <ListBooks bookList={bookList} bookDetailHandler={BookClickHandler} />
          {pagingInfo && !pagingInfo.is_end && (
            <BtnCommon
              type="button"
              bgType="primary"
              size="large"
              clickHandler={onClickMore}>
              리스트 더 보기
            </BtnCommon>
          )}
        </section>
      ) : (
        <p>결과가 없어요</p>
      )}
    </>
  );
};

export default SelectBook;
