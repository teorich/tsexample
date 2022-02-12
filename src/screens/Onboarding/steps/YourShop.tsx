import React from 'react';
import {Text, TextInput, View} from 'react-native';
import DropdownComponent from '../../../screens/components/DropdownComponent';

import tw from '../../../../tailwind';
import {useFormikContext} from 'formik';

interface YourShopProps {
  title?: string;
}

const YourShop: React.FunctionComponent<YourShopProps> = props => {
  const {setFieldValue} = useFormikContext();
  return (
    <View style={tw.style('mb-10')}>
      <View style={tw.style('m-3')}>
        <Text
          style={tw.style(
            'text-base h-5 mb-5 leading-5  font-semibold ""',
          )}>
          Nom du Boutique
        </Text>
        <View
          style={tw.style(
            'bg-white text-xl relative rounded w-full h-14 ""',
          )}>
          <TextInput
            onChangeText={val => {
              setFieldValue('shopName', val);
              setFieldValue('url', val + '.biptech.ai');
            }}
            style={tw.style('text-xl ""')}
            placeholder="Le nom de ta boutique"
            underlineColorAndroid="transparent"
          />
          <Text
            style={tw.style(
              'absolute right-4 my-3 text-xl text-accent font-semibold',
            )}>
            .biptech.ai
          </Text>
        </View>
      </View>
      <View style={tw.style('')}>
        <Text
          style={tw.style(
            'text-base h-5 mb-5 leading-5  font-semibold ""',
          )}>
          Type de Boutique
        </Text>
        {/* <TextInput
          style={tw.style('bg-white rounded text-base h-14 ""')}
          placeholder="Choisissez une categorie"
        /> */}
        <DropdownComponent />
      </View>
      <View style={tw.style('m-3')}>
        <Text
          style={tw.style(
            'text-base h-5 mb-5 leading-5  font-semibold ""',
          )}>
          Nombre d'emplacements
        </Text>
        {/* <TextInput
          style={tw.style('bg-white rounded text-base h-14 ""')}
          placeholder="Choisissez d'emplacements"
        /> */}
        <DropdownComponent />
      </View>
      <View style={tw.style('m-3')}>
        <Text
          style={tw.style(
            'text-base h-5 mb-5 leading-5  font-semibold ""',
          )}>
          Chiffre d'affaires annuel estimé
        </Text>
        {/* <TextInput
          style={tw.style('bg-white rounded text-base h-14 ""')}
          placeholder="Choisissez une gamme de chiffre"
        /> */}
        <DropdownComponent />
      </View>
    </View>
  );
};

export default YourShop;
