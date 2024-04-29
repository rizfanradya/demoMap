const MAP_BOX_ACCESS_TOKEN =
  'pk.eyJ1IjoieW91bmlzYWJ1emF5ZWQiLCJhIjoiY2x2Ym0yNTE3MGFxZzJpcGJxNGh5Mmp1cSJ9.sPOVykSSG5YH2MSFSkDH8g';

export const constructUrl = (
  longitude: number,
  latitude: number,
  endpoint = 'mapbox.places',
) => {
  return `https://api.mapbox.com/geocoding/v5/${endpoint}/${longitude},${latitude}.json?access_token=${MAP_BOX_ACCESS_TOKEN}`;
};
