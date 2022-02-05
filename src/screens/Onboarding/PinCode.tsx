import React, {useRef} from 'react';
import {Pressable, Text, View} from 'react-native';
import OtpInputs, {OtpInputsRef} from 'react-native-otp-inputs';

import tw from '../../../tailwind';

interface PinCodeProps {
  code?: string;
  handlePageChange: (pageNumber: number, title: string) => void;
}

const PinCode: React.FunctionComponent<PinCodeProps> = props => {
  const {handlePageChange} = props;
  const otpRef = useRef<OtpInputsRef>(null);

  return (
    <View style={tw.style('absolute top-32 left-6')}>
      <OtpInputs
        ref={otpRef}
        handleChange={code => console.log(code)}
        numberOfInputs={6}
        autofillFromClipboard={false}
        inputStyles={tw.style('text-xl m-3 h-14 rounded bg-white w-8')}
      />
      <View style={tw.style('m-3')}>
        <Text style={tw.style('font-extrabold text-xs')}>
          Vous n'avez pas reçu de code?
        </Text>
        <Text style={tw.style('mt-2 text-blue font-extrabold text-xs')}>
          Envoyer à nouveau
        </Text>
      </View>
      <View style={tw.style('mt-48')}>
        <Pressable
          style={tw.style('border-2 m-4 h-12 rounded border-[#D8D8D8]')}>
          <Text style={tw.style('m-auto font-extrabold text-[#D8D8D8]')}>
            VÉRIFIEZ AVEC EMAIL
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handlePageChange(2, '3. Validate Phone')}
          style={tw.style('m-4 h-12 bg-accent rounded')}>
          <Text style={tw.style('m-auto font-extrabold text-dark')}>
            VÉRIFIER
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PinCode;
