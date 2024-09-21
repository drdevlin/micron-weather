'use server'

import { cookies } from 'next/headers';
import { supabase } from '@/app/db';

const appid = process.env.WEATHER_SERVICE_API_KEY;
const limit = '1';
const units = 'metric';

const apiKeyParam = '&appid=' + appid;
const limitParam = '&limit=' + limit;
const unitsParam = '&units=' + units;

type Weather = {
  city: string;
  temperature: string;
}
type ReportNull = [null, null]
type ReportError = [string, null];
type ReportReceived = [null, Weather];
export type ReportState = ReportNull | ReportError | ReportReceived;

/* Retreives the current temperature for a given city */
export const getReport = async (prevState: ReportState, formData: FormData): Promise<ReportState> => {
  try {
    // First, we need the latitude and longitude.
    // Get city name
    const query = formData.get('city');
    if (!query) return [null, null];
    if (typeof query !== 'string') return [null, null];
  
    // Assemble search params
    const geoSearchParams = `?q=${query}` + limitParam + apiKeyParam;
  
    // Fetch the coordinates from the geo service
    const geoResponse = await fetch(process.env.GEO_SERVICE_ENDPOINT + geoSearchParams);
    if (!geoResponse.ok) return ['Location not found.', null];
  
    // Extract latitude and longitude
    const [geo] = await geoResponse.json();
    if (!geo) return ['Location not found.', null];
    const { lat, lon } = geo;
    
    // Now, we can get the weather report.
    // Assemble search params
    const weatherSearchParams = `?lat=${lat}&lon=${lon}` + unitsParam + apiKeyParam;
  
    // Fetch the weather report
    const weatherResponse = await fetch(process.env.WEATHER_SERVICE_ENDPOINT + weatherSearchParams);
    if (!weatherResponse.ok) return ['Weather conditions not found.', null];
    
    // Extract the current temperature
    const weather = await weatherResponse.json();
    const temperature = String(Math.round(weather.main.temp));
  
    return [
      null,
      {
        city: query,
        temperature,
      },
    ];
  } catch(error) {
    console.error(error);
    return ['Something went wrong.', null];
  }
}

/* Stores city in the database with an associated fingerprint. */
export const bookmarkCity = async (city: string) => {
  // Try to get the fingerprint.
  const fingerprint = cookies().get('fingerprint');

  // If there isn't one, we want to insert a new row.
  const insert = async () => supabase.from('users').insert({ preferred_city: city }).select('fingerprint');
  // If there is one, we want to update it.
  const update = async () => supabase.from('users').update({ preferred_city: city }).eq('fingerprint', fingerprint?.value).select('fingerprint');

  // Decide.
  const { data, error } = fingerprint ? await update() : await insert();

  // On Error.
  if (error) console.error(error);
  if (!data) return false;

  // On Success.
  const [user] = data;
  cookies().set('fingerprint', user.fingerprint);
  return true;
};

/* Retrieves the user's preferred city from the database. */
export const getPreferredCity = async () => {
  const fingerprint = cookies().get('fingerprint');
  if (!fingerprint) return;

  const { data, error } = await supabase.from('users').select('preferred_city').eq('fingerprint', fingerprint?.value);

  if (error) console.error(error);
  if (!data) return;

  const [user] = data;
  return user.preferred_city;
};
