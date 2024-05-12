import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetModal, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { colors } from '../config/styles';
import CustomButton from './CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { changeSlideUpObj } from '../slices/CommonSlice';

const { width, height } = Dimensions.get('window');

const SideUpPanel = (props: any) => {
  const { slideUpPanelConfig } = useSelector((state: RootState) => state.common);
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], [])


  const bottomSheetRef = useRef<BottomSheet>(null);
  const dispatch = useDispatch<any>();

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  useEffect(() => {
    console.log("slideUpPanelConfig pPpppppp", slideUpPanelConfig?.payload)
    // Update the document title using the browser API
    if (slideUpPanelConfig?.payload?.visible == true) {
      bottomSheetRef.current?.snapToIndex(2);
    }
  }, [slideUpPanelConfig]);


  const handleClose = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    slideUpPanelConfig?.payload?.onPressLeft();
  };

  const handleClosed = () => {
    dispatch(changeSlideUpObj({
      type: 'HIDE_BOTTOM_ALERT',

    }));

    // if (modalizeRef.current) {
    //   modalizeRef.current.close();
    // }
  };

  const onPressRight = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }

    // props.hideSlidUpPanel();
    slideUpPanelConfig?.payload?.onPressRight();
  };

  const okPress = () => {

    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    dispatch(changeSlideUpObj({
      type: 'HIDE_BOTTOM_ALERT',
    }));

    slideUpPanelConfig?.payload?.okPress();

  };

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  // renders
  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={-1}
      animateOnMount={true}
      animationConfigs={animationConfigs}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.contentContainer}>

        <View style={{ paddingBottom: 50, paddingTop: 20, alignItems: 'center' }}>
          <Text style={[styles.titleSetle, { color: slideUpPanelConfig?.payload?.titleColor == '' ? colors.blackColor : slideUpPanelConfig?.payload?.titleColor }]}>
            {slideUpPanelConfig?.payload?.title}
          </Text>
        </View>

        <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={styles.mainItemImgStyle}
            source={slideUpPanelConfig?.payload?.imgName}
          />
        </View>

        {slideUpPanelConfig?.payload?.correctNumberOfAnswers == '' ?
         null
          :
          <View>
          <Text style={{ color: 'black', alignSelf: 'center',fontSize: 16,fontFamily:'Quicksand-Medium' }}>
            Number of correct Answers  : <Text style={[styles.ansNumStyle,{color:slideUpPanelConfig?.payload?.colorcorrectNumberOfAnswers==''?colors.blackColor:slideUpPanelConfig?.payload?.colorcorrectNumberOfAnswers}]}>{slideUpPanelConfig?.payload?.correctNumberOfAnswers}</Text>
          </Text>
        </View>
          

        }

        <Text style={styles.msgStyle}>
          {slideUpPanelConfig?.payload?.msg}
        </Text>



        {slideUpPanelConfig?.payload?.twoButtons == true ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <View style={{ flex: 1, padding: 10 }}>

              <CustomButton
                buttonStyle={{
                  color: colors.blackColor,
                  backgroundColor: colors.gray,
                }}

                onPress={() => handleClose()}
                title={slideUpPanelConfig?.payload?.leftBtnText}
                disabled={false} />
            </View>

            <View style={{ flex: 1, padding: 10 }}>

              <CustomButton
                buttonStyle={{ color: colors.primaryColor2 }}
                onPress={() => onPressRight()}
                title={slideUpPanelConfig?.payload?.rightBtnText}
                disabled={false} />
            </View>
          </View>
        ) : (
          <View style={styles.okbtnStyle}>
            <CustomButton
              buttonStyle={{ color: colors.primaryColor2 }}
              onPress={() => okPress()}
              title={slideUpPanelConfig?.payload?.okBtnText}
              disabled={false} />
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>


  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 150,
  },
  okbtnStyle: {
    flex: 1,
    padding: 10,
    width: 200,
    paddingTop: (height*5)/100,
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',

  },
  mainItemImgStyle: {
    width: width / 2.6,
    height: height / 5,
    borderRadius: 10,

  },
  titleSetle: { fontWeight: 'bold', fontSize: 22,fontFamily:'Quicksand-Medium'},
  ansNumStyle:{fontSize:20},
  msgStyle:{ color: 'black', alignSelf: 'center', paddingLeft: (height*5)/100,paddingRight:(height*5)/100, paddingTop:(height*5)/100, fontFamily:'Quicksand-Medium', fontSize:18 }
});


SideUpPanel.defaultProps = {
  config: {
    alertType: 'TYPE_SUCCESS_POSITIVE_ALERT',
    visible: false,
    title: null,
    titleColor: '',
    correctNumberOfAnswers: '',
    colorcorrectNumberOfAnswers:'',
    msg: null,
    okText: null,
    okFn: () => { },
    btnCancel: () => { },
    twoButtons: false,
    leftBtnText: 'CANCEL',
    onPressLeft: () => { },
    rightBtnText: '',
    onPressRight: () => { },
    okBtnText: '',
    okPress: () => { },
  },
};

export default SideUpPanel;

