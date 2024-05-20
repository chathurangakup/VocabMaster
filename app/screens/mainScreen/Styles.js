import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '../../config/styles';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    backgroundColor: 'white',
    top: 30,
    padding: 30,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  mainComp: {
    flex: 1,
    // paddingVertical: 40,
    // paddingHorizontal: 16,
   backgroundColor:colors.lightOrange,
    position: 'relative',
  },
  quectionTextStyle: {
    color: colors.blackColor,
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.6,
    marginTop:5
  },

  animatedbarStyle: {
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.primaryColor1,
    position: 'relative',
    flex:1
  },
  wrongAnsStyle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctAnsStyle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {color: colors.white, fontSize: 20},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
    // marginTop: 0,
    // width:width,
    // height:height/2,
  },
  modalView: {
    marginLeft: 20,
    marginRight: 20,

    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  eightyWidthStyle: {
    flexDirection: 'row',
    width: '80%',
    margin: 2,
  },
  uploadImage: {
    width: '80%',
    height: 300,
  },
  textAreaContainer: {
    borderColor: '#777',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    margin: 10,
  },
  textArea: {
    height: 150,
    width: width / 1.5,
    justifyContent: 'flex-start',
    color: 'black',
  },
  floatIconStyle: {
    color: colors.white,
    fontSize: 30,
  },
  renderOptMain: {flex: 5},
  renderOptMainFont: {fontSize: 15},
  quectionOpt: {width: width / 1.3, height: 150},
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
  reviewBtnStyles: {
    marginTop: 30,
    width: '100%',
    backgroundColor: colors.secondaryColor2,
    padding: 10,
    borderRadius: 35,
  },
  reviewBtnTextStyles: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
  },
  inProgressTxtstyle: {color: colors.white, fontSize: 16, opacity: 0.6, color:colors.blackColor},
  InprogressAnimated: {
    width: '100%',
    height: 50,
    borderRadius: 30,
    backgroundColor: colors.lightTeal,
    marginTop: 5,
   
  },
  floatActionStyle: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    right: 0,
    width: 70,
    height: 70,
    alignSelf: 'flex-end',
    backgroundColor: colors.primaryColor1,
    borderWidth: 0,
    margin: 20,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentModelImgStyle: {
    color: 'black',
    width: width / 2,
    height: height / 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  ModalizeModelStyles: {
    padding: 10,
    // backgroundColor: colors.primaryColor2,
    margin: 20,
    alignItems: 'center',
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
  reviewBtnMain: {
    flex: 1,
  },
  noReviews: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  camOrlibStyles: {
    height: 30,
    backgroundColor: colors.secondaryColor2,
    margin: 10,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
  },
  camOrlibTextStyles: {
    color: colors.white,
  },
  ModalizeTextStyle: {
    color: 'black',
    alignSelf: 'center',
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  reviewRoot: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  reviewImgStyles: {
    color: 'black',
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  reviewImgStyle2: {
    color: 'black',
    width: width / 2,
    height: height / 6,
  },
  rootModel: {
    // backgroundColor: colors.primaryColor1,
    marginTop: height / 3,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },

  rootModalTextWrap: {
    backgroundColor: colors.primaryColor1,
    width: '90%',
    borderRadius: 20,
    opacity: 1,
    padding: 20,
    alignItems: 'center',
  },
  rootModalTextWrap2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20,
  },
  quectionCountStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.blackColor,
  },
  progressbarmainComp: { marginTop: 60, marginLeft: 20, marginRight: 20, flexDirection: 'row' },
  timerStyle:{ fontSize: 30, fontWeight: 'bold', fontFamily:'Raleway-LightItalic', color:colors.blackColor },
  renderViewStyle:{ flex: 1, backgroundColor: 'white', height: height / 1.75, margin: 15, borderRadius: 10, opacity:0.9},
  speakerMainStyle:{ width: (height*10)/100, height: (height*10)/100, marginRight: (width * 5) / 100, justifyContent:'center', alignItems:'center', borderRadius: 40 },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
