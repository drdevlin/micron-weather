import type { ReportState } from '@/app/actions';

import styles from './Report.module.css';

/** REPORT
 * Displays the current temperature.
 */
export interface ReportProps {
  // State containing the temperature
  // or error message.
  state: ReportState;
}
export const Report = ({ state }: ReportProps) => {
  const [error, temperature] = state;

  return (
    <section className={styles.report} aria-live="polite">
      {error && <p className={styles.error}>{error}</p>}
      {temperature && <p className={styles.temperature}>{temperature + '°'}</p>}
    </section>
  );
};
