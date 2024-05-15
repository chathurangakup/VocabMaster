import React from 'react'
import { ImageBackground, SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';

import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

import Images from '../../config/Images.d';
import Lottie from '../../config/Lottie';
import { colors } from '../../config/styles';

const { width, height } = Dimensions.get('window');

const Splash = (props: any) => {

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={Images.Welcome}
        resizeMode="cover"
        style={styles.mainComp}>
        <View style={{ flex: 1 }}>
          <LottieView source={Lottie.Welcome} style={{ flex: 1 }} autoPlay loop />
        </View>

        <View style={{ padding: 30 }}>
          <View style={{ paddingBottom: 70 }}>
            <Text
              style={{
                fontSize: 30,
                color: colors.blackColor,
                width: width / 2,
                fontFamily: 'Raleway-SemiBold'
              }}>
              Grow your Vocabulary & Level Up with
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{ fontSize: 45, color: colors.blackColor, fontFamily: 'Raleway-BoldItalic' }}>
                VOCAB MASTER
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', flex: 1, paddingBottom: 40 }}>
            <View style={{ flexDirection: 'row', paddingTop: 10, flex: 1 }}>
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
            <AnimatedTouchable onPress={() => props.navigation.navigate('login')}>
              <Animatable.View
                animation="slideInDown"
                duration={2000}
                style={{
                  borderRadius: 10,
                  backgroundColor: colors.white,
                  width: width / 2.5,
                  height: height / 15,
                  justifyContent: 'center',
                  alignItems: 'center',

                }}>

                <Text style={{ color: 'black', fontSize: 22, fontFamily: 'Raleway-SemiBold' }}>Next</Text>

              </Animatable.View>
            </AnimatedTouchable>

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