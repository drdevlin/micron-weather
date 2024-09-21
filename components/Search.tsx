import { Submit } from './Submit';

import styles from './Search.module.css';

/** SEARCH
 * Contains the form for finding the current temperature.
 */
export interface SearchProps {
  // The React server action for the form.
  // It should fetch the current temperature
  // given a `city`.
  action: (payload: FormData) => void;
  // The user's preferred city.
  // Will only be used as the input's default value.
  preferredCity?: string;
}
export const Search = ({ action, preferredCity }: SearchProps) => {
  return (
    <section className={styles.search}>

      <form action={action}>
        <label>CURRENT TEMPERATURE AT:</label>

        <div className={styles.searchBar}>
          <input
            type="search"
            name="city"
            placeholder="Enter City"
            defaultValue={preferredCity}
            title="City [State Code, Country Code]"
            aria-label="city"
          />
          <Submit />
        </div>

      </form>

    </section>
  );
};
