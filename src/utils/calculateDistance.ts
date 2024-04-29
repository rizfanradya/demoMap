function radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}
export function calculateDistance(
  coord1: [number, number],
  coord2: [number, number],
): number {
  const lat1 = coord1[1];
  const lon1 = coord1[0];
  const lat2 = coord2[1];
  const lon2 = coord2[0];
  let R = 6371e3;
  const dLat = radians(lat2 - lat1);
  const dLon = radians(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
