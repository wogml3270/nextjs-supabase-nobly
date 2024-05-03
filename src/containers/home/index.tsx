'use client';

import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

const Home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/auth');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <div className={styles.home}>
      <span onClick={() => router.push('/auth')}>로그인 및 회원가입</span>
      <span onClick={handleLogout}>로그아웃</span>
      <span onClick={() => router.push('/admin')}>관리자 페이지</span>
    </div>
  );
};

export default Home;
