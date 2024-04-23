import React from 'react'
import { ImageBackground, SafeAreaView, View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';

import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

import Images from '../../config/Images.d';
import Lottie from '../../config/Lottie';
import {colors} from '../../config/styles';

const {width,height} = Dimensions.get('window');

const Splash = (props: any) => {



  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={Images.Welcome}
        resizeMode="cover"
        style={styles.mainComp}>
        <View style={{flex: 1}}>
          <LottieView source={Lottie.Welcome}  style={{flex:1}} autoPlay loop />
        </View>

        <View style={{padding: 30}}>
          <View style={{paddingBottom: 70}}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: colors.white,
                width: width / 2,
              }}>
              Grow your Vocabulary & Level Up with
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{fontSize: 45, fontWeight: 'bold', color: colors.white}}>
                VOC UP
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', flex: 1, paddingBottom: 40}}>
            <View style={{flexDirection: 'row', paddingTop: 10, flex: 1}}>
              <View
                style={{
                  width: 50,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                }}
              />
              <View
                style={{
                  width: 35,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                  opacity: 0.7,
                }}
              />
              <View
                style={{
                  width: 25,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                  opacity: 0.5,
                }}
              />
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                  opacity: 0.4,
                }}
              />
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                  opacity: 0.3,
                }}
              />
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: colors.white,
                  borderRadius: 20,
                  margin: 5,
                  opacity: 0.2,
                }}
              />
            </View>

            <Animatable.View
              animation="slideInDown"
              duration={1500}
              style={{
                borderRadius: 10,
                backgroundColor: colors.white,
                width: width/2,
                height: height/16,
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <TouchableOpacity onPress={()=> props.navigation.navigate('login')} >
               <Text style={{color:'black', fontSize:20}}>Next</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    mainComp: {
      flex: 1,
      paddingVertical: 40,
      paddingHorizontal: 16,
      position: 'relative',
    },
  });

export default Splash