'use client';

import { useState } from 'react';

import LoginComponent from '@/components/auth/login';
import SignUpComponent from '@/components/auth/signup';
import styles from './index.module.scss';

const AuthPage = () => {
  const [tab, setTab] = useState<string>('login');

  return (
    <div>
      {tab === 'login' ? (
        <LoginComponent setTab={setTab} styles={styles} />
      ) : (
        <SignUpComponent setTab={setTab} styles={styles} />
      )}
    </div>
  );
};

export default AuthPage;
