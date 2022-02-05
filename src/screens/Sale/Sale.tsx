import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useFocusEffect} from '@react-navigation/native';
import CustomHeader from '../../screens/components/CustomHeader';
import CheckList from '../components/CheckList';
import {useTopBarMenu} from '../../providers/TopBarMenuProvider';

import tw from '../../../tailwind';

const items = [
  {id: '1', name: 'Pick n Pay', code: '#1abc9c', isChecked: false},
  {id: '2', name: 'EMERALD', code: '#2ecc71', isChecked: false},
  {id: '3', name: 'Pick n Pay', code: '#1abc9c', isChecked: false},
];

type SaleProps = {
  navigation: any;
  isHome: boolean;
  route: any;
  setIsSelected: any;
  isSelected: boolean;
};

const SecondRoute = () => (
  <ScrollView style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderTabBar = props => (
  <TabBar
    labelStyle={tw.style(' text-dark justify-start content-start items-start')}
    {...props}
    indicatorStyle={tw.style('bg-blue')}
    style={tw.style(' bg-white justify-start')}
  />
);

const Sale: React.FC<SaleProps> = ({
  navigation,
  route,
  setIsSelected,
  isSelected,
}) => {
  const [showRegisterInput, setShowRegisterInput] = useState(false);
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const [routes] = React.useState([
    {key: 'first', title: 'REGULAR PRODUCTS'},
    {key: 'second', title: 'UNIVERSAL SHOP'},
  ]);
  const {setMenu} = useTopBarMenu();

  const menuData = useMemo(
    () => [
      {
        label: 'Open register',
        value: '1',
        icon: 'album',
        method: () => {
          console.log('open');
        },
      },
      {label: 'Show Ushop', value: '2', icon: 'ushop', method: () => ({})},
      {label: 'Add clients', value: '3', icon: 'profile', method: () => ({})},
      {
        label: 'Park Sale',
        value: '4',
        icon: 'retrievesale',
        method: () => ({}),
      },
      {
        label: 'Retrieve Sale',
        value: '5',
        icon: 'retrievesale',
        method: () => ({}),
      },
      {label: 'Settings', value: '11', icon: 'settings', method: () => ({})},
    ],
    [],
  );

  useFocusEffect(
    React.useCallback(() => {
      setMenu(menuData);

      return () => {
        setMenu([]);
      };
    }, [setMenu, menuData]),
  );

  const FirstRoute = () => {
    //   const [flexWrap, setFlexWrap] = useState('wrap');
    const select = () => {
      setIsSelected((prev: boolean) => !prev);
    };
    return (
      <FlatList
        contentContainerStyle={tw.style(' px-3')}
        data={items}
        keyExtractor={item => item.id} //has to be unique
        renderItem={() => (
          <Pressable
            onPress={() => select()}
            style={tw.style('w-150px h-150px mx-3 mb-3 px-3 py-3 rounded')}>
            <ImageBackground
              source={require('../../assets/images/capachino2.png')}
              resizeMode="cover"
              style={tw.style('w-126px h-126px rounded p-10')}>
              {/* <View
                style={tw.style(' absolute w-full h-full rounded', {
                  backgroundColor: 'rgba(1, 182, 235, 0.6)',
                })}>
                <Text>check</Text>
              </View> */}
            </ImageBackground>
            <View>
              <Text>cuppuchino</Text>
            </View>
          </Pressable>
        )} //method to render the data in the way you want using styling u need
        horizontal={false}
        numColumns={2}
      />
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <>
      <SafeAreaView style={tw.style('flex-1 bg-[#E5E9F2]')}>
        <CustomHeader
          navigation={navigation}
          isHome={true}
          route={route}
          onSelect={() => {}}
        />
        <View>
          <View style={tw.style('m-5')}>
            <TextInput
              placeholder="Сhercher un produit par nom, code..."
              style={tw.style(
                'rounded bg-[#FFFFFF] w-full text-lg font-mulish border border-[#EDEEF0]',
              )}
            />
          </View>
          <View style={tw.style('bg-blue')}>
            <View style={tw.style('m-5')}>
              {showRegisterInput ? (
                <View style={tw.style('')}>
                  <Text
                    style={tw.style(
                      'text-white text-sm ml-5 leading-5 tracking-wide',
                    )}>
                    SAISIR LE MONTANT A L’OUVERTURE
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
                <View style={tw.style('m-5')}>
                  <TextInput
                    keyboardType="numeric"
                    style={tw.style(
                      'rounded bg-[#FFFFFF] w-full text-2xl font-mulish border border-[#EDEEF0]',
                    )}
                  />
                </View>
              )}

              <Pressable
                onPress={() => setShowRegisterInput(true)}
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
        <View style={tw.style('flex-1')}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
          />
        </View>
        {isSelected && (
          <View
            style={tw.style(
              'absolute border border-[#EDEEF0] items-center w-full h-50px bg-[#EDEEF0] bottom-0',
            )}>
            <Text
              style={tw.style(
                'm-auto text-blue text-sm font-medium leading-5',
              )}>
              Ajouter un Client
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default Sale;
