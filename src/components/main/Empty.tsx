import styles from './Empty.module.scss';

import { ROOT } from 'routes/route';
import { NavLink } from 'react-router-dom';

const Empty = () => {
  return (
    <div className={styles['empty']}>
      <p className={styles['empty-text']}>
        등록한 내용이 없습니다.
        <br />
        읽은 책이 있다면 등록해 보아요!
      </p>
      <NavLink to={ROOT.NEW} className={styles['empty-link']}>
        등록하러 가기
      </NavLink>
    </div>
  );
};

export default Empty;
