import styles from './DimmedButton.module.scss';
import { FC, MouseEvent } from 'react';

import BtnCommon from 'components/common/Buttons/BtnCommon';
import IconCommon from 'components/icons/IconCommon';

interface DimmedButtonProps {
  buttonHandler(e: MouseEvent<HTMLButtonElement>): void;
  id: string | number;
}

const DimmedButton: FC<DimmedButtonProps> = ({ buttonHandler, id }) => {
  return (
    <div className={styles['dimmed']}>
      <BtnCommon
        type="button"
        className={styles['dimmed-btn']}
        clickHandler={buttonHandler}
        bgType="dimmed"
        data-id={id}>
        <IconCommon name="book" className={styles['dimmed-btn-icon']} />
        선택하기
      </BtnCommon>
    </div>
  );
};

export default DimmedButton;
