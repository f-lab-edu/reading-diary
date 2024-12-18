import styles from './SearchCommon.module.scss';
import IconCommon from 'components/icons/IconCommon';
import BtnCommon from '../Buttons/BtnCommon';
import InputTypeCommon from '../textField/InputTypeCommon';

interface SearchCommonProps {
  searchHandler(): void;
  placeholder: string;
}

const SearchCommon = ({ searchHandler, placeholder }: SearchCommonProps) => {
  return (
    <div className={styles['search']}>
      <InputTypeCommon placeholder={placeholder} />
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
