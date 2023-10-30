import mapBox from "@mapbox/mapbox-sdk/services/geocoding";

const geoCoder = mapBox({ accessToken: process.env.MAPBOX_TOKEN! });

export const getCoordinates = async (query: string) => {
  // https://docs.mapbox.com/api/search/geocoding/#forward-geocoding
  const resp = await geoCoder
    .forwardGeocode({
      limit: 1,
      countries: ["US"],
      types: ["address"],
      query,
      // Uncomment before deployment
      // mode: "mapbox.places-permanent",
    })
    .send();
  // https://docs.mapbox.com/api/search/geocoding/#geocoding-response-object
  if (resp.body.features[0].relevance < 0.6) {
    console.log("Bad address");
    return null;
  }
  const [lng, lat] = resp.body.features[0].center;
  return { lng, lat };
};
