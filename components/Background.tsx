import styles from './Background.module.css';

/** BACKGROUND
 * Displays a subtle, animated gradient.
 */
export const Background = () => {
  return (
    <>
      <div className={styles.floatingCircle} />
      <div className={styles.blurPanel} />
    </>
  );
};
