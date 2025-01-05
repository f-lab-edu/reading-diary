import styles from './InputTypeCommon.module.scss';

import { FC, ChangeEvent, KeyboardEvent, Ref } from 'react';
import classNames from 'classnames';
import BtnCommon from 'components/common/Buttons/BtnCommon';
import IconCommon from 'components/icons/IconCommon';

interface InputTypeCommonProps {
  value?: string;
  inputRef?: Ref<HTMLInputElement>;
  isResetShow?: boolean;
  placeholder: string;
  className?: string;
  changeHandler?: (value: ChangeEvent<HTMLInputElement>) => void;
  resetHandler: () => void;
  keyUpHandler?(e: KeyboardEvent<HTMLInputElement>): void;
}

const InputTypeCommon: FC<InputTypeCommonProps> = ({
  value,
  inputRef,
  isResetShow,
  placeholder,
  className,
  changeHandler,
  resetHandler,
  keyUpHandler,
}) => {
  return (
    <div className={classNames(styles['tf-comm'], className)}>
      <input
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        className={styles['tf-comm-inp']}
        onChange={changeHandler}
        onKeyUp={keyUpHandler}
        value={value}
      />
      {(value || isResetShow) && (
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
