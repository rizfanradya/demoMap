export function decodePolyline(encodedPolyline) {
  const points = [];
  let index = 0;
  let lat = 0;
  let lng = 0;
  let shift = 0;
  let result;
  let b;
  do {
    result = 0;
    shift = 0;
    do {
      b = encodedPolyline.charCodeAt(index) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
      index++;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    result = 0;
    shift = 0;
    do {
      b = encodedPolyline.charCodeAt(index) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
      index++;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push([lng / 1e5, lat / 1e5]);
  } while (index < encodedPolyline.length);

  return points;
}