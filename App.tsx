/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import Maps from './src/screens/Maps';
import Mapbox from '@rnmapbox/maps';
import BootSplash from 'react-native-bootsplash';
import {Image, Modal, Text, TouchableHighlight, View} from 'react-native';

Mapbox.setAccessToken(
  'pk.eyJ1IjoieW91bmlzYWJ1emF5ZWQiLCJhIjoiY2x2Ym0yNTE3MGFxZzJpcGJxNGh5Mmp1cSJ9.sPOVykSSG5YH2MSFSkDH8g',
);
// Mapbox.setConnected(true);

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Maps />
      <View
        style={{
          padding: 6,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={() => setModalVisible(true)}>
          <Image source={require('./src/assets/svgs/home.png')} />
        </TouchableHighlight>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            position: 'relative',
          }}>
          <TouchableHighlight
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            underlayColor={'transparent'}
            onPress={() => setModalVisible(false)}>
            <View />
          </TouchableHighlight>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: 10,
              left: 10,
              top: '10%',
              bottom: '10%',
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                padding: 16,
                justifyContent: 'center',
                borderRadius: 5,
                width: '80%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Dashboard
              </Text>

              <View
                style={{
                  width: '100%',
                  height: 3,
                  backgroundColor: '#524C42',
                  marginTop: 12,
                }}></View>

              <View style={{margin: 20, display: 'flex', gap: 14}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('./src/assets/imgs/work-on-progress.jpg')}
                  />
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                    3 Developments
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 40, height: 30}}
                    source={require('./src/assets/imgs/car-crash.jpg')}
                  />
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                    2 Accidents
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{width: 40, height: 30}}
                    source={require('./src/assets/imgs/arrow-road.png')}
                  />
                  <Text
                    style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                    4 Flow Directions
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
