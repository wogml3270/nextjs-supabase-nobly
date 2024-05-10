import Link from 'next/link';

import styles from './notFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h2>404</h2>
      <p>페이지를 찾을 수 없습니다</p>
      <p>Could not find requested resource</p>
      <button>
        <Link href='/'>홈으로</Link>
      </button>
    </div>
  );
};

export default NotFound;
