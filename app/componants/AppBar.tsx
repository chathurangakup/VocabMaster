import React, { ReactNode, useEffect, useState } from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

import {colors} from '../config/styles';
import { BACKINS } from '../utils/constants';

export const AppBar = (props: {
  title: ReactNode; navigation: { goBack: () => void; navigate: (arg0: string) => void; }; isShowBack: any; 
}) => {

  const [loaded, setLoaded] = useState(false);

  const interstitial = InterstitialAd.createForAdRequest(BACKINS, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });




  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  

  const _backHandler = () => {
    if (!loaded) {

  }else{
    interstitial.show()
  }
  
   
    props.navigation.goBack();
  };


  return (
    <View style={styles.root}>
      <View
        style={[
          props.isShowBack
            ? [{backgroundColor: 'transparent'}, styles.bckBtnStyles,]
            : {backgroundColor: 'transparent',flex: 1},
        ]}>
        {props.isShowBack == false ? null : (
          <TouchableOpacity onPress={() => _backHandler()}>
            <Icon
              name="keyboard-backspace"
              size={30}
              color={colors.blackColor}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 5,alignItems:'center'}}>
        <Text style={styles.titleStyles}>{props.title}</Text>
      </View>
      <View style={{flex:1}}>

      </View>
    </View>
  );
};

AppBar.defaultProps = {
  profilePicImage: null,
  isShowBack: true,
  isShowProfile: true,
};

const styles = StyleSheet.create({
  profileStyle: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: colors.blackColor,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  titleStyles: {
    color: colors.blackColor,
    fontSize: 23,
    padding: 20,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Bold'
  },
  bckBtnStyles: {
    borderRadius: 50,
    width: 50,
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  root: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 9999,
  },
  image: {
    color: 'black',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
