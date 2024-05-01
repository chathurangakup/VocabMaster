import React, { useEffect, useState } from 'react'
import { Animated, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, TextInput, Keyboard, FlatList } from 'react-native';
import Images from '../../config/Images.d';
import TrackPlayer, { Capability } from 'react-native-track-player';

import { styles } from './Styles';
import { AppBar } from '../../componants/AppBar';
import { colors } from '../../config/styles';
import Icons from 'react-native-vector-icons/AntDesign';
 import { vocabResponce } from '../../utils/constants';
import Timer from '../../componants/Timer';
import { changeLoadingStatus } from '../../slices/CommonSlice'
import { useDispatch } from 'react-redux';
import { fetchDataSpellingMeaningApi } from '../../utils/utils';


const MainScreen = (props: any) => {

    const dispatch = useDispatch<any>();

    const [currentQuectionIndex, setCurrentQuectionIndex] = useState(0);
    const [vocabResponce, setvocabResponce] = useState([])
    const [timeCount, setTimeMinuteCount] = useState('00');
    const [showNextButton, setShowNextButton] = useState(true);
    const [spellingText, setSpellingText] = useState('');
    const [speakerColorStatus, setSpeakerColorStatus] = useState(-1);

    //const [quections, setQuections] = useState(allQuections);

  
    const { width, height } = Dimensions.get('window');

    const { spellingList } = props.route.params;

    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, spellingList.length],
        outputRange: ['60%', '100%'],
    });
    const progressAnimTime = progress.interpolate({
        inputRange: [0, 120],
        outputRange: ['100%', '0%'],
    });

    const convertSeconds = (s: any) => {
        var sec = s % 120;
        return '' + ("00" + sec).substr(-2);
    }


    const setupPlayer = async () => {
        let isPlayerInitialized = false;
        try {
            await TrackPlayer.setupPlayer();
            TrackPlayer.updateOptions({
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ],

                // Capabilities that will show up when the notification is in the compact form on Android
                compactCapabilities: [Capability.Play, Capability.Pause],
            });
            // const newArray = vocabResponce.map((item, index) => ({
            //     id: index + 1, // Add 1 for starting IDs at 1
            //     url: item.phonetics[0].audio,
            //     title: item.phonetics[0].license.name,
            // }));
            // await TrackPlayer.add(newArray);
            isPlayerInitialized= true
        } catch (e) { }
    }

    useEffect(() => {
         setupPlayer()
         
        
       // return () => {TrackPlayer.reset()}
    }, []);



    const SpellingCheckApiCall =async() =>{
        dispatch(changeLoadingStatus(true))
        const responce =await fetchDataSpellingMeaningApi(spellingList[currentQuectionIndex]?.titleSpelling);
        console.log("responce user", await JSON.stringify(responce))
        setvocabResponce(await responce);
        dispatch(changeLoadingStatus(false));
       
    }


    useEffect(()=>{
       console.log("ccccccccc",spellingList[currentQuectionIndex])
       SpellingCheckApiCall();
    },[currentQuectionIndex])

    const clickNextButton =() =>{
        setCurrentQuectionIndex(currentQuectionIndex + 1);
    }

    const renderProgressBar = () => {
        return (
            <View>
                <View style={styles.InprogressAnimated}>
                    <Animated.View style={[styles.animatedbarStyle, { width: progressAnim }]}>
                        <View style={{ padding: 6 }}>
                            <View
                                style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={styles.quectionTextStyle}>
                                    {'Step '}{currentQuectionIndex + 1}{' '}
                                </Text>
                                <Text style={styles.inProgressTxtstyle}> / {spellingList.length} </Text>
                            </View>
                            <View>
                                <Text style={styles.inProgressTxtstyle}>Vocabulary</Text>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            </View>
        );
    };

    const renderTimeProgressBar = () => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        padding: 5,
                        justifyContent: 'center',
                    }}>
                    {/* <Text style={styles.quectionTextStyle}>
                {currentQuectionIndex + 1}{' '}
              </Text> */}
                    <Text style={styles.inProgressTxtstyle}> {timeCount} : {convertSeconds(30)}</Text>
                </View>

                <View style={styles.InprogressAnimated}>
                    <Animated.View
                        style={[styles.animatedbarStyle, { width: progressAnimTime }]}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        padding: 5,
                        justifyContent: 'center',
                    }}>
                    <Text style={styles.quectionTextStyle}>
                        {currentQuectionIndex + 1}{' '}
                    </Text>
                    <Text style={styles.inProgressTxtstyle}> / {spellingList.length} </Text>
                </View>
            </View>
        );
    };

    const renderNextButton = () => {
        if (showNextButton) {
            return (
                <View style={styles.nextBtnRoot}>
                    <View style={styles.nxtBtnMain}>
                        <TouchableOpacity
                            style={styles.nextBtnStyles}
                            onPress={() => clickNextButton()}>
                            <Text style={styles.nextBtnTextStyles}>NEXT</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            );
        } else {
            return null;
        }
    };

    const RenderMainView = ({ data, index }: any) => {
        return (
            <View style={{ backgroundColor: 'white', margin: 15, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>
                   
                   {data.phonetics[0]?.audio !==undefined?
                   <View style={{ width: 50, height: 50, marginRight: (width * 5) / 100 }}>
                   <TouchableOpacity  disabled={ speakerColorStatus == -1 ? false :true}>
                   <Icons
                       name="sound"
                       size={30}
                       disabled={ speakerColorStatus == -1 ? false :true}
                       color={ index == speakerColorStatus? colors.red: colors.blackColor}
                       onPress={async () => {

                           try {   
                               console.log('lolo', index)
                             await TrackPlayer.reset();
                             const newObj ={
                               id: 1,
                               url: data.phonetics[0].audio,
                               title: data.phonetics[index].license.name,
                             }
                             await TrackPlayer.add(newObj);
                             await TrackPlayer.play();
                             console.log('lolo', index)
                             setSpeakerColorStatus(index)
                             setTimeout(() => {
                               setSpeakerColorStatus(-1);
                             }, 5000);
                           } catch (e) {
                               console.log(e)
                           }

                       }}
                   />
                   </TouchableOpacity>
                 
               </View>
               :null
                   
                
                }
                    
                </View>
                <View>
                {data.meanings.map((item: any, index1: number) => 
                <View>
                    <View style={{ marginLeft: (width * 5) / 100, marginTop: (height * 1) / 100 }}>
                        <Text style={{ fontSize: 25, color: colors.blackColor }}>{item.partOfSpeech}</Text>
                    </View>
                    <View>
                       <Text style={{ paddingLeft: (width * 6) / 100, color: colors.blackColor }}>definition</Text>
                       {item.definitions.map((item: any, index2: number) =>  <Text key={index2} style={{ paddingLeft: (width * 6) / 100, paddingTop: 10, color: colors.blackColor }}>{index2 + 1}. {item.definition}</Text>)}
                     
                    </View>
                    </View>
                
                )}
                      
                  
                    
                </View>
            </View>
        )
    }

    const OtpInput = () => {
        return (
            <View>
                <View
                    style={{
                        borderBottomColor: '#000000',
                        marginLeft: 20,
                        marginRight: 20,
                        borderBottomWidth: 1,
                    }}>
                    <TextInput
                        editable
                        numberOfLines={1}
                        maxLength={20}
                        placeholder='Enter Spelling'
                        onChangeText={text => setSpellingText(text)}
                        value={spellingText}
                        blurOnSubmit={true}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                        textAlign={'center'}
                        style={{ padding: 5, fontSize: 30 }}
                    />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={Images.Welcome}
                resizeMode="cover"
                style={styles.mainComp}>
                <AppBar
                    navigation={props.navigation}
                    title={'Speling'}
                />
                <View style={{ marginTop: 60, marginLeft: 20, marginRight: 20, flexDirection: 'row' }}>
                    <View style={{ flex: 3 }}>
                        {renderProgressBar()}
                    </View>
                    <View style={{ flex: 1 }}>
                        <Timer initialTime={120} onEnd={() => console.log('Timer ended!')} />
                    </View>
                </View>

                <ScrollView automaticallyAdjustKeyboardInsets={true}>
                    <View style={{ flex: 1, backgroundColor: 'white', height: height / 1.7, margin: 15, borderRadius: 10 }}>
                        <ScrollView style={{ flex: 1 }}>
                            {vocabResponce.map((item: any, index: number) =>
                                <RenderMainView data={item} index={index} />
                            )}
                        </ScrollView>
                    </View>
                    {OtpInput()}
                
                </ScrollView>
                {renderNextButton()}
            </ImageBackground>
        </SafeAreaView>
    )
}

export default MainScreen