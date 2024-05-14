'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';
import { api } from '@/services';

import styles from './index.module.scss';

const Home = () => {
  const supabase = createClient();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<object | null>();

  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        return;
      }
      setUserInfo(user);
    };
    getUserInfo();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    try {
      const response = await api.post('/auth/signout');
      if (response.status === 200) {
        console.log('로그아웃 성공');
        setUserInfo(null);
        router.refresh();
      } else {
        console.log('로그아웃 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Home Page</h1>
      {userInfo && userInfo ? (
        <>
          <span onClick={handleSignOut}>SignOut</span>
          <Link href='/account'>Profile</Link>
        </>
      ) : (
        <Link href='/login'>Login</Link>
      )}
    </div>
  );
};

export default Home;
