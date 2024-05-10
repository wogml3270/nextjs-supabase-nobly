'use client';

import { githubAuth, login, signup } from './actions';
import styles from './index.module.scss';

const LoginPage = () => {
  return (
    <div className={styles.login_box}>
      <form className={styles.form}>
        <div className={styles.form_input}>
          <label htmlFor='email'>이메일</label>
          <input id='email' name='email' type='email' required />
        </div>
        <div className={styles.form_input}>
          <label htmlFor='password'>비밀번호</label>
          <input id='password' name='password' type='password' required />
        </div>
        <div className={styles.form_button}>
          <button formAction={login}>로그인</button>
          <button formAction={signup}>회원가입</button>
        </div>
      </form>
      <button onClick={githubAuth}>github login</button>
    </div>
  );
};

export default LoginPage;
