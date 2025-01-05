import styles from './SearchCommon.module.scss';

import { Ref } from 'react';
import IconCommon from 'components/icons/IconCommon';
import BtnCommon from '../Buttons/BtnCommon';
import InputTypeCommon from '../textField/InputTypeCommon';

import { ChangeEvent } from 'react';

interface SearchCommonProps {
  searchHandler(): void;
  isResetShow?: boolean;
  inputRef: Ref<HTMLInputElement>;
  changeHandler: (value: ChangeEvent<HTMLInputElement>) => void;
  resetHandler: () => void;
  placeholder: string;
}

const SearchCommon = ({
  searchHandler,
  inputRef,
  isResetShow,
  changeHandler,
  resetHandler,
  placeholder,
}: SearchCommonProps) => {
  return (
    <div className={styles['search']}>
      <InputTypeCommon
        placeholder={placeholder}
        inputRef={inputRef}
        isResetShow={isResetShow}
        changeHandler={changeHandler}
        resetHandler={resetHandler}
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
