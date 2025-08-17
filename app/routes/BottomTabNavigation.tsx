import  React,{ useEffect, useRef }  from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import HomeScreen from '../screens/home/Home';
import ProfileScreen from '../screens/profile/Profile';



import Icon,{Icons} from '../componants/Icons';
import {colors} from '../config/styles';


const Tab = createBottomTabNavigator();

const TabArr=[
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: HomeScreen },
  // { route: 'Levels', label: 'Battle Marks', type: Icons.Ionicons, icon: 'md-checkmark-done-circle', component: BattleMarks },
  { route: 'Profile', label: 'Profile', type: Icons.FontAwesome, icon: 'user-circle-o', component: ProfileScreen },
  // { route: 'Search', label: 'Search', type: Icons.MaterialCommunityIcons, activeIcon: 'timeline-plus', inActiveIcon: 'timeline-plus-outline', component: ColorScreen },
  // { route: 'Account', label: 'Account', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o', component: ColorScreen },
]

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } } as Animatable.CustomAnimation;
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } } as Animatable.CustomAnimation;

const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState?.selected;
  const viewRef = useRef<Animatable.View & { animate?: Function }>(null);
  const circleRef = useRef<Animatable.View & { animate?: Function }>(null);
  const textRef = useRef<Animatable.Text & { transitionTo?: Function }>(null);

  useEffect(() => {
    if (focused) {
      if (viewRef.current) viewRef.current.animate(animate1);
      if (circleRef.current) circleRef.current.animate(circle1);
      if (textRef.current) textRef.current.transitionTo({ transform: [{ scale: 1 }] });
    } else {
      if (viewRef.current) viewRef.current.animate(animate2);
      if (circleRef.current) circleRef.current.animate(circle2);
      if (textRef.current) textRef.current.transitionTo({ transform: [{ scale: 0 }] });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? colors.white : colors.primaryColor1} style={undefined} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

export const BottomTabs = () => {
  return (
    <Tab.Navigator
     // tabBar={(props) => <OffTripBottomTabContent {...props} onTrip={true} backBehavior='history'/>}
      initialRouteName="Home">
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
          
            options={{
              headerShown:false,
              tabBarShowLabel: false,
              tabBarButton: (props: any) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: colors.white,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor1,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.primaryColor1,
  }
})

