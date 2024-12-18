import styles from './InputTypeCommon.module.scss';

import { FC, ChangeEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import BtnCommon from '../Buttons/BtnCommon';
import IconCommon from '../../icons/IconCommon';

interface TfCommProps {
  placeholder: string;
  className?: string;
  keyword: string;
  resetHandler(): void;
  keywordHandler(e: ChangeEvent<HTMLElement>): void;
  keyUpHandler?(e: KeyboardEvent<HTMLInputElement>): void;
}

const InputTypeCommon: FC<TfCommProps> = ({
  placeholder,
  className,
  keyword,
  resetHandler,
  keywordHandler,
  keyUpHandler,
}) => {
  return (
    <div className={classNames(styles['tf-comm'], className)}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles['tf-comm-inp']}
        onChange={keywordHandler}
        onKeyUp={keyUpHandler}
        value={keyword}
      />
      {keyword && (
        <BtnCommon
          type="reset"
          bgType="neutral"
          clickHandler={resetHandler}
          className={styles['tf-comm-btn-reset']}>
          <IconCommon name="cancel" className={styles['tf-comm-icon-reset']} />
          <span className="sr-only">삭제</span>
        </BtnCommon>
      )}
    </div>
  );
};

export default InputTypeCommon;
