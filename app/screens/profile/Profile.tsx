import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from 'react-native-animatable';
import database, { firebase } from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

import { AppBar } from '../../componants/AppBar'
import Images from '../../config/Images.d';
import { colors } from '../../config/styles';
import Icon from 'react-native-vector-icons/EvilIcons';
import { showInstructionsSlideUpPanel, showSlideUpPanelEditUserName, showSlideUpPanelLogout } from '../../utils/utils';
import { changeAdvanceLessonInfo, changeBasicLessonInfo, changeIntermediateLessonInfo, changeMesteryLessonInfo, getAdvanceLessionInfo, getBasicLessionInfo, getIntermediateLessionInfo, getMestryLessionInfo } from '../lessons/LessonSlice';
import { chnageUsername, changeIsLogin } from '../onboarding/Login/LoginSlice';
import { RootState } from '../../store';

import { getVersionInfo } from '../../slices/CommonSlice'
import { HELP_SECTION_TEXT } from '../../utils/constants';


const { width, height } = Dimensions.get('window');


const Profile = (props: any) => {
  const dispatch = useDispatch<any>();
  const [versionNumber, setVersionNumber] = useState('');
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const { username } = useSelector((state: RootState) => (state.login));
  const { isConnectedInternet, versionInfo } = useSelector((state: RootState) => state.common);

  const [loaded, setLoaded] = useState(false);

  const interstitial = InterstitialAd.createForAdRequest(HELP_SECTION_TEXT, {
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

    
  useFocusEffect(
    useCallback(() => {

      const onValueChange = database()
        .ref('/version')
        .on('value', snapshot => {
          console.log('User data: ', snapshot.val());
          setVersionNumber(snapshot.val())
        });

      if (versionInfo?.version === versionNumber) {
        setIsUpdateAvailable(false)
      } else {
        setIsUpdateAvailable(true)
      }

      console.log("kkkkkk", versionInfo?.version, "pppppp", versionNumber)

      return () => database().ref(`/version`).off('value', onValueChange);
    }, [versionNumber])
  )





  const clickEditName = () => {
    showSlideUpPanelEditUserName(
      'Edit Username',
      colors.blackColor,
      'Enter your name here',
      true,
      'Cancel',
      () => {
        //setUsername('');
      },
      'Edit',
      () => {
        //setUsername('');
      },
      Images.Face,
      true,
      false,
      username,
      (value: string) => {
        //setUsername(value);
        console.log("value11", value)
      },
    )

    if (loaded) {
      interstitial.show()
    }
  }


  const okPresslogoutBtn =() =>{
    var arrray: any =[]
    dispatch(changeAdvanceLessonInfo(arrray))
    dispatch(changeBasicLessonInfo(arrray))
    dispatch(changeMesteryLessonInfo(arrray))
    dispatch(changeIntermediateLessonInfo(arrray))
    dispatch(chnageUsername(''))
    dispatch(changeIsLogin(false))
    
  }

  const logoutClick = () => {
    showSlideUpPanelLogout(
      'Logout',
      colors.blackColor,
      'If you log out, all of your completed lesson data will be cleared as well.',
      true,
      'Cancel',
      () => {


        if (loaded) {
          interstitial.show()
        }
      },
      'OK',
      () => {
        okPresslogoutBtn()
        if (loaded) {
          interstitial.show()
        }
      },
      Images.Logout,
    )

  
  }


  const onPressUpdate =()=>{

    if (isConnectedInternet) {
      dispatch(getVersionInfo())
      dispatch(getBasicLessionInfo());
      dispatch(getIntermediateLessionInfo());
      dispatch(getAdvanceLessionInfo());
      dispatch(getMestryLessionInfo());

      if (loaded) {
        interstitial.show()
      }
      
    }
  
  }

  const renderSubmitButton = () => {
    return (
      <View style={styles.nextBtnRoot}>
        <View style={styles.nxtBtnMain}>
          <TouchableOpacity
            style={[styles.nextBtnStyles, { backgroundColor: isUpdateAvailable ? colors.btnFillColor : colors.gray }]}
            onPress={() => onPressUpdate()}
            disabled={!isUpdateAvailable}>
            <Text style={styles.nextBtnTextStyles}>{'Update'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  const pressHelp =()=>[
    showInstructionsSlideUpPanel(
      'Help',
      colors.blackColor,
      HELP_SECTION_TEXT,
      false,
      Images.FullImg,
      () => {
        if (loaded) {
          interstitial.show()
        }
      },
      'OK',
      false,
      true,
      3
  )
  ]

  return (
    <SafeAreaView style={styles.root}>
      <AppBar
        navigation={props.navigation}
        isShowBack={false}
        title={'Profile'}
      />
      <View style={styles.header}>
        <Image source={Images.Face} style={styles.imgStyles} />
        <View style={{ paddingTop: 50 }}>
          <Text style={{ padding: 10, fontSize: 16, color: colors.blackColor, fontFamily: 'Quicksand-Bold' }}>Welecome to vocab Master</Text>
          <View style={{ padding: 10, flexDirection: 'row', alignSelf: 'center', backgroundColor: colors.white, justifyContent: 'center', borderRadius: 15 }}>
            <View style={{ flex: 2 }}>
              <Text style={{ fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'center', color: colors.blackColor }}>{username}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Icon
                name="pencil"
                size={30}
                color={colors.blackColor}
                onPress={() => {
                  clickEditName()
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ padding: 10, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', marginTop: (height * 10) / 100 }}>
          <Text style={{ fontSize: 20, fontFamily: 'Quicksand-Bold', textAlign: 'center', textDecorationLine: 'underline', color: colors.blackColor }} onPress={() => logoutClick()}>Logout</Text>
        </View>
      </View>

      <View>

        {isUpdateAvailable ?
          <View style={styles.updateContainer}>
            <Text style={styles.updateTextMain}>New Update is available</Text>
            <Text style={styles.textUpdateStyles}>Step 1: Go to playstore and update your app first</Text>
            <Text style={styles.textUpdateStyles}>Step 2: Click the Update button</Text>
          </View>

          :
          <View style={styles.updateContainer}>
            <Text style={styles.noUpdateTextMain}>No new updates available yet</Text>

          </View>


        }

        {renderSubmitButton()}


        <View style={{alignItems:'center', paddingTop: (height*14)/100}}>
          <TouchableOpacity onPress={()=>pressHelp()}>
            <Text style={{color:colors.blackColor, textDecorationLine: 'underline',fontFamily: 'Quicksand-Bold', fontSize: 16}}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, position: 'relative' },
  header: {
    width: '100%',
    height: height / 2.5,
    padding: 30,
    backgroundColor: colors.primaryColor1,
    position: 'relative',
  },
  imgStyles: {
    position: 'absolute',
    opacity: 0.2,
    top: 40,
    left: 50,
    borderRadius: 200,
    width: 300,
    height: 300,
  },
  nextBtnStyles: {
    marginTop: 20,
    width: '100%',

    padding: 10,
    borderRadius: 35,
  },
  nextBtnTextStyles: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
    paddingLeft: width / 6,
    paddingRight: width / 6,
  },
  nextBtnRoot: {
    // height: 85,
    // flex: 6,
    paddingLeft: 30,
    paddingRight: 30,
    bottom: 10,
    borderColor: '#555555',
    borderWidth: 0,
    borderRadius: 0,
    // marginTop: 200,
    justifyContent: 'space-between',
  },
  nxtBtnMain: {
    paddingBottom: 10,
  },
  textUpdateStyles:{ color: colors.blackColor, textAlign:'left',paddingLeft: 20 ,fontFamily: 'Quicksand-Bold', },
  updateTextMain:{ color: colors.red,alignSelf:'center', padding: 10,fontFamily: 'Quicksand-Bold'  },
  updateContainer:{  justifyContent:'center',marginTop: (height * 10) / 100, paddingBottom: (height * 4) / 100 },
  noUpdateTextMain:{ color: colors.blackColor,alignSelf:'center', padding: 10,fontFamily: 'Quicksand-Bold'  },
});

export default Profile


