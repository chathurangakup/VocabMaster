import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Splash from '../screens/onboarding/Splash';
import Login from '../screens/onboarding/Login/Login';

import Lessons from '../screens/lessons/Lessons';
import Profile from '../screens/profile/Profile';
import {BottomTabs} from './BottomTabNavigation'

const onboardingScreens: any = {
    splash: { screen: Splash },
    login: { screen: Login },
};

const signInScreens: any = {
    bottomTabs: {screen: BottomTabs},
    lessons: {screen: Lessons},
}


const Stack = createNativeStackNavigator();


export const MainStack = () => {
    let screens = [];
    for (let key in signInScreens) {
      if (signInScreens.hasOwnProperty(key)) {
        screens.push(
          <Stack.Screen
            key={key}
            name={key}
            component={signInScreens[key].screen}
          />,
        );
      }
    }
    return (
      <Stack.Navigator
        initialRouteName="bottomTabs"
        screenOptions={{
          gestureEnabled: false,
          headerShown: false,
        }}>
        {screens}
      </Stack.Navigator>
    );
  };


export const Onboarding = () => {
    let screens = [];
    for (let key in onboardingScreens) {
        if (onboardingScreens.hasOwnProperty(key)) {
            screens.push(
                <Stack.Screen
                    key={key}
                    name={key}
                    component={onboardingScreens[key].screen}/>,
            );
        }
    }
    return (
        <Stack.Navigator
            initialRouteName="splash"
            screenOptions={{
                gestureEnabled: false,
                headerShown: false,
            }
            }>
            {screens}
        </Stack.Navigator>
    );
};