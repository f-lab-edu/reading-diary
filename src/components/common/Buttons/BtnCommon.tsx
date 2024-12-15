import styles from './BtnCommon.module.scss';

import { FC, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';

interface BtnCommonProps {
  children: ReactNode;
  type: 'button' | 'submit' | 'reset';
  clickHandler(e: MouseEvent<HTMLButtonElement>): void;
  bgType: 'primary' | 'neutral' | 'dimmed';
  className?: string;
  size?: 'small' | 'medium' | 'large';
  isDisabled?: boolean;
  [attrs: string]: any;
}

const BtnCommon: FC<BtnCommonProps> = ({
  children,
  type,
  clickHandler,
  bgType,
  className,
  size,
  isDisabled,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={classNames(
        styles['btn-comm'],
        styles[`btn-comm-${bgType}`],
        className,
        {
          [`${size}`]: size,
          disabled: isDisabled,
        },
      )}
      onClick={clickHandler}
      disabled={isDisabled}
      {...rest}>
      {children}
    </button>
  );
};

export default BtnCommon;
