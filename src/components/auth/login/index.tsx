'use client';

import { useState } from 'react';

interface DataType {
  email: string;
  password: string;
}

interface Props {
  setTab: (tab: string) => void;
  styles: { [key: string]: string };
}

const LoginComponent = ({ setTab, styles }: Props) => {
  const [formData, setFormData] = useState<DataType>({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.signBox}>
      <div className={styles.tab}>
        <span onClick={() => setTab('login')}>로그인</span>
        <span onClick={() => setTab('signup')}>회원가입</span>
      </div>
      <form action='/api/auth/login' method='post'>
        <h1>로그인</h1>
        <div>
          <label htmlFor='email'>이메일</label>
          <input
            type='email'
            name='email'
            value={formData?.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>비밀번호</label>
          <input
            type='password'
            name='password'
            value={formData?.password}
            onChange={handleChange}
          />
        </div>
        <button>Sign In</button>
      </form>
    </div>
  );
};
export default LoginComponent;
