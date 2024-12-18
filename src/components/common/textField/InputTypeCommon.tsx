import styles from './InputTypeCommon.module.scss';

import { FC, ChangeEvent, KeyboardEvent, useRef, useState, Ref } from 'react';
import classNames from 'classnames';
import BtnCommon from '../Buttons/BtnCommon';
import IconCommon from '../../icons/IconCommon';

interface InputTypeCommonProps {
  placeholder: string;
  className?: string;
  elementRef?: Ref<HTMLInputElement>;
  keyUpHandler?(e: KeyboardEvent<HTMLInputElement>): void;
}

const InputTypeCommon: FC<InputTypeCommonProps> = ({
  placeholder,
  className,
  keyUpHandler,
}) => {
  const [value, setValue] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return (
    <div className={classNames(styles['tf-comm'], className)}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles['tf-comm-inp']}
        onChange={onChange}
        onKeyUp={keyUpHandler}
        value={value}
      />
      {value && (
        <BtnCommon
          type="reset"
          bgType="neutral"
          clickHandler={onReset}
          className={styles['tf-comm-btn-reset']}>
          <IconCommon name="cancel" className={styles['tf-comm-icon-reset']} />
          <span className="sr-only">삭제</span>
        </BtnCommon>
      )}
    </div>
  );
};

export default InputTypeCommon;
