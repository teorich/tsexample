import {useUsers} from '../../providers/UserProvider';
import React from 'react';
import {
  Pressable,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CustomHeader from '../components/CustomHeader';

import tw from '../../../tailwind';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useReduxSelector} from '../../store';

interface UsersProps {
  navigation: any;
  isHome: boolean;
  route: any;
}

const FirstRoute = () => {
  const {users} = useUsers();

  return (
    <>
      <View
        style={tw.style('bg-[#FDFDFE] border border-[#EDEEF0] p-5 flex-row')}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Text>stuff member</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Text>hours logged</Text>
        </View>
      </View>
      <ScrollView
        style={tw.style('shadow-sm  flex-1', {
          flexDirection: 'column',
        })}>
        {users.map((user, index) => (
          <View
            key={index}
            style={tw.style(
              'bg-[#FDFDFE]  border border-[#EDEEF0] flex-1 p-5',
            )}>
            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
              <View
                style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
                <BouncyCheckbox
                  size={20}
                  fillColor="#01b6eb"
                  unfillColor="#FFFFFF"
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
                <Text>{user.person.first_name}</Text>
              </View>
              <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Text>B</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const SecondRoute = () => {
  const {users} = useUsers();
  return (
    <>
      <View
        style={tw.style('bg-[#FDFDFE] border border-[#EDEEF0] p-5 flex-row')}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Text>stuff member</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
          <Text>hours logged</Text>
        </View>
      </View>
      <ScrollView
        style={tw.style('shadow-sm  flex-1', {
          flexDirection: 'column',
        })}>
        {users.map((user, index) => (
          <View
            key={index}
            style={tw.style(
              'bg-[#FDFDFE]  border border-[#EDEEF0] flex-1 p-5',
            )}>
            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
              <View
                style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row'}}>
                <BouncyCheckbox
                  size={20}
                  fillColor="#01b6eb"
                  unfillColor="#FFFFFF"
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
                <Text>{user.person.first_name}</Text>
              </View>
              <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Text>B</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const renderTabBar = props => (
  <TabBar
    labelStyle={tw.style(' text-dark justify-start content-start items-start')}
    {...props}
    indicatorStyle={tw.style('bg-blue')}
    style={tw.style(' bg-white justify-start')}
  />
);

const LazyPlaceholder = ({ route }) => (
  <View style={tw.style(' items-center flex-1 justify-center')}>
    <Text>Loading {route.title}…</Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const Users: React.FunctionComponent<UsersProps> = ({
  navigation,
  isHome,
  route,
}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'By User'},
    {key: 'second', title: 'By Date'},
  ]);
  return (
    <ScrollView style={tw.style('flex-1 bg-[#E5E9F2]')}>
      <SafeAreaView style={{flex: 1}}>
        <CustomHeader
          navigation={navigation}
          isHome={isHome}
          route={route}
          onSelect={() => {}}
        />
        <View>
          <Pressable
            onPress={() => navigation.navigate('createUser')}
            style={tw.style(' mt-4 h-14 bg-accent rounded mx-5')}>
            <Text style={tw.style('m-auto font-extrabold text-dark')}>
              Ajouter un Utilisateur
            </Text>
          </Pressable>
          <View style={tw.style(' mt-4 mx-4')}>
            <Text>Aujourd’hui</Text>
          </View>
        </View>
        <View style={tw.style('mt-4  flex-1 rounded mx-2 mb-4 h-screen')}>
          <TabView
          lazy
          renderLazyPlaceholder={LazyPlaceholder}
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: layout.width}}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Users;
