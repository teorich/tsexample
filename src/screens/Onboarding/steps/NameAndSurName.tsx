import {useFormikContext} from 'formik';
import React from 'react';
import {Text, View, TextInput} from 'react-native';

import tw from '../../../../tailwind';

interface NameAndSurNameProps {
  title?: string;
}

const NameAndSurName: React.FunctionComponent<NameAndSurNameProps> = props => {
  const {setFieldValue} = useFormikContext();
  return (
    <View style={tw.style('mt-auto mb-auto ""')}>
      <View style={tw.style('m-3')}>
        <Text
          style={tw.style(
            'text-base h-5 mb-5 leading-5 font-mulishBold',
          )}>
          Name
        </Text>
        <TextInput
          onChangeText={val => setFieldValue('first_name', val)}
          style={tw.style('bg-white text-xl rounded w-full h-14 ""')}
          placeholder="Enter your name"
        />
      </View>
      <View style={tw.style('m-3')}>
        <Text
          style={tw.style(
            'text-base h-5 mb-5 leading-5 font-mulishBold',
          )}>
          Surname
        </Text>
        <TextInput
          onChangeText={val => setFieldValue('last_name', val)}
          style={tw.style('bg-white rounded text-xl h-14 ""')}
          placeholder="Enter your surname"
        />
      </View>
    </View>
  );
};

export default NameAndSurName;
