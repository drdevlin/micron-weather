'use client'

import { useFormState } from 'react-dom';
import { getReport } from '@/app/actions';
import { Search } from '@/components/Search';
import { Report } from '@/components/Report';

import type { ReportState } from '@/app/actions';

import styles from "./page.module.css";

const initialState: ReportState = [null, null];

export default function Home() {
  const [state, action] = useFormState(getReport, initialState);

  return (
    <main className={styles.main}>
      <Search action={action} />
      <Report state={state} />
    </main>
  );
}
