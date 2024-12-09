import styles from './SearchCommon.module.scss';
import IconCommon from '../../icons/IconCommon';
import { ChangeEvent } from 'react';

interface SearchCommonProps {
  keywordHandler(e: ChangeEvent<HTMLElement>): void;
  resetHandler(): void;
  searchHandler(): void;
  searchKeyword: string;
  placeholder: string;
}

const SearchCommon = ({
  keywordHandler,
  resetHandler,
  searchHandler,
  searchKeyword,
  placeholder,
}: SearchCommonProps) => {
  return (
    <div className={styles['search']}>
      <div className={styles['search-box']}>
        <input
          type="text"
          placeholder={placeholder}
          className={styles['search-tf']}
          onChange={keywordHandler}
          value={searchKeyword}
        />
        {searchKeyword && (
          <button
            type="reset"
            className={styles['search-btn-reset']}
            onClick={resetHandler}>
            <IconCommon name="cancel" className={styles['search-icon-reset']} />
            <span className="sr-only">삭제</span>
          </button>
        )}
      </div>
      <button
        type="button"
        className={styles['search-btn-search']}
        onClick={searchHandler}>
        <IconCommon name="search" className={styles['search-icon-search']} />
        <span className="sr-only">검색</span>
      </button>
    </div>
  );
};

export default SearchCommon;
