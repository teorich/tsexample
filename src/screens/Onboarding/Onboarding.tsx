import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  Animated,
} from 'react-native';
import PagerView, {PagerViewProps} from 'react-native-pager-view';
import {createStackNavigator} from '@react-navigation/stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import Realm, {AppConfiguration} from 'realm';

import Icon from 'react-native-vector-icons/Octicons';
import tw from '../../../tailwind';

import Footer from '../components/Footer';
import Title from '../../components/Title';

import Page from '../components/Page';
import NameAndSurName from './steps/NameAndSurName';
// import StepOneOTP from './StepOneOTP';
import PinCode from './PinCode';
import LoginMode from './steps/LoginMode';
import Email from './Email';
import YourShop from './steps/YourShop';
import MapLocation from './steps/MapLocation';
import CreateShop from './CreateShop';
import AppModal from '../components/AppModal';
import {useReduxDispatch, useReduxSelector} from '../../store';
import {registerAgency} from '../../store/agency';
import {registerShop} from '../../store/shop';
import {registerUser} from '../../store/user';
import {realmApp} from '../../../RealmConfig';
import getRealmSchemas from '../../../RealmConfig';
import Agency from '../../models/Agency.model';
import Shop from '../../models/Shop.model';
import User from '../../models/User.model';
import Products from '../../models/Product.model';
import RegisterSessions from '../../models/RegisterSession.model';
import Order from '../../models/Order.model';

const Stack = createStackNavigator();

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

type RootStackParamList = {
  Onboarding: undefined;
  Registration: undefined;
  Home: undefined;
  create?: () => void;
};

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>;

