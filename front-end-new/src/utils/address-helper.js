import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";

export const prepareAddresss = async (address) => {
  setDefaults({
    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "es", // Default region for responses.
  });
  try {
    const { results } = await fromAddress(address);
    const { lat, lng } = results[0].geometry.location;
    return {
      longitude: lng,
      latitude: lat,
      countryCode: 'NG',
      fullAddress: results[0].formatted_address,
      country: 'Nigeria'
    };
  } catch (message) {
    console.error("Errorr ---------->>>>.",message);
  }
}
