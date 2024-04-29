/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Maps from './src/screens/Maps';
import Mapbox from '@rnmapbox/maps';
import BootSplash from 'react-native-bootsplash';

Mapbox.setAccessToken(
  'pk.eyJ1IjoieW91bmlzYWJ1emF5ZWQiLCJhIjoiY2x2Ym0yNTE3MGFxZzJpcGJxNGh5Mmp1cSJ9.sPOVykSSG5YH2MSFSkDH8g',
);
// Mapbox.setConnected(true);

const App = () => {
  React.useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <>
      <Maps />
    </>
  );
};

export default App;
