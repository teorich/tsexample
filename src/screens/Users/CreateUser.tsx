import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {Formik} from 'formik';
import CustomHeader from '../components/CustomHeader';

import tw from '../../../tailwind';

import CreateUserSvg from '../../assets/images/CreateUser.svg';
import {useUsers} from '../../providers/UserProvider';

interface CreateUserProps {
  navigation: any;
  isHome: boolean;
  route: any;
}

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Administrateur',
    value: 'administrateur',
    size: 18,
    color: '#01b6eb',
    labelStyle: tw.style('text-dark text-xs font-normal w-80px'),
  },
  {
    id: '2',
    label: 'Caissier',
    value: 'caissier',
    size: 18,
    color: '#01b6eb',
    labelStyle: tw.style('text-dark text-xs font-normal w-80px'),
  },
  {
    id: '3',
    label: 'Gestionnaire',
    value: 'gestionnaire',
    size: 18,
    color: '#01b6eb',
    labelStyle: tw.style('text-dark text-xs font-normal w-80px'),
  },
];

const CreateUser: React.FunctionComponent<any> = ({
  navigation,
  isHome,
  route,
}) => {
  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(radioButtonsData);

  const [isLoading, setIsLoading] = useState(false);

  const {handleAddUser} = useUsers();

  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    setRadioButtons(radioButtonsArray);
  }

  const createUser = async data => {
    try {
      const newData = {
        person: {first_name: data.firstName, last_name: data.lastName},
        email: data.email,
      };
      setIsLoading(true);
      await handleAddUser(newData);
      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <CustomHeader
        navigation={navigation}
        isHome={isHome}
        route={route}
        onSelect={() => {}}
      />

      <SafeAreaView>
        <ScrollView style={tw.style('mb-8')}>
          <Formik
            initialValues={{firstName: '', lastName: '', email: ''}}
            onSubmit={values => createUser(values)}>
            {formik => (
              <>
                <View
                  style={tw.style(
                    'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 p-5',
                  )}>
                  <View style={tw.style('mb-5')}>
                    <Text
                      style={tw.style(
                        'm-auto font-medium text-sm leading-5 uppercase text-dark',
                      )}>
                      Information Utilisateur
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      'border border-[#EDEEF0] w-172px m-auto mb-12 h-166px rounded bg-[#EDEEF0]',
                    )}>
                    <View style={tw.style('m-auto')}>
                      <CreateUserSvg />
                    </View>
                  </View>
                  <View style={tw.style('m-3')}>
                    <Text
                      style={tw.style(
                        'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                      )}>
                      First Name
                    </Text>
                    <TextInput
                      onChangeText={formik.handleChange('firstName')}
                      onBlur={formik.handleBlur('firstName')}
                      value={formik.values.firstName}
                      style={tw.style(
                        'text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                      )}
                    />
                  </View>
                  <View style={tw.style('m-3')}>
                    <Text
                      style={tw.style(
                        'text-xs h-5 mb-3 tracking-wider leading-5 uppercase font-semibold ""',
                      )}>
                      Last Name
                    </Text>
                    <TextInput
                      onChangeText={formik.handleChange('lastName')}
                      onBlur={formik.handleBlur('lastName')}
                      value={formik.values.lastName}
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
                      Phone number
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
                        'text-xs h-5 tracking-wider mb-3 leading-5 uppercase font-semibold ""',
                      )}>
                      display name
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
                        'text-xs h-5 tracking-wider mb-3 leading-5 uppercase font-semibold ""',
                      )}>
                      email
                    </Text>
                    <TextInput
                      onChangeText={formik.handleChange('email')}
                      onBlur={formik.handleBlur('email')}
                      value={formik.values.email}
                      style={tw.style(
                        ' text-xs rounded bg-[#FFFFFF] w-full h-14 "" border border-[#EDEEF0]',
                      )}
                    />
                  </View>
                </View>
                <View
                  style={tw.style(
                    'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 p-5 mt-6 mb-6',
                  )}>
                  <View style={tw.style('m-5')}>
                    <Text
                      style={tw.style(
                        'text-dark uppercase font-medium text-dark',
                      )}>
                      boutiques
                    </Text>
                  </View>
                  <View style={tw.style('w-full border-t border-[#9EA6B8]')} />
                  <View style={tw.style('m-5 flex flex-wrap')}>
                    <View style={tw.style('flex flex-row')}>
                      <BouncyCheckbox
                        size={20}
                        fillColor="#01b6eb"
                        unfillColor="#FFFFFF"
                        text="Custom Checkbox"
                        style={{
                          marginRight: 10,
                        }}
                        iconStyle={{borderColor: '#9ea6b8', borderRadius: 0}}
                        textStyle={{
                          fontFamily: 'Roboto',
                          textDecorationLine: 'none',
                          fontSize: 12,
                        }}
                        onPress={(isChecked: boolean) => {
                          console.log(isChecked);
                        }}
                      />
                      <BouncyCheckbox
                        size={20}
                        fillColor="#01b6eb"
                        unfillColor="#FFFFFF"
                        text="Custom Checkbox"
                        style={{
                          marginRight: 10,
                        }}
                        iconStyle={{borderColor: '#9ea6b8', borderRadius: 0}}
                        textStyle={{
                          fontFamily: 'Roboto',
                          textDecorationLine: 'none',
                          fontSize: 12,
                        }}
                        onPress={(isChecked: boolean) => {
                          console.log(isChecked);
                        }}
                      />
                    </View>
                    <View style={tw.style('flex flex-row mt-5')}>
                      <BouncyCheckbox
                        size={20}
                        fillColor="#01b6eb"
                        unfillColor="#FFFFFF"
                        text="Custom Checkbox"
                        style={{
                          marginRight: 10,
                        }}
                        iconStyle={{borderColor: '#9ea6b8', borderRadius: 0}}
                        textStyle={{
                          fontFamily: 'Roboto',
                          textDecorationLine: 'none',
                          fontSize: 12,
                        }}
                        onPress={(isChecked: boolean) => {
                          console.log(isChecked);
                        }}
                      />
                      <BouncyCheckbox
                        size={20}
                        fillColor="#01b6eb"
                        unfillColor="#FFFFFF"
                        text="Custom Checkbox"
                        style={{
                          marginRight: 10,
                        }}
                        iconStyle={{borderColor: '#9ea6b8', borderRadius: 0}}
                        textStyle={{
                          fontFamily: 'Roboto',
                          textDecorationLine: 'none',
                          fontSize: 12,
                        }}
                        onPress={(isChecked: boolean) => {
                          console.log(isChecked);
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={tw.style(
                    'bg-[#FDFDFE] shadow-sm rounded border border-[#EDEEF0] flex-1 p-5 mt-6 mb-6',
                  )}>
                  <View style={tw.style('m-5')}>
                    <View>
                      <Text style={tw.style('font-medium text-dark uppercase')}>
                        rôle
                      </Text>
                      <RadioGroup
                        containerStyle={tw.style('-ml-52 mt-4')}
                        radioButtons={radioButtons}
                        onPress={onPressRadioButton}
                      />
                    </View>
                    <View style={tw.style('mt-2')}>
                      <BouncyCheckbox
                        size={20}
                        fillColor="#01b6eb"
                        unfillColor="#FFFFFF"
                        text="Custom Checkbox"
                        style={{
                          marginRight: 10,
                        }}
                        iconStyle={{borderColor: '#9ea6b8', borderRadius: 0}}
                        textStyle={{
                          fontFamily: 'Roboto',
                          textDecorationLine: 'none',
                          fontSize: 12,
                        }}
                        onPress={(isChecked: boolean) => {
                          console.log(isChecked);
                        }}
                      />
                    </View>
                  </View>
                  <Pressable
                    style={tw.style(' mt-4 h-14 bg-accent rounded')}
                    onPress={formik.handleSubmit}>
                    {!isLoading && (
                      <Text
                        style={tw.style(
                          'm-auto font-extrabold text-dark uppercase',
                        )}>
                        enrégistrer
                      </Text>
                    )}
                    {isLoading && (
                      <ActivityIndicator size="large" color="#01b6eb" />
                    )}
                  </Pressable>
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default React.memo(CreateUser);
