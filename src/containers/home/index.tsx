'use client';

import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

const Home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/signout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <div className={styles.home}>
      <span onClick={() => router.push('/login')}>로그인</span>
      <span onClick={handleLogout}>로그아웃</span>
    </div>
  );
};

export default Home;
