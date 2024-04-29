import {calculateDistance} from './calculateDistance';

export function calculateMarkerPositions(
  coordinates: [number, number][],
): [number, number][] {
  const markerPositions: [number, number][] = [];
  let distanceTraveled = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const currentCoord = coordinates[i];
    const nextCoord = coordinates[i + 1];
    // // Calculate distance between current and next coordiantes
    const distance = calculateDistance(currentCoord, nextCoord);

    distanceTraveled += distance;

    if (distanceTraveled >= 200) {
      markerPositions.push(currentCoord);
      distanceTraveled = 0;
    }
  }

  markerPositions.push(coordinates[coordinates.length - 1]);
  return markerPositions;
}
