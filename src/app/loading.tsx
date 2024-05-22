import React from 'react';
import Image from 'next/image';

import spinner from '@public/spinner.svg';

import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Image src={spinner} alt='loading spinner' />
    </div>
  );
};

export default Loading;
