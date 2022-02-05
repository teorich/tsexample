/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '../../../tailwind';

const Page = ({title, children}: any) => {
  return (
    <>
      <Text
        style={tw.style(
          'text-2xl  flex-wrap text-center m-8 mt-10 font-mulishBold leading-7',
          'text-[#3E5066]',
        )}>
        {title}
      </Text>
      <ScrollView>
        <View style={tw.style('', '')}>{children}</View>
      </ScrollView>
    </>
  );
};

export default Page;
