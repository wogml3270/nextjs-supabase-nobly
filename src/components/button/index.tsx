import React, { MouseEventHandler } from 'react';

import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <div className={styles.button}>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export const SignoutButton: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = (
  props,
) => {
  return (
    <div className={styles.button}>
      <form action='/auth/signout' method='post' {...props}>
        <button type='submit'>로그아웃</button>
      </form>
    </div>
  );
};
