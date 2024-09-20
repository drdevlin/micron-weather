'use client'

import { useFormState } from 'react-dom';
import { getReport } from '@/app/actions';
import { Background } from '@/components/Background';
import { Search } from '@/components/Search';
import { Report } from '@/components/Report';

import type { ReportState } from '@/app/actions';

import styles from "./page.module.css";

const initialState: ReportState = [null, null];

export default function Home() {
  const [state, action] = useFormState(getReport, initialState);

  return (
    <main className={styles.main}>
      <Background />
      <Search action={action} />
      <Report state={state} />
    </main>
  );
}
