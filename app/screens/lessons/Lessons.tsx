import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView, View, Text, Image, Animated, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {BannerAd, BannerAdSize,InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

import { AppBar } from '../../componants/AppBar'
import { colors } from '../../config/styles';
import Images from '../../config/Images.d';

// import { lessionListArray } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getBasicLessionInfo, getIntermediateLessionInfo,getAdvanceLessionInfo, getMestryLessionInfo } from './LessonSlice';
import { AppDispatch, RootState } from '../../store';
import { Search } from '../../componants/Search';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showInstructionsSlideUpPanel } from '../../utils/utils';
import { HELP_SECTION_TEXT, LESSON_BANNER_ID } from '../../utils/constants';
import { getVersionInfo } from '../../slices/CommonSlice';


const { width, height } = Dimensions.get('window');

const Lessons = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lessonsBasicInfo,lessonsIntermediateInfo,lessonsAdvanceInfo,lessonsMesteryInfo } = useSelector((state: RootState) => state.lessons);
  const { isConnectedInternet } = useSelector((state: RootState) => state.common);
  const [lessionListArray, setLessionListArray] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(lessionListArray);

  const { mainId } = props.route.params;



  useEffect(() => {
    const filtered = lessionListArray.filter((item) =>
      item.title.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setFilteredData(filtered);

  }, [searchText]);

  useEffect(() => {
    console.log()
    if (lessonsBasicInfo?.length !== 0 || lessonsIntermediateInfo?.length !==0 || lessonsAdvanceInfo?.length !==0 || lessonsMesteryInfo?.length !==0 ) {
      if(mainId==1){
        setLessionListArray(lessonsBasicInfo);
        setFilteredData(lessonsBasicInfo)
        console.log(JSON.stringify("lessonsBasicInfo",lessonsIntermediateInfo))
      }else if(mainId ==2){
        setLessionListArray(lessonsIntermediateInfo);
        setFilteredData(lessonsIntermediateInfo)
        console.log(JSON.stringify("lessonsIntermediateInfo",lessonsIntermediateInfo))
      }else if(mainId ==3){
        setLessionListArray(lessonsAdvanceInfo);
        setFilteredData(lessonsAdvanceInfo)
        console.log(JSON.stringify("lessonsAdvanceInfo",lessonsAdvanceInfo))
      }else if(mainId ==4){
        setLessionListArray(lessonsMesteryInfo);
        setFilteredData(lessonsMesteryInfo)
        console.log(JSON.stringify("lessonsMesteryInfo",lessonsMesteryInfo))
      }

   
     
    } else {
      if(isConnectedInternet){
        dispatch(getBasicLessionInfo());
        dispatch(getIntermediateLessionInfo());
        dispatch(getAdvanceLessionInfo());
        dispatch(getMestryLessionInfo());
        dispatch(getVersionInfo());

        showInstructionsSlideUpPanel(
          'Help',
          colors.blackColor,
          HELP_SECTION_TEXT,
          false,
          Images.FullImg,
          () => {
            
          },
          'OK',
          false,
          true,
          3
      )
      }
    } 
  }, [lessonsBasicInfo,lessonsAdvanceInfo, lessonsIntermediateInfo, lessonsMesteryInfo])



  const TitlesItem = ({ titles }: any) => {
    return (
      <TouchableOpacity
        key={titles.id}
        activeOpacity={0.5}
        onPress={() => {
          props.navigation.navigate('mainScreen', {
            spellingList: titles?.spellingList,
            spellingListMainId: titles?.id,
            mainCatogoryId: mainId,
            spellingTitle: titles?.title
          });
        }}
        style={[styles.card, styles.shadowProp]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
   
          }}>
          <View>
            <View style={{ flexDirection: 'row', }}>
              <Text style={styles.subjName}>{titles?.id}. </Text>
              <Text style={styles.subjName}>{titles?.title?.length < 35
                ? `${titles?.title}`
                : `${titles?.title.substring(0, 32)}...`}</Text>
            </View>
            <View>
              <Text style={styles?.subjSubName} numberOfLines={1}>
              {titles?.subTitle?.length < 35
                ? `${titles?.subTitle}`
                : `${titles?.subTitle?.substring(0, 32)}...`}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.statusStyleMain, { backgroundColor: titles.isComplete ? colors.green : colors.orangeColor }]}>
              <Text style={styles.statusStyle}>{titles.isComplete ? 'completed' : 'pending'}</Text>
            </View>

            <Icon name="navigate-next" size={20} color={colors.blackColor} style={{ paddingTop: (height * 1.2) / 100, }} />
          </View>

        </View>

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <AppBar
        navigation={props.navigation}
        title={'Lessons'}
        isShowBack={true}

      />
      <View style={styles.header}>
        <Image source={Images.SubjectTeach} style={styles.imgStyles} />
        <Text style={styles.menuTitle}>Learn new words daily with our fun and engaging approach.</Text>
        <Search onChange={text => setSearchText(text)} value={searchText} />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredData}
          legacyImplementation={true}
          style={{
            marginTop: -80,
            marginLeft: 10,
            marginRight: 10,
          }}
          extraData={filteredData}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index, separators }) => <TitlesItem titles={item} />}
        />
      </View>
      <BannerAd
        size={BannerAdSize.BANNER}
        unitId={LESSON_BANNER_ID}
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
        onAdFailedToLoad={error => {
         // console.error('Advert failed to load: ', error);
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, position: 'relative' },

  card: {
    backgroundColor: '#fbf7f5',
    margin: 10,
    borderWidth: 0.05,
    width: width / 1.1,
    height: (height * 8.5) / 100,
    borderRadius: 20,
    paddingLeft: (height * 2.1) / 100,
    paddingRight: (height * 1.1) / 100,
    paddingTop:(height * 1.5) / 100,
    elevation: 5,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  subjectItemImgStyle: {
    width: width / 2.4,
    height: height / 5,
    borderRadius: 10,
  },
  header: {
    width: '100%',
    height: height / 2.5,
    padding: 30,
    backgroundColor: colors.primaryColor1,
    position: 'relative',
  },
  imgStyles: {
    position: 'absolute',
    opacity: 0.3,
    top: 40,
    left: 15,
    borderRadius: 200,
    width: 300,
    height: 300,
  },
  animateIconRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  animateIcon: {
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  subjName: {
    color: colors.blackColor,
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'Raleway-Bold'

  },
  subjSubName: {
    fontSize: 12,
    fontFamily: 'Raleway-Italic',
    paddingLeft:(width*5)/100,
    color: colors.gray

  },
  statusStyleMain: {
    paddingLeft: (height * 1.1) / 100,
    paddingRight: (height * 1.1) / 100,
    borderRadius: 20,
    justifyContent: 'center'
  },
  statusStyle: {
    color: colors.white,
    fontSize: 13,
    height: (height * 2.7) / 100,
    alignSelf: 'center',
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center'
  },
  menuTitle: { color: colors.blackColor, fontSize: 18, paddingTop: height / 20, fontFamily: 'Quicksand-Regular' },
});

export default Lessons