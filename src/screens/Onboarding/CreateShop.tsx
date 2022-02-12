import React, {useRef} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import OtpInputs, {OtpInputsRef} from 'react-native-otp-inputs';

import tw from '../../../tailwind';

interface CreateShopProps {
  code?: string;
  createUser?: () => void;
  isByPhone: boolean;
}

const CreateShop: React.FunctionComponent<CreateShopProps> = props => {
  const otpRef = useRef<OtpInputsRef>(null);

  return (
    <>
      <View style={tw.style('absolute top-32 ml-4')}>
        {props.isByPhone && (
          <View>
            <OtpInputs
              ref={otpRef}
              handleChange={code => console.log(code)}
              numberOfInputs={6}
              autofillFromClipboard={false}
              inputStyles={tw.style('m-3 h-14 rounded bg-white w-9')}
            />
          </View>
        )}
        {!props.isByPhone && (
          <View>
            <View style={tw.style('""')}>
              <View style={tw.style('m-3')}>
                <Text
                  style={tw.style(
                    'text-base h-5 mb-5 leading-5  font-semibold ""',
                  )}>
                  Password
                </Text>
                <TextInput
                  style={tw.style(
                    'bg-white text-base rounded  h-14 ""',
                  )}
                  placeholder="Enter password"
                />
              </View>
              <View style={tw.style('m-3')}>
                <Text
                  style={tw.style(
                    'text-base h-5 mb-5 leading-5  font-semibold ""',
                  )}>
                  Password
                </Text>
                <TextInput
                  style={tw.style(
                    'bg-white rounded text-base h-14 ""',
                  )}
                  placeholder="Confirm password"
                />
              </View>
            </View>
          </View>
        )}
        <Pressable
          style={tw.style('m-auto h-14 bg-accent rounded  -bottom-72 w-80', {
            '-bottom-72': props.isByPhone,
            '-bottom-24': !props.isByPhone,
          })}
          onPress={props.createUser}>
          <Text style={tw.style('m-auto font-extrabold text-dark')}>
            CREER MA BOUTIQUE
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default CreateShop;
