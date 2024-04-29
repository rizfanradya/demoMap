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
          padding: 16,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <TouchableHighlight
          style={{
            backgroundColor: 'blue',
            borderRadius: 20,
            padding: 10,
            elevation: 2,
          }}
          onPress={() => setModalVisible(true)}>
          <Image
            style={{width: 50}}
            source={require('./src/assets/svgs/home.png')}
          />
        </TouchableHighlight>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              padding: 35,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              width: '80%',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Dashboard</Text>

            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={{color: 'white'}}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = {
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
};
