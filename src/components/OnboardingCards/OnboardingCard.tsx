import React from 'react';
import {Pressable, Text, View} from 'react-native';
import tw from '../../../tailwind';

interface OnboardingCardProps {
  title?: string;
  subtitle?: string;
  buttonTitle?: string;
  svgComponent: () => any;
  navigation?: any;
  handle: () => any;
}

const OnboardingCard: React.FunctionComponent<OnboardingCardProps> = props => {
  return (
    <View style={tw.style('""Bold')}>
      <View
        style={tw.style(
          '""Bold border border-2 w-full rounded-t-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden',
          'border-[#E5E9F2]',
        )}>
        <View
          style={tw.style(
            'items-center border-b bg-[#FCFDFF]',
            'border-[#E5E9F2]',
          )}>
          {props.svgComponent()}
        </View>
        <View style={tw.style('""Bold p-4 rounded-t-md w-full')}>
          <Text
            style={tw.style(
              'text-justify font-bold text-base leading-6 ""Bold',
            )}>
            {props.title}
          </Text>
          <Text style={tw.style('text-justify w-64 font-semibold ""')}>
            {props.subtitle}
          </Text>
          <Pressable
            onPress={() => props.handle()}
            style={tw.style(' mt-4 h-14 bg-accent rounded')}>
            <Text style={tw.style('m-auto font-extrabold text-dark')}>
              {props.buttonTitle}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default OnboardingCard;
