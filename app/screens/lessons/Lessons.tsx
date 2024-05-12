import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView, View, Text, Image, Animated, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { AppBar } from '../../componants/AppBar'
import { colors } from '../../config/styles';
import Images from '../../config/Images.d';
// import { lessionListArray } from '../../utils/constants';

import { useDispatch, useSelector } from 'react-redux';
import { getLessionInfo } from './LessonSlice';
import { AppDispatch, RootState } from '../../store';
import { Search } from '../../componants/Search';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SideUpPanel from '../../componants/SideUpPanel';


const { width, height } = Dimensions.get('window');

const Lessons = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lessonsInfo, } = useSelector((state: RootState) => state.lessons);
  const [lessionListArray, setLessionListArray] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(lessionListArray);


  useEffect(() => {
    const filtered = lessionListArray.filter((item) =>
      item.title.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchText]);

  useEffect(() => {
    console.log("lessonsInfo",lessonsInfo)
    if (lessonsInfo.length !== 0) {
      setLessionListArray(lessonsInfo);
      setFilteredData(lessonsInfo)
      console.log(JSON.stringify(lessonsInfo))
    } else {

      dispatch(getLessionInfo());
    } 
  }, [lessonsInfo])



  const TitlesItem = ({ titles }: any) => {
    return (
      <TouchableOpacity
        key={titles.id}
        activeOpacity={0.0}
        onPress={() => {
          props.navigation.navigate('mainScreen', {
            spellingList: titles.spellingList,
            spellingListMainId: titles.id,
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

            <Icon name="navigate-next" size={20} color={colors.blackColor} style={{ paddingTop: 5 }} />
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
  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, position: 'relative' },

  card: {
    backgroundColor: '#fbf7f5',
    margin: 10,
    borderWidth: 0.2,
    width: width / 1.1,
    height: 70,
    borderRadius: 20,
    paddingLeft: (height * 2.1) / 100,
    paddingRight: (height * 1.1) / 100,
    paddingTop:(height * 2.1) / 100,
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
    paddingLeft:(width*5)/100

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
    height: (height * 2.5) / 100,
    alignSelf: 'center',
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center'
  },

  menuTitle: { color: colors.blackColor, fontSize: 18, paddingTop: height / 20, fontFamily: 'Quicksand-Regular' },
});

export default Lessons