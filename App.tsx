/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  navigationRef,
  routeNameRef,
  onNavigationStateChange,
} from './app/routes/NavigationHelper';
import Root from './app/screens/Root';

import { persistor, store } from './app/store'


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {/* <StatusBar backgroundColor={'red'} barStyle={'dark-content'} translucent={false} /> */}
            <NavigationContainer
              ref={navigationRef}
              onReady={() =>
              (routeNameRef.current =
                navigationRef.current.getCurrentRoute().name)
              }
              onStateChange={() => onNavigationStateChange()}>
              <Root />
            </NavigationContainer>
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}


export default App;
