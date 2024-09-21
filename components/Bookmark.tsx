'use client'

import { useState } from 'react';
import { bookmarkCity } from '@/app/actions';

import styles from './Bookmark.module.css';

interface BookmarkProps {
  // The city of the current temperature displayed.
  currentCity?: string;
}
export const Bookmark = ({ currentCity }: BookmarkProps) => {
  // State
  const [saved, setSaved] = useState<boolean | null>(null);

  // Handlers
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!currentCity) return;

    // Reset state
    setSaved(false);

    (async() => {
      // Try to bookmark
      const success = await bookmarkCity(currentCity);
      // On success, trigger status alert with puff effect
      setSaved(success);
    })();
  }

  return currentCity ? (
    <button
      className={styles.bookmark}
      onClick={handleClick}
      aria-label="bookmark this city"
      aria-live="polite"
      aria-relevant="all"
    >

      {/* Icon */}
      <svg className={styles.icon} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7424 13.9373C11.5834 14.0254 11.3891 14.0203 11.235 13.924L7.5 11.5896L3.765 13.924C3.61087 14.0203 3.41659 14.0254 3.25762 13.9373C3.09864 13.8492 3 13.6818 3 13.5V2.5ZM4 3V12.5979L6.97 10.7416C7.29427 10.539 7.70573 10.539 8.03 10.7416L11 12.5979V3H4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      
      {/* Status */}
      {saved && (
        <p
          className={[
            styles.status,
            saved ? styles.puff : '',
          ].join(' ')}
        >
          Saved!
        </p>
      )}

    </button>
  ) : (
    null
  );
  ;
};
