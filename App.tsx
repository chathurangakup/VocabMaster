/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';


import {
  navigationRef,
  routeNameRef,
  onNavigationStateChange,
} from './app/routes/NavigationHelper';
import Root from './app/screens/Root';

import { persistor, store } from './app/store'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';


function App(): React.JSX.Element {
 
  return (
    <Provider store={store}>
      <BottomSheetModalProvider>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{ flex: 1 }}>
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
          </View>
        </PersistGate>
      </BottomSheetModalProvider>
    </Provider>
  );
}


export default gestureHandlerRootHOC(App);
