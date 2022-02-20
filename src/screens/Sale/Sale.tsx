import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';


import React, { useEffect, useMemo, useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import CustomHeader from '../../screens/components/CustomHeader';
import CheckList from '../components/CheckList';
import { useTopBarMenu } from '../../providers/TopBarMenuProvider';
import Tick from '../../assets/images/Tick.svg';
import { useRegisterSession } from '../../providers/RegisterSession.provider';
import { setRegisterSession } from '../../store/registerSession';

import tw from '../../../tailwind';
import { useReduxDispatch, useReduxSelector } from '../../store';
import { useShops } from '../../providers/ShopProvider';

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const items = [
  { id: '1', name: 'Pick n Pay', code: '#1abc9c', isChecked: false },
  { id: '2', name: 'EMERALD', code: '#2ecc71', isChecked: false },
  { id: '3', name: 'Pick n Pay', code: '#1abc9c', isChecked: false },
];

type SaleProps = {
  navigation: any;
  isHome: boolean;
  route: any;
  setIsSelected: any;
  isSelected: boolean;
};

const SecondRoute = () => <ScrollView style={tw.style(' bg-white')} />;

const renderTabBar = props => (
  <TabBar
    labelStyle={tw.style(' text-dark justify-start content-start items-start')}
    {...props}
    indicatorStyle={tw.style('bg-blue')}
    style={tw.style('bg-[#E5E9F2] justify-start')}
  />
);

const Sale: React.FC<SaleProps> = ({
  navigation,
  route,
  setIsSelected,
  isSelected,
}) => {
  const [showRegisterInput, setShowRegisterInput] = useState(false);
  const [openingRegisterAmount, setOpeningRegisterAmount] =
    useState<string>('');
  const [showRegister, setShowRegister] = useState(true);
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const [routes] = React.useState([
    { key: 'first', title: 'REGULAR PRODUCTS' },
    { key: 'second', title: 'UNIVERSAL SHOP' },
  ]);
  const [data, setData] = useState<any>([]);
  const { setMenu } = useTopBarMenu();
  const { handleOpenRegisterSession, currentRegisterSession } =
    useRegisterSession();

  const { selectedShop } = useShops();

  const selectedRegisterSession = useReduxSelector(
    state => state.registerSession,
  );
  const dispatch = useReduxDispatch();

  const menuData = useMemo(
    () => [
      {
        label: 'Open register',
        value: '1',
        active: !currentRegisterSession,
        icon: 'album',
        method: () => {
          setShowRegisterInput(true)
        },
      },
      {
        label: 'close register',
        value: '1',
        active: !!currentRegisterSession,
        icon: 'album',
        method: () => {
          console.log("close register")
        },
      },
      {
        label: 'Show Ushop',
        active: true,
        value: '2',
        icon: 'ushop',
        method: () => ({}),
      },
      {
        label: 'Add clients',
        active: !!data.length,
        value: '3',
        icon: 'profile',
        method: () => navigation.navigate('AddClient', { data }),
      },
      {
        label: 'Park Sale',
        value: '4',
        icon: 'retrievesale',
        active: true,
        method: () => ({}),
      },
      {
        label: 'Retrieve Sale',
        value: '5',
        icon: 'retrievesale',
        active: true,
        method: () => ({}),
      },
      {
        label: 'Settings',
        active: true,
        value: '11',
        icon: 'settings',
        method: () => ({}),
      },
    ],
    [currentRegisterSession, data, navigation],
  );

  useFocusEffect(
    React.useCallback(() => {
      setMenu(menuData);

      return () => {
        setMenu([]);
      };
    }, [setMenu, menuData]),
  );

  useEffect(() => {
    if (data.length) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [data, setIsSelected]);

  const FirstRoute = () => {
    //   const [flexWrap, setFlexWrap] = useState('wrap');

    const OnCheckChange = checkItem => {
      if (currentRegisterSession) {
        const arr = [...data];
        const item = arr.findIndex(item => item._id === checkItem._id);
        if (item > -1) {
          arr.splice(item, 1);
          setData(arr);
          // can use a callback to update parent from here
        } else {
          setData((prev: any) => [...prev, checkItem]);
        }
      } else {
        console.log("No register open")
        // ToastAndroid.show('No register open!', ToastAndroid.SHORT);
        Toast.show('This is a toast.');
      }
    };

    const renderItem = ({ item }) => (
      <Pressable
        onPress={() => OnCheckChange(item)}
        style={tw.style('w-150px h-full  mx-3 mb-3 px-3 py-3 rounded')}>
        <ImageBackground
          source={require('../../assets/images/capachino2.png')}
          resizeMode="cover"
          style={tw.style('w-136px h-136px rounded relative')}>
          {!!data.find((element: any) => element._id === item._id) && (
            <View
              style={tw.style('relative w-136px h-136px rounded items-center', {
                backgroundColor: 'rgba(1, 182, 235, 0.6)',
              })}>
              <View
                style={tw.style(
                  'w-8 h-8 rounded-full items-center bg-white m-auto',
                )}>
                <View style={tw.style('items-center m-auto')}>
                  <Tick />
                </View>
              </View>
            </View>
          )}
        </ImageBackground>
        <View>
          <Text>{item.name}</Text>
        </View>
      </Pressable>
    );
    return (
      <FlatList
        contentContainerStyle={tw.style(' px-3')}
        data={selectedShop.products}
        keyExtractor={item => item._id} //has to be unique
        renderItem={renderItem} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
      />
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const createRegisterSession = async () => {
    if (showRegisterInput) {
      if (parseFloat(openingRegisterAmount) > 0) {
        try {
          const result = await handleOpenRegisterSession(
            parseFloat(openingRegisterAmount),
          );
          if (result) {
            await dispatch(
              setRegisterSession(
                JSON.parse(JSON.stringify(result, getCircularReplacer())),
              ),
            );
          }
        } catch (error) {
          console.log(error);
        }
      } else {setShowRegisterInput(false);}
    } else {
      setShowRegisterInput(true);
    }
  };

  return (
    <>
      <SafeAreaView style={tw.style('flex-1 bg-[#E5E9F2]')}>
        <CustomHeader
          navigation={navigation}
          isHome={true}
          route={route}
          onSelect={() => { }}
        />
        <View style={tw.style('m-5')}>
          <TextInput
            placeholder="Сhercher un produit par nom, code..."
            style={tw.style(
              'rounded bg-[#FFFFFF] w-full text-lg font-mulish border border-[#EDEEF0]',
            )}
          />
        </View>
        {showRegister && !currentRegisterSession && (
          <View>
            <View style={tw.style('bg-blue')}>
              <View style={tw.style('m-5')}>
                {showRegisterInput ? (
                  <View style={tw.style('')}>
                    <Text
                      style={tw.style(
                        'text-white text-sm ml-5 leading-5 tracking-wide',
                      )}>
                      {!openingRegisterAmount ? "SAISIR LE MONTANT A L’OUVERTURE" : "Opening float"}
                    </Text>
                  </View>
                ) : (
                  <View style={tw.style('m-auto')}>
                    <Text
                      style={tw.style(
                        'text-white text-sm my-6 leading-5 tracking-wide',
                      )}>
                      Votre caisse est actuellement fermée
                    </Text>
                  </View>
                )}

                {showRegisterInput && (
                  <>
                    <View style={tw.style('m-5')}>
                      <TextInput
                        onChangeText={setOpeningRegisterAmount}
                        value={openingRegisterAmount}
                        keyboardType="numeric"
                        style={tw.style(
                          'rounded bg-[#FFFFFF] w-full text-2xl border border-[#EDEEF0]',
                        )}
                      />
                    </View>
                  </>

                )}

                <Pressable
                  onPress={() => createRegisterSession()}
                  style={tw.style('h-14 bg-accent rounded mx-5')}>
                  {showRegisterInput ? (
                    <Text
                      style={tw.style(
                        'm-auto font-extrabold text-dark uppercase',
                      )}>
                      OUVRIR
                    </Text>
                  ) : (
                    <Text
                      style={tw.style(
                        'm-auto font-extrabold text-dark uppercase',
                      )}>
                      OUVRIR UNE CAISSE
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        )}

        <View style={tw.style('flex-1')}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
        {isSelected && (
          <Pressable
            onPress={() => navigation.navigate('AddClient', { data })}
            style={tw.style(
              'absolute border border-[#EDEEF0] items-center w-full h-50px bg-[#EDEEF0] bottom-2 mb-2',
            )}>
            <Text
              style={tw.style(
                'm-auto text-blue text-sm font-medium leading-5',
              )}>
              Ajouter un Client
            </Text>
          </Pressable>
        )}
      </SafeAreaView>
    </>
  );
};

// const styles = {
//   triangle: {
//       width: 0,
//       height: 0,
//       backgroundColor: 'transparent',
//       // borderStyle: 'solid',
//   },
//   arrowUp: {
//       borderTopWidth: 0,
//       borderRightWidth: 30,
//       borderBottomWidth: 30,
//       borderLeftWidth: 30,
//       borderTopColor: 'transparent',
//       borderRightColor: 'transparent',
//       borderBottomColor: "tomato",
//       borderLeftColor: 'transparent',
//   },
//   arrowRight: {
//       borderTopWidth: 30,
//       borderRightWidth: 0,
//       borderBottomWidth: 30,
//       borderLeftWidth: "tomato",
//       borderTopColor: 'transparent',
//       borderRightColor: 'transparent',
//       borderBottomColor: 'transparent',
//       borderLeftColor: "tomato",
//   },
//   arrowDown: {
//       borderTopWidth: 30,
//       borderRightWidth: 30,
//       borderBottomWidth: 0,
//       borderLeftWidth: 30,
//       borderTopColor: "tomato",
//       borderRightColor: 'transparent',
//       borderBottomColor: 'transparent',
//       borderLeftColor: 'transparent',
//   },
//   arrowLeft: {
//       borderTopWidth: 30,
//       borderRightWidth: "tomato",
//       borderBottomWidth: 30,
//       borderLeftWidth: 0,
//       borderTopColor: 'transparent',
//       borderRightColor: "tomato",
//       borderBottomColor: 'transparent',
//       borderLeftColor: 'transparent',
//   },
//   arrowUpLeft: {
//       borderTopWidth: 30,
//       borderRightWidth: "tomato",
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderTopColor: "tomato",
//       borderRightColor: 'transparent',
//       borderBottomColor: 'transparent',
//       borderLeftColor: 'transparent',
//   },
//   arrowUpRight: {
//       borderTopWidth: 0,
//       borderRightWidth: "tomato",
//       borderBottomWidth: 30,
//       borderLeftWidth: 0,
//       borderTopColor: 'transparent',
//       borderRightColor: "tomato",
//       borderBottomColor: 'transparent',
//       borderLeftColor: 'transparent',
//   },
//   arrowDownLeft: {
//       borderTopWidth: 30,
//       borderRightWidth: 0,
//       borderBottomWidth: 0,
//       borderLeftWidth: "tomato",
//       borderTopColor: 'transparent',
//       borderRightColor: 'transparent',
//       borderBottomColor: 'transparent',
//       borderLeftColor: "tomato",
//   },
//   arrowDownRight: {
//       borderTopWidth: 0,
//       borderRightWidth: 0,
//       borderBottomWidth: 30,
//       borderLeftWidth: "tomato",
//       borderTopColor: 'transparent',
//       borderRightColor: 'transparent',
//       borderBottomColor: "tomato",
//       borderLeftColor: 'transparent',
//   },
// }

export default Sale;
