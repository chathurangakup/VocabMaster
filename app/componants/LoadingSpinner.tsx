import React from 'react';
import {StyleSheet, View, Dimensions, Image, Text,Modal} from 'react-native';
import Lottie from '../config/Lottie';
import LottieView from 'lottie-react-native';
import {colors} from '../config/styles';
const {height, width} = Dimensions.get('window');

export const LoadingSpinner = (props: { showLoading: any; }) => {
  return (
    <View>
      {props.showLoading && (
         <Modal
         transparent={true}
         animationType={'none'}
         visible={props.showLoading}
         style={{ zIndex: 1100 }}
         onRequestClose={() => { }}>
        <View style={styles.mainBox}>
          <View style={styles.contentNoShadow}>
            <LottieView
              source={Lottie.Loading}
              autoPlay
              loop
              style={styles.loadingGif}
            />
           
          </View>
        </View>
        </Modal>
      )}
    </View>
  );
};
LoadingSpinner.defaultProps = {
  showLoading: true,
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    //  position:'absolute',
     zIndex: 1000,
   // paddingTop: 400,
    // width: 100,
    // height: 100,
  },
  contentNoShadow: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  loadingGif: {width: 100, height: 100},
  loadingText: {color: colors.white, fontSize: 15, paddingTop: 0},

});