const OnboardingRegistration = ({navigation, route}: any) => {
  const pagerRef = useRef();
  const [customTitle, setCustomeTitle] = useState('Enter your name');
  const [currentStep, setCurrentStep] = useState(0);
  const [isByPhone, setISByPhone] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [wordGps, setWordGps] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [shopUrl, setShopUrl] = useState('');
  const dispatch = useReduxDispatch();
  const user = useReduxSelector(state => state.user.currentUser);
  const realmRef = useRef<Realm | null>(null);

  // console.log('from realm', users);

  // console.log(navigation.setOptions({ title: 'got it' }));

  // useEffect(() => {
  //   // // cleanup function to close realm after component unmounts
  //   return () => {
  //     const realm = realmRef.current;
  //     // if the realm exists, close the realm
  //     if (realm) {
  //       realm.close();
  //       // set the reference to null so the realm can't be used after it is closed
  //       realmRef.current = null;
  //     }
  //   };
  // }, [user, realmRef]);

  const createStore = async (data, agency) => {
    const realm = realmRef.current;
    // if the realm exists, create a task
    let result;
    if (realm) {
      result = realm.write(() => {
        return realm?.create(
          'Shop',
          Shop.generate({
            name: data.shopName,
            url: data.url,
            agencies: [agency],
            registers: [data.registers],
            address: {
              country: data.country,
              town: '',
              three_words: data.three_words,
              near_by: data.near_by,
              position: data.position,
            },
          }),
        );
      });
    }

    return result;
  };

  const createBipUser = async (data, newAgency) => {
    const realm = realmRef.current;
    // if the realm exists, create a task
    let result;
    if (realm) {
      result = realm.write(() => {
        return realm?.create(
          'User',
          User.generate({
            email: data.email,
            agencies: [newAgency],
            user_id: realmApp.currentUser?.id,
            person: {
              first_name: data.first_name,
              last_name: data.last_name,
              address: {
                country: data.country,
                town: '',
                three_words: data.three_words,
                near_by: data.near_by,
                position: data.position,
              },
              phone_number: {
                number: data.phoneNumber,
                mno: '',
                is_momo: false,
                is_verified: true,
              },
            },
          }),
        );
      });
    }

    return result;
  };

  const createAgency = async data => {
    const realm = realmRef.current;
    // if the realm exists, create a task
    let result;
    if (realm) {
      result = realm.write(() => {
        return realm?.create(
          'Agency',
          Agency.generate({
            name: data.shopName,
            address: {
              country: data.country,
              town: '',
              three_words: data.three_words,
              near_by: data.near_by,
              position: data.position,
            },
          }),
        );
      });
    }

    return result;
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: customTitle,
    });
  }, [navigation, customTitle]);

  const handlePageChange = async (pageNumber: number, title: string) => {
    if (pagerRef) {
      setCustomeTitle(title);
      setCurrentStep(pageNumber);
      pagerRef.current?.setPage(pageNumber);
    }
    try {
      await AsyncStorage.setItem('@completedOnboarding', 'false');
    } catch (error) {
      console.log('Error @setItem: ', error);
    }
  };

  const createUser = async (data: any) => {
    try {
      if (!user) {
        await realmApp.emailPasswordAuth.registerUser({
          email: data.email,
          password: '123456789',
        });
        const creds = Realm.Credentials.emailPassword(data.email, '123456789');
        const loggedInUser = await realmApp.logIn(creds);

        await dispatch(registerUser({userId: loggedInUser.id}));

        console.log('authenticaation', loggedInUser);
        const OpenRealmBehaviorConfiguration: any = {
          type: 'openImmediately',
        };
        const config: any = {
          schema: [...getRealmSchemas], // add multiple schemas, comma seperated.
          schemaVersion: 1,
          sync: {
            user: realmApp.currentUser,
            partitionValue: realmApp.currentUser?.id,
            newRealmFileBehavior: OpenRealmBehaviorConfiguration,
            existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
          },
        };

        Realm.open(config)
          .then(realmInstance => {
            realmRef.current = realmInstance;
            console.log('ticking...');
            // const realm = realmRef.current;
            // if the realm exists, get all Task items and add a listener on the Task collection
          })
          .catch(err => {
            console.log(`an error occurred opening the realm ${err}`);
          });
      } else {
        const createdAgency = await createAgency(data);
        const createdShop = await createStore(data, createdAgency);
        const newUser = await createBipUser(data, createdAgency);
        const realm = realmRef.current;
        // if the realm exists, create a task
        if (realm && createAgency && createdShop) {
          await realm.write(() => {
            return realm?.create(
              'Agency',
              {
                _id: new Realm.BSON.ObjectId(createdAgency._id),
                registers: [data.registers],
                updated_at: new Date(),
              },
              Realm.UpdateMode.Modified,
            );
          });
        }
        // const realm = await Realm.open(getRealm);
        // realmRef.current = realm;
        // const newrel = realmRef.current;
        // let result: any;
        // if (newrel) {
        //   result = newrel.write(() => {
        //     return realm.create(
        //       'Agency',
        //       Agency.generate({
        //         name: data.shopName,
        //         address: {
        //           country: data.country,
        //           town: '',
        //           three_words: data.three_words,
        //           near_by: data.near_by,
        //           position: data.position,
        //         },
        //       }),
        //     );
        //   });
        // }
        // console.log('agen', result);
        // const newAgency = await handleAddAgency({
        //   name: data.shopName,
        //   address: {
        //     country: data.country,
        //     town: '',
        //     three_words: data.three_words,
        //     near_by: data.near_by,
        //     position: data.position,
        //   },
        // });
        // const newUser = await handleAddUser({
        //   email: data.email,
        //   agencies: [newAgency],
        //   person: {
        //     first_name: data.first_name,
        //     last_name: data.last_name,
        //     address: {
        //       country: data.country,
        //       town: '',
        //       three_words: data.three_words,
        //       near_by: data.near_by,
        //       position: data.position,
        //     },
        //     phone_number: {
        //       number: data.phoneNumber,
        //       mno: '',
        //       is_momo: false,
        //       is_verified: true,
        //     },
        //   },
        // });
        setShopUrl(createdShop.url);
        await dispatch(
          registerUser(
            JSON.parse(JSON.stringify(newUser, getCircularReplacer())),
          ),
        );
        await dispatch(
          registerAgency(
            JSON.parse(JSON.stringify(createdAgency, getCircularReplacer())),
          ),
        );
        await dispatch(
          registerShop(
            JSON.parse(JSON.stringify(createdShop, getCircularReplacer())),
          ),
        );
        await AsyncStorage.setItem('@completedOnboarding', 'true');
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modalContent = () => {
    return (
      <View
        style={tw.style('bg-white font-mulishBold h-64 relative items-center')}>
        <View style={tw.style('absolute top-8')}>
          <Text
            style={tw.style('text-2xl font-mulishBold text-dark text-center')}>
            Félicitations, votre boutique a été créé avec success!
          </Text>
          <Text style={tw.style(' font-mulishBold text-center')}>
            Store url: {shopUrl}
          </Text>
        </View>
        <Pressable
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            })
          }
          style={tw.style(
            'm-auto h-14 bg-accent rounded absolute bottom-10 w-80',
          )}>
          <Text style={tw.style('m-auto font-extrabold text-dark')}>
            Continue
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          url: '',
          phoneNumber: '',
          shopName: '',
          last_name: '',
          first_name: '',
          number: '',
          three_words: '',
          position: {lat: 0, long: 0},
          country: '',
          near_by: '',
          registers: {name: 'registerA', key: new Realm.BSON.ObjectId()},
        }}
        onSubmit={createUser}>
        {formik => (
          <>
            <View style={tw.style('absolute')}>
              {showModal && (
                <AppModal
                  showModal={showModal}
                  closeModal={() => setShowModal(false)}
                  children={modalContent()}
                />
              )}
            </View>
            <SafeAreaView style={tw.style('flex-1 bg-[#F9F8FE] font-mulish')}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={tw.style('flex-1')}>
                <AnimatedPagerView
                  style={{flex: 1}}
                  initialPage={0}
                  ref={pagerRef}
                  scrollEnabled={false}
                  showPageIndicator>
                  <View key="1" style={tw.style('bg-[#F9F8FE]')}>
                    <>
                      <Page title="What do you want us to call you?">
                        <NameAndSurName />
                      </Page>
                      <Footer
                        rightButtonLabel="Next"
                        rightButtonPress={() => {
                          handlePageChange(1, '2. Email or Telphone');
                        }}
                      />
                    </>
                  </View>
                  <View key="2" style={tw.style('bg-[#F9F8FE]')}>
                    <>
                      <LoginMode
                        title="Comment pouvons-nous vous contacter?"
                        isByPhone={isByPhone}
                        setISByPhone={setISByPhone}
                        email={email}
                        setEmail={setEmail}
                        setPhoneNumber={setPhoneNumber}
                      />

                      <Footer
                        rightButtonLabel="Next"
                        rightButtonPress={() => {
                          handlePageChange(2, '3. Validate Phone');
                        }}
                      />
                    </>
                  </View>
                  <View key="3" style={tw.style('bg-[#F9F8FE]')}>
                    <Page
                      title={
                        isByPhone
                          ? 'Tapez le code à six chiffres  reçu par SMS'
                          : ''
                      }
                    />
                    {isByPhone ? (
                      <PinCode
                        handlePageChange={() => {
                          handlePageChange(3, '2. Nommez votre Boutique');
                        }}
                      />
                    ) : (
                      <Email />
                    )}
                    {!isByPhone && (
                      <Footer
                        rightButtonLabel="Next"
                        rightButtonPress={() => {
                          handlePageChange(3, '2. Nommez votre Boutique');
                        }}
                      />
                    )}
                  </View>
                  <View key="4" style={tw.style('bg-[#F9F8FE]')}>
                    <Page title="Parlez-nous de votre boutique">
                      <YourShop />
                    </Page>
                    <Footer
                      rightButtonLabel="Next"
                      rightButtonPress={() => {
                        handlePageChange(4, '4. Emplacement ');
                      }}
                    />
                  </View>
                  <View key="5" style={tw.style('bg-[#F9F8FE]')}>
                    <MapLocation
                      setWordGps={(e: string) => setWordGps(e)}
                      handlePageChange={() =>
                        handlePageChange(5, '5. Creer code pin')
                      }
                    />
                    {/* <Footer
                rightButtonLabel="Next"
                rightButtonPress={() => {
                  handlePageChange(5, '5. Creer code pin');
                }}
              /> */}
                  </View>
                  <View key="6">
                    <Page title="Vous pouvez utiliser ce code PIN pour vous connecter à Bip PoS" />
                    <CreateShop
                      isByPhone={isByPhone}
                      createUser={() => formik.handleSubmit()}
                    />
                  </View>
                </AnimatedPagerView>
              </KeyboardAvoidingView>
              <View
                style={tw.style(
                  'text-2xl tracking-wide flex-row absolute bottom-5',
                  {
                    justifyContent: 'flex-start',
                  },
                )}>
                <Icon
                  name="primitive-dot"
                  style={tw.style(
                    'text-2xl tracking-wide px-2 text-[#DFE5E8]',
                    {
                      'text-[#01B6EB]': currentStep >= 0,
                    },
                  )}
                />
                <Icon
                  name="primitive-dot"
                  style={tw.style(
                    'text-2xl tracking-wide px-2 text-[#DFE5E8]',
                    {
                      'text-[#01B6EB]': currentStep > (1 || 2),
                    },
                  )}
                />
                <Icon
                  name="primitive-dot"
                  style={tw.style(
                    'text-2xl tracking-wide px-2 text-[#DFE5E8]',
                    {
                      'text-[#01B6EB]': currentStep > (3 || 4),
                    },
                  )}
                />
                <Icon
                  name="primitive-dot"
                  style={tw.style(
                    'text-2xl tracking-wide px-2 text-[#DFE5E8]',
                    {
                      'text-[#01B6EB]': currentStep >= (5 || 6),
                    },
                  )}
                />
              </View>
            </SafeAreaView>
          </>
        )}
      </Formik>
    </>
  );
};

