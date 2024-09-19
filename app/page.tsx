import { Search } from '@/components/Search';
import { Report } from '@/components/Report';

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Search />
      <Report />
    </main>
  );
}
