import React, { useEffect, useState } from 'react'
import { View ,Text, Animated, Dimensions, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { MainStack, Onboarding } from '../routes/NavigationStack';
import { RootState } from '../store';
import { useDispatch,useSelector } from 'react-redux';
import { LoadingSpinner } from '../componants/LoadingSpinner';
import SideUpPanel from '../componants/SideUpPanel';
import { colors } from '../config/styles';
import {changeInternetConnectionStatus} from '../slices/CommonSlice'


const { width, height } = Dimensions.get('window');

const Root = () => {
  const dispatch = useDispatch<any>();

  const { username} = useSelector((state: RootState) => ( state.login));
  const { loading} = useSelector((state: RootState) => ( state.common));

  const [isInternetConnected, setIsInternetConnected] = useState(true);
  let fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(
      // Animate over time
      fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1000, // Make it take a while
        useNativeDriver: true,
      },
    ).start();

    NetInfo.addEventListener(state => {
      handleConnectionChange(state.isConnected);
    });

    return () => {
      NetInfo.fetch().then(state => {
        console.log('Is connected?', state.isConnected);
        handleConnectionChange(state.isConnected);
      });
    };
  })

  const handleConnectionChange = (isConnected: boolean) => {
    setIsInternetConnected(isConnected);
    dispatch(changeInternetConnectionStatus(isConnected))

  };

  const _renderNoInternet = () => {
    if (!isInternetConnected) {
      return (
        <Animated.View // Special animatable View
          style={{
            ...styles.animateBox,
            opacity: fadeAnim, // Bind opacity to animated value
          }}>
          <View style={styles.noInternet}>
            {/* <FastImage style={styles.noInternetIco} source={icons.noInternet} /> */}
            <Text style={styles.noInternetText}> No Internet</Text>
          </View>
        </Animated.View>
      );
    }
  };


  return (
    <View style={{flex:1}}>
        <LoadingSpinner showLoading={loading} />
       {username!==""  ? <MainStack/>:  <Onboarding /> }
       <SideUpPanel/>
       {_renderNoInternet()}
    </View>
  )
}

const styles = StyleSheet.create({
  animateBox: {
    position: 'absolute',
    width: width - 40,
    bottom: 70,
    backgroundColor: '#7C7C7C',
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  noInternet: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noInternetText: {
    color: 'white',
    fontSize: 18,
  },
  noInternetIco: {
    width: 30,
    height: 30,
    color:colors.blackColor
  },
});


export default Root