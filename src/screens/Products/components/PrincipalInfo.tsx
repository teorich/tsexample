import React from 'react';
import {Text, TextInput, View} from 'react-native';
import DropdownComponent from 'screens/components/DropdownComponent';

import tw from '../../../../tailwind';

interface PrincipalInfoProps {
  title?: string;
}

const PrincipalInfo: React.FunctionComponent<PrincipalInfoProps> = props => {
  return (
    <View
      style={tw.style(
        'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 mb-5',
      )}>
      <View style={tw.style('mb-4 mt-4')}>
        <Text style={tw.style('m-auto leading-5 uppercase font-medium')}>
          information principale
        </Text>
      </View>

      <View style={tw.style('m-3')}>
        <Text
          style={tw.style(
            'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
          )}>
          product name
        </Text>
        <TextInput
          style={tw.style(
            ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
          )}
        />
      </View>

      <View style={tw.style('m-3')}>
        <Text
          style={tw.style(
            'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
          )}>
          description
        </Text>
        <View style={tw.style('mt-4')}>
          <DropdownComponent />
        </View>
      </View>

      <View style={tw.style('m-3')}>
        <Text
          style={tw.style(
            'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
          )}>
          description
        </Text>
        <View>
          <TextInput
            underlineColorAndroid='transparent'
            multiline={true}
            numberOfLines={10}
            style={tw.style(
              ' text-xs rounded bg-[#FFFFFF]  justify-start w-full h-137px "" border border-[#EDEEF0]',
              {textAlignVertical: 'top'},
            )}
          />
        </View>
      </View>
      <View style={tw.style('m-3')}>
        <Text
          style={tw.style(
            'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
          )}>
          product name
        </Text>
        <TextInput
          style={tw.style(
            ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
          )}
        />
      </View>

      <View style={tw.style('m-3')}>
        <Text
          style={tw.style(
            'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
          )}>
          description
        </Text>
        <View style={tw.style('mt-4')}>
          <DropdownComponent />
        </View>
      </View>
    </View>
  );
};

export default PrincipalInfo;
