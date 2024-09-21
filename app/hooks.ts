import { useEffect } from 'react';
import { getPreferredCity } from '@/app/actions';

/* Fetches the user's preferred city from the database by calling the `getPreferredCity` action */
/* Then fetches the weather by calling `action` */
export const usePreferredCity = (action: (payload: FormData) => void) => {
  useEffect(() => {
    (async () => {
      // Retrieve from db.
      const preferredCity = await getPreferredCity();
      if (!preferredCity) return;
      
      // Submit form.
      const formData = new FormData;
      formData.set('city', preferredCity);
      action(formData);
    })();
  }, [action]);
};
