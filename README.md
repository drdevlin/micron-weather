# MICRON WEATHER

A technical assignment in Next.js, consuming the Open Weather API.

## Must Haves

### It works!

It allows a user to enter a city and display its current temperature in celcius.

### Clean, modern, accessible code.

```js
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
```

```js
/** REPORT
 * Displays the current temperature.
 */
export interface ReportProps {
  // State containing the temperature
  // or error message.
  state: ReportState;
}
export const Report = ({ state }: ReportProps) => {
  const [error, weather] = state;

  return (
    <section className={styles.report} aria-live="polite">
      {error && (
        <p className={styles.error}>{error}</p>
      )}
      {weather?.temperature && (
        <p className={styles.temperature}>{weather.temperature + '°'}</p>
      )}
    </section>
  );
};
```

### Good commit practice.

Have a look.

### Appealing appearance.

Modern look, nice typography, and a cool animated background.

## Stretch Goals

### Automated deployment.

[Repo is connected to and deployed on Vercel.](https://micron-weather.vercel.app/)

### Small backend

The app uses [Server Actions](/app/actions.ts) for a backend. (Not REST)

I used a server action for consuming the Open Weather API. This way, it's consumed on the server (not the client) and doesn't expose any API info (e.g., API keys).

But also, to demonstrate persistence, I used server actions to connect to a database and persist a user's preferred city. The model is a bit silly, but it avoids unneeded auth.
