import {useFormikContext} from 'formik';
import React, {useRef, useState} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-number-input';

import tw from '../../../../tailwind';

interface LoginModeProps {
  title?: string;
  isByPhone: boolean;
  setISByPhone: any;
  email: string;
  setEmail: any;
  setPhoneNumber: any;
}

const LoginMode: React.FunctionComponent<LoginModeProps> = props => {
  const {title, isByPhone, setISByPhone, email, setEmail, setPhoneNumber} =
    props;
  const [phoneValue, setPhoneValue] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const {setFieldValue} = useFormikContext();

  const toggleSwitch = () => {
    setEmail('');
    setPhoneNumber('');
    setPhoneValue('');
    setISByPhone((prev: boolean) => !prev);
  };

  return (
    <>
      <Text
        style={tw.style(
          'text-2xl  flex-wrap text-center m-8 font-mulishBold',
          'text-[#3E5066]',
        )}>
        {title}
      </Text>

      <View style={tw.style('font-mulish')}>
        <View style={tw.style('m-3')}>
          <Text
            style={tw.style(
              'text-base h-5 mb-5 leading-5  font-semibold font-mulish',
            )}>
            Sélectionnez téléphone ou e-mail
          </Text>
          <View
            style={tw.style(
              'border-2 h-12 pb-2 bg-white rounded-[30px]',
              {'border-[#9EA6B8]': !isByPhone},
              {'border-blue': isByPhone},
            )}>
            <View style={tw.style('mt-auto mb-auto pb-1')}>
              <View style={tw.style('ml-20')}>
                <Text
                  style={tw.style('text-base h-5 font-semibold font-mulish')}>
                  {isByPhone
                    ? 'Contactez-moi par téléphone'
                    : 'Contactez-moi par email'}
                </Text>
              </View>
              <View style={tw.style('absolute m-1 ml-4')}>
                <TouchableOpacity
                  onPress={toggleSwitch}
                  style={tw.style(
                    'md:w-14 md:h-2 w-10  flex border rounded-full p-2 mt-1 relative',
                    {'border-dark': !isByPhone},
                    {'border-blue': isByPhone},
                  )}>
                  {/* Switch */}
                </TouchableOpacity>
                <View style={isByPhone ? styles.toggleOn : styles.child} />
                {/* <Switch
                  trackColor={{false: '#fff', true: '#fff'}}
                  thumbColor={isByPhone ? '#01b6eb' : '#3e5066'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isByPhone}
                /> */}
              </View>
            </View>
          </View>
        </View>
        {!isByPhone && (
          <View style={tw.style('m-3')}>
            <Text
              style={tw.style(
                'text-base h-5 mb-5 leading-5  font-semibold font-mulish',
              )}>
              Entrez votre adresse email
            </Text>
            <TextInput
              style={tw.style('bg-white rounded text-xl h-14 font-mulish')}
              placeholder="myemail@domain.com"
              onChangeText={val => setFieldValue('email', val)}
            />
          </View>
        )}
        {isByPhone && (
          <View style={tw.style('m-3')}>
            <Text
              style={tw.style(
                'text-base h-5 mb-5 leading-5 font-semibold font-mulish',
              )}>
              Taper le numéro de téléphone
            </Text>
            <PhoneInput
              containerStyle={tw.style(
                'text-base w-full shadow-none bg-white rounded h-13 font-mulish',
              )}
              textInputStyle={tw.style(
                'text-xl w-full shadow-none bg-white rounded h-13 font-mulish',
              )}
              textContainerStyle={tw.style('text-base  bg-white font-mulish')}
              ref={phoneInput}
              defaultValue={phoneValue}
              defaultCode="CM"
              layout="first"
              onChangeText={text => {
                setPhoneValue(text);
              }}
              onChangeFormattedText={text => {
                setFieldValue('phoneNumber', text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
          </View>
        )}
      </View>
    </>
  );
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
  },
  child: {
    height: 25,
    width: 25,
    position: 'absolute',
    borderRadius: 999,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: -18,
    backgroundColor: '#3e5066',
    transform: [{translateX: 10}],
  },
  toggleOn: {
    height: 25,
    width: 25,
    position: 'absolute',
    borderRadius: 999,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: -18,
    backgroundColor: '#01b6eb',
    borderColor: '#01b6eb',
    transform: [{translateX: 38}],
  },
});
export default LoginMode;
