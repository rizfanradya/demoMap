/* eslint-disable react-native/no-inline-styles */
import Geolocation from '@react-native-community/geolocation';
import Mapbox, {ImageSource, UserLocation} from '@rnmapbox/maps';
import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {SearchBar} from '@rneui/base';

const iconsStreet = [
  require('../../assets/imgs/arrow-road.png'),
  require('../../assets/imgs/car-crash.jpg'),
  require('../../assets/imgs/street-two-way.jpg'),
  require('../../assets/imgs/work-on-progress.jpg'),
];
const cameraStreet = [
  require('../../assets/imgs/cameras/camera1.jpeg'),
  require('../../assets/imgs/cameras/camera2.jpeg'),
  require('../../assets/imgs/cameras/camera3.jpeg'),
  require('../../assets/imgs/cameras/camera4.jpeg'),
  require('../../assets/imgs/cameras/camera5.jpeg'),
  require('../../assets/imgs/cameras/camera6.jpeg'),
  require('../../assets/imgs/cameras/camera7.jpeg'),
  require('../../assets/imgs/cameras/camera8.jpeg'),
  require('../../assets/imgs/cameras/camera9.jpeg'),
  require('../../assets/imgs/cameras/camera10.jpeg'),
];

function getRandomIndex(arrayLength) {
  // Generate a random number between 0 and (length - 1)
  const randomIndex = Math.floor(Math.random() * arrayLength);

  return randomIndex;
}

import MapboxPlacesAutocomplete from 'react-native-mapbox-places-autocomplete';

import {
  makeRouterFeature,
  getCurrentLocationName,
  calculateMarkerPositions,
  calculateDistance,
} from '../../utils';
import {Overlay} from '@rneui/base';
import {decodePolyline} from '../../utils/decodePolyline';
import {requestLocationPermission} from '../../utils/requestLocationPermission';

const MAP_BOX_ACCESS_TOKEN =
  'pk.eyJ1IjoieW91bmlzYWJ1emF5ZWQiLCJhIjoiY2x2Ym0yNTE3MGFxZzJpcGJxNGh5Mmp1cSJ9.sPOVykSSG5YH2MSFSkDH8g';

const defualtDataCoords = {
  namePlace: '',
  coords: [],
};

