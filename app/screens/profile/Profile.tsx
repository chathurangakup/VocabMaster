import React, { useEffect } from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable';
import database, { firebase } from '@react-native-firebase/database';

import { AppBar } from '../../componants/AppBar'
import Images from '../../config/Images.d';
import { colors } from '../../config/styles';
import Icon from 'react-native-vector-icons/EvilIcons';


const { width, height } = Dimensions.get('window');

const Profile = (props:any) => {

  useEffect(()=>{
    //  firebase.initializeApp();
    const reference = firebase
    .app()
    .database('https://vocabmaster-a6dfd-default-rtdb.firebaseio.com/')
    .ref('versionName');


  // Stop listening for updates when no longer required
  // return () => database().ref(`key1`).off('value');

  },[])


  return (
    <SafeAreaView style={styles.root}>
    <AppBar
      navigation={props.navigation}
      isShowBack={false}
      title={'Profile'}
    />
     <View style={styles.header}>
        <Image source={Images.Face} style={styles.imgStyles} />
        <View style={{paddingTop: 50}}>
        <Text style={{padding:10,fontSize: 16,color: colors.blackColor, fontFamily:'Quicksand-Bold' }}>Welecome to vocab Master</Text>
        <View style={{padding:10, flexDirection:'row', alignSelf:'center', backgroundColor:colors.white,justifyContent:'center', borderRadius:15}}>
          <View style={{flex:2}}>
          <Text style={{fontSize: 20, fontFamily:'Quicksand-Bold', textAlign:'center',color: colors.blackColor}}>Uditha Chathuranga</Text>
          </View>
          <View style={{flex:1, alignItems:'flex-end'}}>
          <Icon
              name="pencil"
              size={30}
              color={colors.blackColor}
            />
          </View>
        </View>
        </View>
        <View style={{padding:10, flexDirection:'row', alignSelf:'center',justifyContent:'center', marginTop: (height*10)/100}}>
          <Text style={{fontSize: 20, fontFamily:'Quicksand-Bold', textAlign:'center', textDecorationLine: 'underline', color: colors.blackColor}}>Logout</Text>
        </View>
      </View>

      <View>
        <Text style={{color: colors.blackColor}}>hhh</Text>
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
    left:50,
    borderRadius: 200,
    width: 300,
    height: 300,
  },
});

export default Profile