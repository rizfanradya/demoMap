export function makeRouterFeature(coordinates: [number, number][]): any {
  let routerFeature = {
    type: 'FeatureCollection',
    snapToRoad: true,
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates,
        },
      },
    ],
  };

  return routerFeature;
}
