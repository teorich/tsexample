import React from 'react';
import {View, useWindowDimensions} from 'react-native';
import tw from '../../../tailwind';
import RoundedButton from './RoundedButton';

const Footer = ({rightButtonLabel = false, rightButtonPress = false}: any) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.1;
  const FOOTER_PADDING = windowWidth * 0.1;

  return (
    <View
      style={tw.style(
        'text-2xl tracking-wide flex-row mb-3 absolute -bottom-0 -right-0',
        {
          justifyContent: 'flex-end',
          height: HEIGHT,
          paddingHorizontal: FOOTER_PADDING,
        },
      )}>
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
    </View>
  );
};

export default Footer;

// style={{
//   flexDirection: 'row',
//   justifyContent: 'flex-end',
//   height: HEIGHT,
//   opacity: 0.6,
//   alignItems: 'center',
//   paddingHorizontal: FOOTER_PADDING,
// }}
