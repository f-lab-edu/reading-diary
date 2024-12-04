import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <div className={styles['header-inner']}>
      <h1>READINGS 입니다.</h1>
    </div>
  </header>
);

export default Header;
