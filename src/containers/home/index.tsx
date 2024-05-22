'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';

import styles from './index.module.scss';
import { Button, SignoutButton } from '@/components/button';

const Home = () => {
  const supabase = createClient();
  const [userInfo, setUserInfo] = useState<User>();

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

  return (
    <div className={styles.home}>
      <h1>Home Page</h1>
      {userInfo && userInfo ? (
        <>
          <h2>로그인 되었습니다</h2>
          <p>{userInfo?.user_metadata.email} 님</p>
          <p>마지막 로그인 시간: {userInfo?.last_sign_in_at}</p>
          <SignoutButton>로그아웃</SignoutButton>
          <Link href='/account'>
            <Button>프로필</Button>
          </Link>
        </>
      ) : (
        <Link href='/login'>
          <Button>로그인</Button>
        </Link>
      )}
    </div>
  );
};

export default Home;
