/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useDeviceContext } from 'twrnc';
import Home from './src/screens/Home/Home';
import store from './src/store';

import OnboardingScreen from './src/screens/Onboarding/Onboarding';
import tw from './tailwind';
import { AppContextProvider } from './src/util/contextProviderReducer/AppContextProvider';
import { realmApp } from './RealmConfig';


const Stack = createStackNavigator();

let persistor = persistStore(store);




const Loading = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#ffb300" />
    </View>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [completedOnboarding, setCompletedOnboarding] = useState(false);
  useDeviceContext(tw);

  const [user, setUser] = useState<any>(null);

  console.log(realmApp.currentUser?.id);

  // useEffect(() => {
  //   const init = async () => {
  //     // …do multiple sync or async tasks
  //   };

  //   init().finally(async () => {
  //     await RNBootSplash.hide({fade: true});
  //     console.log('Bootsplash has been hidden successfully');
  //   });
  // }, []);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@completedOnboarding');

      if (value && value !== null && value === 'true') {
        setCompletedOnboarding(true);
      }
    } catch (error) {
      console.log('Error @checkOnboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  useEffect(() => {
    const userId = realmApp.currentUser?.id;
    if (userId) {
      setUser({ id: userId });
    }
  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar backgroundColor="#01b6eb" />
          <Stack.Navigator
            key={String(loading)}
            initialRouteName={
              loading
                ? 'loading'
                : completedOnboarding
                  ? 'Home'
                  : 'OnboardingStart'
            }>

            <Stack.Screen options={{ headerShown: false }} name="Home">
              {props => {
                return <AppContextProvider><Home {...props} /></AppContextProvider>;
              }}
            </Stack.Screen>
            <Stack.Screen
              name="OnboardingStart"
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="loading"
              component={Loading}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;
