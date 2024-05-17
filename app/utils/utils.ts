
import { changeSlideUpObj } from "../slices/CommonSlice";
import { SPELLING_MEANING_API } from "./constants";




export const fetchDataSpellingMeaningApi = async (word: string) => {

  
    console.log("SPELLING_MEANING_API", word)
    try {
     
      const response = await fetch(SPELLING_MEANING_API+word);
     
      const json = await response.json();
      console.log("responce json", json)
       //dispatch(changeLoadingStatus(false));
      return json
      
    //   setData(json);
    //   setIsLoading(false);
    } catch (error) {

      console.error('Error fetching data:', error);
    //   dispatch(changeLoadingStatus(false))
      return error
    //   setIsLoading(false);
    }
  };

  export const showSlideUpPanel = (
    title: any,
    titleColor:any,
    correctNumberOfAnswers:string,
    colorcorrectNumberOfAnswers: any,
    msg: any,
    twoButtons: any,
    imgName: any,
    okPress = () => {},
    okBtnText: any,
    IsShowcorrectNumberOfAnswers: boolean,
  ) => {
    global.store.dispatch(changeSlideUpObj({
      type: 'SHOW_BOTTOM_ALERT',
      payload: {
        alertType: 'SHOW_MARKS',
        visible: true,
        title,
        titleColor,
        correctNumberOfAnswers,
        colorcorrectNumberOfAnswers,
        msg,
        twoButtons,
        imgName,
        okPress,
        okBtnText,
        IsShowcorrectNumberOfAnswers,
        snapToIndexValue:2
      },
    }));
  };


  export const showSlideUpPanelEditUserName = (
    title: any,
    titleColor:any,
    msg: any,
    twoButtons: boolean,
    leftBtnText: any,
    onPressLeft=()=>{},
    rightBtnText: any,
    onPressRight=()=>{},
    imgName: any,
    isShowTextInput: boolean,
    IsShowcorrectNumberOfAnswers: boolean,
    initUsername: string,
    onChangeUsername: any,
  ) => {
    global.store.dispatch(changeSlideUpObj({
      type: 'SHOW_BOTTOM_ALERT',
      payload: {
        alertType: 'SHOW_MARKS',
        visible: true,
        title,
        titleColor,
        leftBtnText,
        onPressLeft,
        rightBtnText,
        onPressRight,
        msg,
        twoButtons,
        imgName,
        isShowTextInput,
        IsShowcorrectNumberOfAnswers,
        initUsername,
        onChangeUsername,
        snapToIndexValue:2
      },
    }));
  };



  export const showSlideUpPanelLogout = (
    title: any,
    titleColor:any,
    msg: any,
    twoButtons: boolean,
    leftBtnText: any,
    onPressLeft=()=>{},
    rightBtnText: any,
    onPressRight=()=>{},
    imgName: any,
  
  ) => {
    global.store.dispatch(changeSlideUpObj({
      type: 'SHOW_BOTTOM_ALERT',
      payload: {
        alertType: 'SHOW_MARKS',
        visible: true,
        title,
        titleColor,
        leftBtnText,
        onPressLeft,
        rightBtnText,
        onPressRight,
        msg,
        twoButtons,
        imgName,
        IsShowcorrectNumberOfAnswers:false,
        snapToIndexValue:2
      },
    }));
  };


  export const showInstructionsSlideUpPanel = (
    title: any,
    titleColor:any,
    msg: any,
    twoButtons: any,
    imgName: any,
    okPress = () => {},
    okBtnText: any,
    IsShowcorrectNumberOfAnswers: boolean,
    widthAddedFoeImage: boolean,
    snapToIndexValue: any
  ) => {
    global.store.dispatch(changeSlideUpObj({
      type: 'SHOW_BOTTOM_ALERT',
      payload: {
        alertType: 'SHOW_MARKS',
        visible: true,
        title,
        titleColor,
        msg,
        twoButtons,
        imgName,
        okPress,
        okBtnText,
        IsShowcorrectNumberOfAnswers,
        widthAddedFoeImage: true,
        snapToIndexValue: 3
      },
    }));
  };