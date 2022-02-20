/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-toast-message';
const api = require('@what3words/api/es2015');

import UserLocationSvg from '../../../assets/images/userlocation.svg';

import tw from '../../../../tailwind';
import Map from '../../components/Map';
import { useFormikContext } from 'formik';

interface MapLocationProps {
  title?: string;
  setWordGps: (e: string) => void;
  handlePageChange: () => void
}

const API_KEY = 'XMIW1KLY';
api.setOptions({ key: API_KEY });


const MapLocation: React.FunctionComponent<MapLocationProps> = props => {
  const {setFieldValue, values} = useFormikContext();
  const [showMap, setShowMap] = useState(false);

  const getMyLocation = () => {
    try {
      request(Platform.OS === 'ios' ?  PERMISSIONS.IOS.LOCATION_ALWAYS: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
        if (result === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setFieldValue('position', { lat: position.coords.latitude, long: position.coords.longitude });
              api.convertTo3wa({ lat: position.coords.latitude, lng: position.coords.longitude })
                .then(async (data: any) => {
                  props.setWordGps(data.words);
                  Toast.show({
                    type: 'info',
                    text1: data.words
                  });
                  setFieldValue('three_words', data.words);
                  setFieldValue('country', data.country);
                  setFieldValue('near_by', data.nearestPlace);
                  props.handlePageChange();
                })
                .catch((error: any) => {
                  Toast.show({
                    type: 'error',
                    text1: error
                  });
                });
            },
            error => {
              // See error code charts below.
              // console.log(error.code, error.message);
              Toast.show({
                type: 'error',
                text1: error.message
              });
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        } else {
          Toast.show({
            type: 'info',
            text1: 'You have to agree to get your geographical location'
          });
        }
      });
    } catch (error) { }
  };
  return (
    <>
      {!showMap && (
        <View style={tw.style('items-center mt-10 ')}>
          <UserLocationSvg />
          <Text
            style={tw.style(
              'text-2xl  flex-wrap mt-4 text-center  font-mulishBold',
              'text-[#3E5066]',
            )}>
            Choisissez vos Emplacement de Boutique
          </Text>
          <Text
            style={tw.style(
              'mt-4 text-center text-bipgray leading-6 font-mulish',
            )}>
            Entrez 3 mots que nous pouvons utiliser pour localiser votre boutique (séparez les mots par une virgule ou Entrez)
          </Text>
          <View style={tw.style(' w-80')}>
            <Pressable
              onPress={() => setShowMap(true)}
              style={tw.style(
                'border-2 m-4 h-14 bg-white rounded border-accent',
              )}>
              <Text style={tw.style('m-auto font-extrabold text-dark')}>
                SELECT LOCATION ON MAP
              </Text>
            </Pressable>
            <Pressable
              style={tw.style('m-4 h-14 bg-accent rounded')}
              onPress={() => getMyLocation()}>
              <Text style={tw.style('m-auto font-extrabold text-dark')}>
                UTILISER MA POSITION ACTUEL
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      {showMap && <Map />}
    </>
  );
};

export default MapLocation;
