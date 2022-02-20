import React from 'react';
import {Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../../tailwind';

interface Props {
  text?: string;
  textColor?: string;
  children?: any;
  props?: any;
}

const Title = (props: Props) => {
  return (
    <SafeAreaView>
    <View
      style={tw.style(
        'text-2xl tracking-wide flex-row h-18 shadow-md bg-white',
      )}>
      <Text
        style={tw.style(
          'text-lg  tracking-wide text-center p-2 font-mulishBold items-center mx-10',
          `${props.textColor}`,
        )}>
        {props.text}
      </Text>
    </View>
    </SafeAreaView>
  );
};

Title.defaultProps = {
  text: '',
  textColor: 'black',
};

export default Title;
