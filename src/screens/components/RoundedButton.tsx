import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import tw from '../../../tailwind';

const RoundedButton = ({label, onPress}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // style={tw`text-lg tracking-wide flex items-center`}
      style={tw.style('text-2xl tracking-wide flex-row mb-1 text-blue')}>
      <Text
        style={tw.style(
          'text-2xl "" font-bold  tracking-wide text-blue',
        )}>
        {label}
      </Text>
      <Icon
        name="arrow-right"
        style={tw.style('text-2xl font-bold tracking-wide text-blue')}
      />
    </TouchableOpacity>
  );
};

export default RoundedButton;
