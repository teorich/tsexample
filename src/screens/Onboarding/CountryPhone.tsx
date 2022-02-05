/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {
  CountryCode,
  Country,
} from 'react-native-country-picker-modal/lib/types';
import MaskInput from 'react-native-mask-input';
import CheckBox from '@react-native-community/checkbox';

import tw from '../../../tailwind';

interface Props {}

const StepOne = () => {
  console.log('hello step one');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [phone, setPhone] = React.useState('');
  const [countryCode, setCountryCode] = useState<CountryCode>('CM');
  const [country, setCountry] = useState<Country>({
    callingCode: ['237'],
    cca2: 'CM',
    currency: ['XAF'],
    flag: 'flag-cm',
    name: 'Cameroon',
    region: 'Africa',
    subregion: 'Middle Africa',
  });
  const [withCountryNameButton] = useState<boolean>(false);
  const [withFlag] = useState<boolean>(true);
  const [withEmoji] = useState<boolean>(true);
  const [withFilter] = useState<boolean>(true);
  const [withAlphaFilter] = useState<boolean>(false);
  const [withCallingCode] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setVisible(false);
  };

  // const containerButtonStyle: any = {
  //   alignItems: 'center',
  //   marginLeft: 10,
  // };
  console.log('calling code', withCallingCode, country);

  const CountrySelect = () =>
    useMemo(
      () => (
        <View
          style={{
            marginLeft: 20,
            alignItems: 'center',
            width: '15%',
          }}>
          <CountryPicker
            {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect,
            }}
            visible={visible}
          />
        </View>
      ),
      [],
    );

  return (
    <View style={tw.style('m-5', '')}>
      <View style={tw.style(' mb-4', '')}>
        <View style={tw.style(' mb-2', '')}>
          <Text
            style={tw.style(
              'text-[#9EA6B8] leading-5 font-semibold text-base',
              '',
            )}>
            Choose a country
          </Text>
        </View>
        <Pressable
          onPress={() => setVisible(true)}
          style={tw.style('rounded items-center flex-row h-12 bg-white', '')}>
          <CountrySelect />
          <View>
            <Text style={tw.style('text-black text-base', '')}>
              {country && country.name}
            </Text>
          </View>
          <View style={tw.style('items-end absolute right-3', '')}>
            <Text>icon</Text>
          </View>
        </Pressable>
      </View>
      <View style={tw.style(' mb-4', '')}>
        <View style={tw.style(' mb-2', '')}>
          <Text
            style={tw.style(
              'text-[#9EA6B8] leading-5 font-semibold text-base',
              '',
            )}>
            Enter phone number
          </Text>
        </View>
        <View
          style={tw.style('rounded items-center flex-row h-12 bg-white', '')}>
          <MaskInput
            style={tw.style('text-black text-base items-center ml-5', '')}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(masked, unmasked) => {
              setPhone(masked); // you can use the unmasked value as well

              // assuming you typed "9" all the way:
              console.log(masked); // (99) 99999-9999
              console.log(unmasked); // 99999999999
            }}
            mask={[
              /\d/,
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
            ]}
          />
        </View>
      </View>
      <View style={tw.style(' mb-4', '')}>
        <View style={tw.style(' mb-2', '')}>
          <Text
            style={tw.style(
              'text-[#9EA6B8] leading-5 font-semibold text-base',
              '',
            )}>
            Verify phone number
          </Text>
        </View>
        <View
          style={tw.style('rounded items-center flex-row h-12 bg-white', '')}>
          <MaskInput
            style={tw.style('text-black text-base items-center ml-5', '')}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(masked, unmasked) => {
              setPhone(masked); // you can use the unmasked value as well

              // assuming you typed "9" all the way:
              console.log(masked); // (99) 99999-9999
              console.log(unmasked); // 99999999999
            }}
            mask={[
              /\d/,
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
              ' ',
              /\d/,
              /\d/,
            ]}
          />
        </View>
      </View>
      <View style={tw.style('flex-row h-12', '')}>
        <CheckBox
          onFillColor="#fff"
          onCheckColor="#01b6eb"
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text>
          I accept Terms of service, Privacy Policy of Bip Technologies
        </Text>
      </View>
    </View>
  );
};

export default StepOne;
