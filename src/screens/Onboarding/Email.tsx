import React from 'react';
import {Text, View} from 'react-native';
import tw from '../../../tailwind';
import EmailSvg from '../../assets/images/EmailOnboarding.svg';

interface EmailProps {
  title?: string;
}

const Email: React.FunctionComponent<EmailProps> = props => {
  return (
    <>
      <View style={tw.style('items-center mt-10 ')}>
        <EmailSvg />
        <View style={tw.style('items-center mb-60 mx-7')}>
          <Text
            style={tw.style(
              'mt-7 text-center text-dark leading-6 font-mulishBold text-base',
            )}>
            Confirm your email address
          </Text>
          <Text style={tw.style('my-6 text-center  text-bipgray')}>
            We sent a confirmation email to:
          </Text>
          <Text style={tw.style('text-center font-semibold')}>
            myemail@domain.com
          </Text>
          <Text
            style={tw.style(
              'mt-4 text-center text-bipgray leading-6 font-mulish',
            )}>
            Check your email and click on the confirmation link to validate your
            email address
          </Text>
          <Text style={tw.style('mt-7 text-accent font-mulishBold')}>
            Resend Email
          </Text>
        </View>
      </View>
    </>
  );
};

export default Email;
