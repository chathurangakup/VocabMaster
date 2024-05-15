import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, TextInput } from 'react-native';
import BottomSheet, { BottomSheetModal, BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { colors } from '../config/styles';
import CustomButton from './CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { changeSlideUpObj } from '../slices/CommonSlice';
import { chnageUsername, changeIsLogin } from '../screens/onboarding/Login/LoginSlice'

const { width, height } = Dimensions.get('window');

const SideUpPanel = (props: any) => {
  const { slideUpPanelConfig } = useSelector((state: RootState) => state.common);
  const snapPoints = useMemo(() => ['25%', '50%', '75%','90%', '100%'], [])
  const { username } = useSelector((state: RootState) => (state.login));

  const [usernameText, setUsername] = useState(username);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const dispatch = useDispatch<any>();

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  useEffect(() => {
    console.log("slideUpPanelConfig pPpppppp  9999", slideUpPanelConfig?.payload?.snapToIndexValue)
    // Update the document title using the browser API
    if (slideUpPanelConfig?.payload?.visible == true) {
      bottomSheetRef.current?.snapToIndex(slideUpPanelConfig?.payload?.snapToIndexValue ==undefined ? -1 : slideUpPanelConfig?.payload?.snapToIndexValue);
    }
    setUsername(username);
  }, [slideUpPanelConfig]);


  const onPressLeft = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    dispatch(changeSlideUpObj({
      type: 'HIDE_BOTTOM_ALERT',
    }));

    if (slideUpPanelConfig?.payload?.isShowTextInput) {
      if (usernameText !== '') {
        setUsername(username)
      }
    }

    slideUpPanelConfig?.payload?.onPressLeft();
  };



  const onPressRight = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }

    if (slideUpPanelConfig?.payload?.isShowTextInput) {
      if (usernameText !== '') {
        dispatch(chnageUsername(usernameText));
      }
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

  const onChangeUsername =(value: string)=>{
    console.log(value)
    setUsername(value)
  
    slideUpPanelConfig?.payload?.onChangeUsername(value)
  }

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
            style={[styles.mainItemImgStyle,{width:  slideUpPanelConfig?.payload?.widthAddedFoeImage? width / 1.5 : width / 2.6, height:slideUpPanelConfig?.payload?.widthAddedFoeImage?  height / 4.5   : height / 5}]}
            source={slideUpPanelConfig?.payload?.imgName}
          />
        </View>
        {slideUpPanelConfig?.payload?.IsShowcorrectNumberOfAnswers == false ?
          null
          :
          <View>
            <Text style={{ color: 'black', alignSelf: 'center', fontSize: 16, fontFamily: 'Quicksand-Medium' }}>
              Number of correct Answers  : <Text style={[styles.ansNumStyle, { color: slideUpPanelConfig?.payload?.colorcorrectNumberOfAnswers == '' ? colors.blackColor : slideUpPanelConfig?.payload?.colorcorrectNumberOfAnswers }]}>{slideUpPanelConfig?.payload?.correctNumberOfAnswers}</Text>
            </Text>
          </View>
        }

        <Text style={styles.msgStyle}>
          {slideUpPanelConfig?.payload?.msg}
        </Text>

        {slideUpPanelConfig?.payload?.isShowTextInput  ?
          <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            value={usernameText}

            placeholder="Enter Username"
            maxLength={20}
          />
          : null
        }

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

                onPress={() => onPressLeft()}
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
    

    borderRadius: 10,

  },
  titleSetle: { fontWeight: 'bold', fontSize: 22,fontFamily:'Quicksand-Medium'},
  ansNumStyle:{fontSize:20},
  msgStyle:{ color: 'black', alignSelf: 'center', paddingLeft: (height*5)/100,paddingRight:(height*5)/100, paddingTop:(height*5)/100, fontFamily:'Quicksand-Medium', fontSize:18 },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    color:colors.blackColor,
   
  },
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
    isShowTextInput: false,
    IsShowcorrectNumberOfAnswers: false,
    okText: null,
    okFn: () => { },
    btnCancel: () => { },
    twoButtons: false,
    initUsername:'',
    leftBtnText: 'CANCEL',
    onPressLeft: () => { },
    rightBtnText: '',
    onPressRight: () => { },
    okBtnText: '',
    okPress: () => { },
    onChangeUsername:() =>{},
    widthAddedFoeImage: false,
    snapToIndexValue: 0
  },
};

export default SideUpPanel;

