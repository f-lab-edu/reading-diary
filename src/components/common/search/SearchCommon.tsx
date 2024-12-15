import styles from './SearchCommon.module.scss';
import { ChangeEvent } from 'react';
import IconCommon from 'components/icons/IconCommon';
import BtnCommon from '../Buttons/BtnCommon';

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
          <BtnCommon
            type="reset"
            bgType="neutral"
            clickHandler={resetHandler}
            className={styles['search-btn-reset']}>
            <IconCommon name="cancel" className={styles['search-icon-reset']} />
            <span className="sr-only">삭제</span>
          </BtnCommon>
        )}
      </div>
      <BtnCommon
        type="button"
        clickHandler={searchHandler}
        bgType="primary"
        className={styles['search-btn-search']}>
        <IconCommon name="search" className={styles['search-icon-search']} />
        <span className="sr-only">검색</span>
      </BtnCommon>
    </div>
  );
};

export default SearchCommon;
