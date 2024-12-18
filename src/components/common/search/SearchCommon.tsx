import styles from './SearchCommon.module.scss';
import { ChangeEvent } from 'react';
import IconCommon from 'components/icons/IconCommon';
import BtnCommon from '../Buttons/BtnCommon';
import InputTypeCommon from '../textField/InputTypeCommon';

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
      <InputTypeCommon
        placeholder={placeholder}
        keywordHandler={keywordHandler}
        resetHandler={resetHandler}
        keyword={searchKeyword}
      />
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
