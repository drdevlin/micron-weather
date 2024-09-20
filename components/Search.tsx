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
}
export const Search = ({ action }: SearchProps) => {
  return (
    <section className={styles.search}>

      <form action={action}>
        <label>CURRENT TEMPERATURE AT:</label>

        <div className={styles.searchBar}>
          <input
            type="search"
            name="city"
            placeholder="Enter City"
            title="City [State Code, Country Code]"
            aria-label="city"
          />
          <Submit />
        </div>

      </form>

    </section>
  );
};
