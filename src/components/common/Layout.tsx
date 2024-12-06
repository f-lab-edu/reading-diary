import styles from './Layout.module.scss';

import Header from 'components/common/Header';

import { FCWithChildren } from 'utils/types';

const Layout: FCWithChildren = ({ children }) => {
  return (
    <div className={styles['reading']}>
      <Header />
      <main className={styles['reading-cont']}>{children}</main>
    </div>
  );
};

export default Layout;