const IntroOnboarding = ({navigation}: Props) => {
  console.log('isCurrent', realmApp.currentUser?.id);
  return (
    <SafeAreaView style={tw.style('flex-1 relative')}>
      <Onboarding
        onSkip={() => navigation.navigate('Registration')}
        onDone={() => navigation.navigate('Registration')}
        pages={[
          {
            backgroundColor: '#01b6eb',
            image: <Image source={require('../../assets/biplogo.png')} />,
            title: 'WELCOME',
            subtitle: '',
          },
          {
            backgroundColor: '#01b6eb',
            image: <Image source={require('../../assets/biplogo.png')} />,
            title: 'BIP POS',
            subtitle: 'Get started',
          },
        ]}
      />
      {/* <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../../assets/bip.png')}
      />
      <View style={tw.style(' items-center absolute bottom-10 right-4')}>
        <TouchableOpacity
          style={tw.style('text-2xl w-50  items-center p-4 bg-accent')}
          onPress={() => navigation.navigate('Registration')}>
          <Text style={tw.style('text-black')}>Begin</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

function OnboardingStack() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={({route}) => ({
        headerShown: route.name !== 'Onboarding',
      })}>
      <Stack.Screen name="Registration">
        {props => {
          const {navigation, route} = props;
          return (
            <OnboardingRegistration navigation={navigation} route={route} />
          );
        }}
      </Stack.Screen>
      {/* <Stack.Screen name="Registration" component={OnboardingRegistration} /> */}
      <Stack.Screen name="Onboarding" component={IntroOnboarding} />
    </Stack.Navigator>
  );
}

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: '#fc0',
//     flex: 1,
//     alignSelf: 'stretch',
//   },
//   title: {
//     fontSize: 20,
//     color: 'blue',
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: 'purple',
//     fontWeight: 'bold',
//   },
// });

export default OnboardingStack;