const Maps = () => {
  const [routeDirections, setRouteDirections] = useState(null);
  const [coords, setCoords] = useState<[number, number]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [markers, setMarkers] = useState<[number, number][]>([]);
  const [duration, setDuration] = useState(null);
  const [destinationCoordsStart, setDestinationCoordsStart] = useState<
    [number, number]
  >([]);
  const [destinationCoords, setDestinationCoords] = useState<[number, number]>(
    [],
  );

  const [searchCurrent, setSearchCurrent] = useState({
    namePlace: '',
    coords: [],
  });
  const [searchDestination, setSearchDestination] = useState({
    namePlace: '',
    coords: [],
  });

  const [visible, setVisible] = useState(false);

  const {width, height} = useWindowDimensions();
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const currentLocationSearch = async (_search: any) => {
    // console.log(_search);
    const {place_name, center} = _search;

    setSearchCurrent(_prevState => ({
      namePlace: place_name,
      coords: center,
    }));
    if (center?.length != 0 && searchDestination.coords.length > 0) {
      await createRouterLine(center, searchDestination.coords);
    }
  };
  const destinationLocationSearch = async (_search: any) => {
    const {place_name, center} = _search;

    setSearchDestination(_prevState => ({
      namePlace: place_name,
      coords: center,
    }));
    if (center?.length != 0) {
      await createRouterLine(coords, center);
    }
  };

  async function getPermissionLocation() {
    try {
      await Geolocation.getCurrentPosition(
        async (location: any) => {
          setCoords([location.coords.longitude, location.coords.latitude]);
          getCurrentLocation([
            location.coords.longitude,
            location.coords.latitude,
          ]);
        },
        err => console.log('getPermissionLocation', err),
      );
    } catch (error) {
      console.log('Error Geo Location', error);
    }
  }
  const getCurrentLocation = async (coords: [number, number]) => {
    const locationName = await getCurrentLocationName(...coords);
    setSearchCurrent(prevState => ({...prevState, namePlace: locationName}));
  };

  useEffect(() => {
    getPermissionLocation();
    Platform.OS === 'android' && requestLocationPermission();
  }, []);
  // console.log(coords);

  async function createRouterLine(
    coords: [number, number],
    destination: any,
  ): Promise<void> {
    const startCoords = `${coords[0]}, ${coords[1]}`;
    const endCoords = `${destination}`;
    const geometries = 'geojson';
    const options: {} = {
      language: 'en',
      overview: 'full',
      steps: true,
      alternatives: true,
      geometries: 'geojson',
      access_token: MAP_BOX_ACCESS_TOKEN,
      avoid_maneuver_radius: '100',
    };
    try {
      let response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords};${endCoords}?` +
          new URLSearchParams(options),
      );
      let json = await response.json();
      const decoded =
        geometries === 'polyline'
          ? decodePolyline(json.routes[0].geometry)
          : json.routes[0].geometry;

      let coordinates =
        geometries === 'polyline' ? decoded : decoded.coordinates;

      let endPoint =
        geometries === 'polyline'
          ? decoded.slice(-1)[0]
          : json.routes[0].geometry.coordinates.slice(-1)[0];
      setDestinationCoords(endPoint);

      let startPoint =
        geometries === 'polyline'
          ? decoded[0]
          : json.routes[0].geometry.coordinates[0];
      setDestinationCoordsStart(startPoint);

      // Calculate distance between start and end coordinates
      const distanceCaluclate = calculateDistance(
        searchDestination.coords,
        coords,
      );

      const markerPositions = calculateMarkerPositions(coordinates);
      setMarkers(markerPositions);
      setDistance(distanceCaluclate); // Update state with calculated distance

      if (coordinates?.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirections(routerFeature);
      }
    } catch (error) {
      console.log('Type Error: createRouterLine ', error);
    }
  }

  // Function to calculate distance between two coordinates

  return (
    <View style={styles.page}>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Image
          id="street-icon"
          source={cameraStreet[getRandomIndex(cameraStreet.length ?? 0)]}
          style={{width: width - 30, height: width}}
          resizeMode="cover"
        />
      </Overlay>
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          zoomEnabled={true}
          rotateEnabled={true}
          styleURL="mapbox://styles/mapbox/streets-v12"
          onDidFinishLoadingMap={async () => {
            // await createRouterLine(coords);
          }}>
          <Mapbox.Camera
            zoomLevel={16}
            centerCoordinate={
              searchDestination?.coords ? searchDestination?.coords : coords
            }
            pitch={25}
            animationMode="flyTo"
            animationDuration={4000}
            followUserLocation
            followZoomLevel={12}
          />
          {routeDirections && (
            <Mapbox.ShapeSource id="line1" shape={routeDirections}>
              <Mapbox.LineLayer
                id="routerLine01"
                style={{lineColor: '#e16e0a', lineWidth: 4}}
              />
            </Mapbox.ShapeSource>
          )}
          {destinationCoordsStart.length > 0 && (
            <Mapbox.MarkerView
              id="destinationPoint"
              coordinate={destinationCoordsStart}>
              <View style={styles.destinationIcon}>
                <MaterialCommunityIcons
                  name="record-circle"
                  size={24}
                  color={'black'}
                />
              </View>
            </Mapbox.MarkerView>
          )}
          {markers &&
            markers.map((coord, index) => (
              <Mapbox.MarkerView
                key={index}
                id="destinationPoint"
                coordinate={coord}>
                <TouchableOpacity
                  style={styles.destinationIcon}
                  onPress={toggleOverlay}>
                  <Image
                    id="street-icon"
                    source={
                      iconsStreet[getRandomIndex(iconsStreet.length ?? 0)]
                    }
                    style={{width: 20, height: 20, borderRadius: 10}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </Mapbox.MarkerView>
            ))}
          {destinationCoords.length > 0 && (
            <Mapbox.PointAnnotation
              id="destinationPoint"
              coordinate={destinationCoords}>
              <View style={styles.destinationIcon}>
                <Ionicons name="location-sharp" size={24} color={'#E1710A'} />
              </View>
            </Mapbox.PointAnnotation>
          )}
          <UserLocation
            showsUserHeadingIndicator={true}
            animated
            androidRenderMode="gps"
          />
        </Mapbox.MapView>
      </View>
      <View style={styles.destinationSearchContainer}>
        <View
          style={{
            height: 40,
            marginBottom: 12,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 10,
            zIndex: 10,
          }}>
          <MapboxPlacesAutocomplete
            id="currentLocation"
            placeholder="current Loaction"
            defaultValue={searchCurrent.namePlace}
            accessToken={MAP_BOX_ACCESS_TOKEN}
            onPlaceSelect={currentLocationSearch}
            onChangeLocation={async (value: any) => {
              // const locationName = await getCurrentLocationName(...coords);
              if (!value) {
                return;
              }
              setSearchCurrent(_prevState => ({
                ..._prevState,
                namePlace: value,
              }));
            }}
            onClearInput={({id}) => {
              id === 'currentLocation' && setSearchCurrent(defualtDataCoords);
            }}
            countryId="my"
            inputStyle={styles.mbxPlacesInputStyle}
          />
        </View>
        <View
          style={{
            height: 40,
            marginBottom: 12,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 70,
          }}>
          <MapboxPlacesAutocomplete
            id="destinationLocation"
            placeholder="destintion Location"
            accessToken={MAP_BOX_ACCESS_TOKEN}
            defaultValue={searchDestination.namePlace}
            onPlaceSelect={destinationLocationSearch}
            onClearInput={({id}) => {
              id === 'destinationLocation' &&
                setSearchDestination(defualtDataCoords);
            }}
            onChangeLocation={async value => {
              // const locationName = await getCurrentLocationName(...coords);
              // if (!value) return;
              setSearchDestination(_prevState => ({
                ..._prevState,
                namePlace: value,
              }));
            }}
            countryId="my"
            inputStyle={styles.mbxPlacesInputStyle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    height: '100%',

    width: '100%',
  },

  map: {
    flex: 1,
  },
  destinationIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationSearchContainer: {
    position: 'absolute',
    height: '20%',
    top: 60,
    left: 0,
    right: 0,
    paddingTop: StatusBar.currentHeight,
  },
  mbxPlacesInputStyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Maps;
