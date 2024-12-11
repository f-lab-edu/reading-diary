import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import IconCommon from 'components/icons/IconCommon';
import { ROOT } from 'routes/route';

import Logo from 'assets/icons/logo.svg';

const Header = () => (
  <header className={styles.header}>
    <div className={styles['header-inner']}>
      <h1>
        <NavLink to={ROOT.MAIN} className={styles['header-link']}>
          <img src={Logo} alt="Reading Diary" />
        </NavLink>
      </h1>

      <NavLink to={ROOT.NEW} className={styles['header-link-new']}>
        <span className={styles['header-link-new-box']}>
          <IconCommon name="add" className={styles['header-link-new-icon']} />
        </span>
        Diary 쓰기
      </NavLink>
    </div>
  </header>
);

export default Header;
