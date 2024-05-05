import React, { useEffect, useRef, useState } from 'react'
import { Animated, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, TextInput, Keyboard, FlatList } from 'react-native';
import Images from '../../config/Images.d';
import TrackPlayer, { Capability } from 'react-native-track-player';

import { styles } from './Styles';
import { AppBar } from '../../componants/AppBar';
import { colors } from '../../config/styles';
import Icons from 'react-native-vector-icons/AntDesign';
import { changeLoadingStatus } from '../../slices/CommonSlice';
import { changeBasicLessonInfo } from '../../screens/lessons/LessonSlice'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataSpellingMeaningApi } from '../../utils/utils';
import { RootState } from '../../store';



const MainScreen = (props: any) => {

    const dispatch = useDispatch<any>();

    const [currentQuectionIndex, setCurrentQuectionIndex] = useState(0);
    const [vocabResponce, setvocabResponce] = useState([])
    const [spellingText, setSpellingText] = useState('');
    const [speakerColorStatus, setSpeakerColorStatus] = useState(-1);
    const [isDisableButton, setIsDisableButton] = useState(true);

    const [isSucessAns, setIsSuccessAns] = useState(false);
    const [isShowTextInput, setIsShowTextInput] = useState(true);
    const [isEndTimeout, setIsEndTimeout] = useState(false);

    const initialTime = 120;

    const [remainingTime, setRemainingTime] = useState(initialTime);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const { lessonsInfo, loading } = useSelector((state: RootState) => state.lessons);


    const { width, height } = Dimensions.get('window');

    const { spellingList,spellingListMainId } = props.route.params;

    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, spellingList.length],
        outputRange: ['0%', '100%'],
    });


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
                compactCapabilities: [Capability.Play, Capability.Pause],
            });
            isPlayerInitialized = true
        } catch (e) { }
    }

    useEffect(() => {
        setupPlayer()
    }, []);
    

    const updateIsComplete = (id: any) => {
        const updatedTasks = lessonsInfo.map((task: any) => {
            // If the task's id matches the provided id, update its isComplete property to true
            if (task.id === id) {
                return {
                    ...task,
                    isComplete: true
                };
            }
            return task;
        });
    
        return updatedTasks;
    };

    const SpellingCheckApiCall = async () => {
        dispatch(changeLoadingStatus(true))
        const responce = await fetchDataSpellingMeaningApi(spellingList[currentQuectionIndex]?.title);
        console.log("responce user", JSON.stringify(responce))
        setvocabResponce(await responce);
        dispatch(changeLoadingStatus(false));

    }


    useEffect(() => {
        console.log("ccccccccc", spellingList[currentQuectionIndex])
        SpellingCheckApiCall();
    }, [currentQuectionIndex])

    const clickSubmitButton = async() => {
        const value=updateIsComplete(1)


        dispatch(changeBasicLessonInfo(value))
        // console.log("spellingList oooo", spellingList[currentQuectionIndex]?.titleSpellin)
        // if (spellingList[currentQuectionIndex]?.title == spellingText.toLowerCase()) {
        //     setIsSuccessAns(true)
        //     setIsShowTextInput(false)
        // } else {
        //     setIsSuccessAns(false)
        //     setIsShowTextInput(false)
        // }
    }

    const clickNextButton = () => {
        if (currentQuectionIndex + 1 < spellingList.length) {
            setIsShowTextInput(true);
            setCurrentQuectionIndex(currentQuectionIndex + 1);
            setSpellingText('');
            handleRestart()
            setIsEndTimeout(false)
            Animated.timing(progress, {
                toValue: currentQuectionIndex + 1,
                duration: 1000,
                useNativeDriver: false,
            }).start();
        } else {
            clearInterval(intervalRef.current); // Stop the current interval
            setRemainingTime(0);
        }

    }

    // useEffect(()=>{
    //     setTimeoutTime(20)

    // },[timerValue])

    const renderProgressBar = () => {
        return (
            <View>
                <View style={styles.InprogressAnimated}>
                    {currentQuectionIndex + 1 <= 1 ?
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
                        : null


                    }


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



    const renderSubmitButton = () => {

        return (
            <View style={styles.nextBtnRoot}>
                <View style={styles.nxtBtnMain}>
                    <TouchableOpacity
                        style={[styles.nextBtnStyles, { backgroundColor: isDisableButton ? colors.gray : colors.secondaryColor2, }]}
                        onPress={() => isShowTextInput ? clickSubmitButton() : clickNextButton()}
                        disabled={isDisableButton}>
                        <Text style={styles.nextBtnTextStyles}>{isShowTextInput ? 'Submit' : 'Next'}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );

    };

    const RenderMainView = ({ data, index }: any) => {
        return (
            <View style={{ backgroundColor: 'white', margin: 15, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>

                    {data.phonetics[0]?.audio !== undefined ?
                        <View style={{ width: 50, height: 50, marginRight: (width * 5) / 100 }}>
                            <TouchableOpacity disabled={speakerColorStatus == -1 ? false : true}>
                                <Icons
                                    name="sound"
                                    size={30}
                                    disabled={speakerColorStatus == -1 ? false : true}
                                    color={index == speakerColorStatus ? colors.red : colors.blackColor}
                                    onPress={async () => {

                                        try {
                                            console.log('lolo', index)
                                            await TrackPlayer.reset();
                                            const newObj = {
                                                id: 1,
                                                url: data.phonetics[0].audio,

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
                        : null


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
                                {item.definitions.map((item: any, index2: number) => <Text key={index2} style={{ paddingLeft: (width * 6) / 100, paddingTop: 10, color: colors.blackColor }}>{index2 + 1}. {item.definition}</Text>)}

                            </View>
                        </View>

                    )}
                </View>
            </View>
        )
    }


    const spellingType = (spelling: string) => {
        setSpellingText(spelling)
    }

    useEffect(() => {
        if (spellingText == '') {
            setIsDisableButton(true)
        } else {
            setIsDisableButton(false)
        }
    }, [spellingText])




    const SpellingInput = () => {
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
                        onChangeText={text => spellingType(text)}
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



    const decreaseTime = () => {
        if (remainingTime > 0) {
            setRemainingTime(prevTime => prevTime - 1);
        } else {
            clearInterval(intervalRef.current);
            setIsShowTextInput(false)
            setIsEndTimeout(true)
            setIsDisableButton(false)
        }
    };

    useEffect(() => {
        intervalRef.current = setInterval(decreaseTime, 1000); // Decrease every second
        return () => clearInterval(intervalRef.current);
    }, [remainingTime]);

    const handleRestart = () => {
        clearInterval(intervalRef.current); // Stop the current interval
        setRemainingTime(initialTime); // Reset the remaining time
        intervalRef.current = setInterval(decreaseTime, 1000); // Start a new interval
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

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
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{formatTime(remainingTime)}</Text>
                        {/* <Timer initialTime={timerValue} onEnd={() => endTimer()} onRestart={()=>handleRestart()} /> */}
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
                    {isShowTextInput ?
                        SpellingInput()
                        :
                        <View>
                            {
                                isEndTimeout == true ?
                                    <Text>Time out Correct ans is + {spellingList[currentQuectionIndex]?.title}</Text>
                                    :
                                    isSucessAns ?
                                        <Text>Correct</Text>
                                        :
                                        <Text>wrong and corret and is {spellingList[currentQuectionIndex]?.title}</Text>


                            }
                        </View>
                    }
                </ScrollView>
                {renderSubmitButton()}
            </ImageBackground>
        </SafeAreaView>
    )
}

export default MainScreen