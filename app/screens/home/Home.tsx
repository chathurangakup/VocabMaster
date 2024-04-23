import React from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Animated, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { AppBar } from '../../componants/AppBar';
import Images from '../../config/Images.d';
import { colors } from '../../config/styles';
import { mainListArray } from '../../utils/constants';

const { width, height } = Dimensions.get('window');

const Home = (props: any) => {
  const animated = new Animated.Value(0);

  const SubjectItem = ({items}:any) => {
    console.log("items",items)
    return (
      <TouchableOpacity
        activeOpacity={0.0}
        onPress={() => {
          props.navigation.navigate('lessons', {
            mainId: items.item.id,
          });
          // props.navigation.navigate('gradesMain', {
          //   subjectId: subjects.item._id,
          //   categoryName: 'Learn'
          // });
        }}
        style={styles.mainItemBtn}>
        <Image
          style={styles.mainItemImgStyle}
          // source={{
          //   uri: items.image,
          // }}
        />
        <Text style={styles.mainItemName}>{items.item.title}</Text>
        {/* <Text style={styles.mainSubName}>{subjects.item.subjectSubName}</Text> */}
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
        <Text style={styles.menuTitle}>ssjj</Text>
      </View>

      <View style={{paddingBottom:60}}>
        <FlatList
          data={mainListArray}
          style={{paddingHorizontal: 20, marginTop: -120, marginBottom: 80}}
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // keyExtractor={item=> item.value}
          renderItem={item => <SubjectItem items={item} />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, position: 'relative' },
  mainItemBtn: {
    backgroundColor: colors.darkGreen,
    margin: 10,
    width: width / 2.2,
    height: height / 3.5,
    borderRadius: 10,
    // padding: 15,
    // shadow: '#9e9808',
    elevation: 5,
  },
  mainItemImgStyle: {
    width: width / 2.2,
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
  menuTitle: { color: colors.white, fontSize: 18, paddingTop: 20 },
  mainItemName: {color: colors.white, fontSize: 25, alignSelf: 'center'},

});

export default Home