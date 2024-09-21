'use client'

import { useFormState } from 'react-dom';
import { getReport } from '@/app/actions';
import { usePreferredCity } from '@/app/hooks';
import { Search } from '@/components/Search';
import { Bookmark } from '@/components/Bookmark';
import { Report } from '@/components/Report';

import type { ReportState } from '@/app/actions';

import styles from "./page.module.css";

const initialState: ReportState = [null, null];

export default function Home() {
  const [state, action] = useFormState(getReport, initialState);
  const [, weather] = state;

  usePreferredCity(action);

  return (
    <main className={styles.main}>
      <Search action={action} preferredCity={weather?.city} />
      <Bookmark currentCity={weather?.city} />
      <Report state={state} />
    </main>
  );
}
