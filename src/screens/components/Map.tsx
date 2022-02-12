import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import tw from '../../../tailwind';

interface MapProps {
  title?: string;
}

const Map: React.FunctionComponent<MapProps> = () => {
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);

  useEffect(() => {
    try {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
        if (result === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              console.log(position.coords);
              setLong(position.coords.longitude);
              setLat(position.coords.latitude);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    } catch (error) {}
  }, [long, lat]);

  const LATITUD_DELTA = 0.0922;
  const window = Dimensions.get('window');
  const {width, height} = window;
  const LONGITUDE_DELTA = LATITUD_DELTA + width / height;

  return (
    <>
      <View>
        <TextInput
          style={tw.style(
            'bg-white text-base rounded absolute w-full h-14 ""',
          )}
          placeholder="Enter your name"
        />
      </View>
      <View style={styles.container}>
        <MapView
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0922,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          mapType="standard"
          provider={PROVIDER_GOOGLE}
          style={styles.map}>
          <Marker coordinate={{latitude: lat, longitude: long}} />
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
