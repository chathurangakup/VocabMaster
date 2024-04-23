import React from 'react'
import { SafeAreaView, View, Text, Image, Animated, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { AppBar } from '../../componants/AppBar'
import { colors } from '../../config/styles';
import Images from '../../config/Images.d';
import { lessionListArray } from '../../utils/constants';


const {width, height} = Dimensions.get('window');

const Lessons = (props:any) => {
    const animated = new Animated.Value(0);


    const TitlesItem = ({titles}: any) => {
        return (
          <TouchableOpacity
            activeOpacity={0.0}
            onPress={() => {
            //   props.navigation.navigate('teacherQuote', {
            //     subjectId: subjectId,
            //     gradesId: gradesId,
            //     titleId: titles.item._id,
            //     titleName: titles?.item?.battleNumber
            //   });
            }}
            style={styles.subjectItemBtn}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingLeft: 20,
              }}>
              <View style={{}}>
                <Text style={styles.subjName}>{titles.item.id}. </Text>
              </View>
              <View style={{}}>
                <Text style={styles.subjName}>{titles.item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      };

  return (
    <SafeAreaView style={styles.root}>
    <AppBar
      navigation={props.navigation}
      title={'Lessions'}
      isShowBack={true}
    
    />
    <View style={styles.header}>
      <Image source={Images.SubjectTeach} style={styles.imgStyles} />

      {/* <View style={styles.animateIconRoot}>
        <Animated.View
          style={[styles.animateIcon, {transform: [{translateY: animated}]}]}
        />
      </View> */}

      {/* <Search onChange={text => searchText(text)} /> */}
    </View>

    <View style={{flex:1}}>
      <FlatList
        data={lessionListArray}
        style={{
          marginTop: -80,

          marginLeft: 10,
          marginRight: 10,
        }}
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        // keyExtractor={item=> item.value}
        // keyExtractor={(item, index) => item.id}
        renderItem={item => <TitlesItem titles={item} />}
      />
    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    root: {flex: 1, position: 'relative'},
    subjectItemBtn: {
      backgroundColor: colors.lightBlue,
      margin: 10,
      width: width,
      height: 70,
      borderRadius: 20,
      padding: 20,
    //   shadow: '#9e9808',
      elevation: 5,
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
      backgroundColor: 'white',
      borderRadius: 30,
    },
    subjName: {
      color: 'black',
      fontSize: 18,
      alignSelf: 'center',
      fontWeight: 'bold',
    },
    subjSubName: {color: 'black', alignSelf: 'center', padding: 5},
  });

export default Lessons