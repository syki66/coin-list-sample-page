import { useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ setToast, message }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <div className={styles.toast}>{message}</div>;
}
