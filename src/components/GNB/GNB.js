import { Link } from 'react-router-dom';
import styles from './GNB.module.css';

export default function GNB({ activeIndex }) {
  return (
    <>
      <div className={styles.container}>
        <div>
          <Link
            to="/"
            className={`${styles.item} ${activeIndex === 0 && styles.active}`}
          >
            가상자산 시세 목록
          </Link>
        </div>
        <div>
          <Link
            to="/bookmark"
            className={`${styles.item} ${activeIndex === 1 && styles.active}`}
          >
            북마크 목록
          </Link>
        </div>
      </div>
    </>
  );
}
