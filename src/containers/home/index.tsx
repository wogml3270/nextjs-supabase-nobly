import Link from "next/link";

import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <Link href="/login">Login</Link>
      <Link href="/admin">Admin</Link>
    </div>
  );
};

export default Home;
