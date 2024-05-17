import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Animated, Dimensions, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import { AppBar } from '../../componants/AppBar';
import Images from '../../config/Images.d';
import { colors } from '../../config/styles';
import { mainListArray } from '../../utils/constants';
import { changeLoadingStatus } from '../../slices/CommonSlice';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { RootState } from '../../store';
import { getVersionInfo } from '../../slices/CommonSlice';

const { width, height } = Dimensions.get('window');

const Home = (props: any) => {
  const dispatch = useDispatch<any>();
  const { loading,username} = useSelector((state: RootState) => (state.login));
  const { lessonsBasicInfo,lessonsIntermediateInfo,lessonsAdvanceInfo,lessonsMesteryInfo } = useSelector((state: RootState) => state.lessons);
  const { isConnectedInternet } = useSelector((state: RootState) => state.common);
  const animated = new Animated.Value(0);


  useEffect(()=>{
    dispatch(changeLoadingStatus(false))
    if (lessonsBasicInfo?.length == 0 || lessonsIntermediateInfo?.length ==0 || lessonsAdvanceInfo?.length ==0 || lessonsMesteryInfo?.length ==0 ) {
      if(isConnectedInternet){
        dispatch(getVersionInfo());
      }
    
    }
  },[])

  const SubjectItem = ({items}:any) => {
    console.log("items",items)
    return (
     
      <TouchableOpacity
        activeOpacity={0.0}
        onPress={() => {
          props.navigation.navigate('lessons', {
            mainId: items.item.id,
          });
        }}
        style={[styles.mainItemBtn, {backgroundColor: items.item.color}]}>
          <Text style={styles.mainItemName}>{items.item.title}</Text>
          <Text style={styles.secondryItemName}>{items.item.subTitle}</Text>
        <Image
          style={styles.mainItemImgStyle}
          source={Images.BgWave}
        />
          

      </TouchableOpacity>


    );
  };


  return (
    <SafeAreaView style={styles.root}>
      <AppBar
        navigation={props.navigation}
        isShowBack={false}
        title={'Main menu'}
      />
      <View style={styles.header}>
        <Image source={Images.SubjectTeach} style={styles.imgStyles} />
        <Text style={styles.menuUsername}>Hi <Text style={styles.menuUsernameStyle}>{username}</Text></Text>
        <Text style={styles.menuTitle}>Expand your vocabulary and express yourself with confidence!</Text>
      </View>

      <View style={{paddingBottom:60}}>
        <FlatList
          data={mainListArray}
          style={styles.mainArrayListStyles}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={item=> item.title}
          renderItem={item => <SubjectItem items={item} />}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, position: 'relative' },
  mainItemBtn: {
    margin: 10,
    width: width / 2.6,
    height: height / 3.5,
    borderRadius: 10,
    opacity:1,
    // padding: 15,
    // shadow: '#9e9808',
    elevation: 5,
  },
  mainArrayListStyles:{paddingHorizontal: 20, marginTop: -120, marginBottom: 80},
  mainItemImgStyle: {
    width: width / 2.6,
    height: height / 5,
    borderRadius: 10,
    opacity:0.4
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
    opacity: 0.2,
    top: 40,
    left: 15,
    borderRadius: 200,
    width: 300,
    height: 300,
  },
  menuTitle: { color: colors.blackColor, fontSize: 18, paddingTop: (height*2)/100,fontFamily:'Quicksand-Regular' },
  menuUsername:{color: colors.blackColor, fontSize: 18, paddingTop: (height*5)/100,fontFamily:'Quicksand-Regular'},
  menuUsernameStyle:{color: colors.blackColor, fontSize: 18, paddingTop: height/15,fontFamily:'Quicksand-Bold'},
  mainItemName: {color: colors.blackColor, fontSize: 20, alignSelf: 'center', fontFamily:'Quicksand-Regular',marginTop:20},
  secondryItemName:{color: colors.blackColor, fontSize: 12, alignSelf: 'center', fontFamily:'Quicksand-Regular',marginTop:0},

});

export default Home