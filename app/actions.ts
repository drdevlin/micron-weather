'use server'

const appid = process.env.WEATHER_SERVICE_API_KEY;
const limit = '1';
const units = 'metric';

const apiKeyParam = '&appid=' + appid;
const limitParam = '&limit=' + limit;
const unitsParam = '&units=' + units;

type ReportNull = [null, null]
type ReportError = [string, null];
type ReportReceived = [null, string];
export type ReportState = ReportNull | ReportError | ReportReceived;

/* Retreives the current temperature for a given city */
export const getReport = async (prevState: ReportState, formData: FormData): Promise<ReportState> => {
  try {
    // First, we need the latitude and longitude.
    // Get city name
    const query = formData.get('city');
    if (!query) return [null, null];
  
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
  
    return [null, temperature];
  } catch(error) {
    console.error(error);
    return ['Something went wrong.', null];
  }
}
