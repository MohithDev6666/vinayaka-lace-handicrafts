import { Outlet } from 'react-router-dom';
import { CustomerHeader } from '../components/header/CustomerHeader.tsx';
import { CustomerFooter } from '../components/home/CustomerFooter.tsx';
import styles from './CustomerLayout.module.css';

export function CustomerLayout() {
  return (
    <div className={styles.page}>
      <CustomerHeader />
      <main id="main" className={styles.main}>
        <Outlet />
      </main>
      <CustomerFooter />
    </div>
  );
}
