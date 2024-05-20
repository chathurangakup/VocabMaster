import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {BannerAd, BannerAdSize,InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

import Images from '../../../config/Images.d';
import { colors } from '../../../config/styles';
import TextInputCustom from '../../../componants/TextInputField';
import CustomButton from '../../../componants/CustomButton';
import LottieView from 'lottie-react-native';
import Lottie from '../../../config/Lottie';
import { chnageUsername, changeIsLogin } from './LoginSlice'
import { AppBar } from '../../../componants/AppBar';
// import { RootState } from '../../../store';


const { width, height } = Dimensions.get('window')

interface LoginScreenProps {
    // onLogin: (username: string, password: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = (props: any) => {
    const [username, setUsername] = useState('');
    const [isErrorUserName, setIsErrorUserName] = useState(true);


    const dispatch = useDispatch<any>();
    // const { loading, errorMessage } = useSelector((state: RootState) => state.login);
    //  dispatch(  changeLoadingState())

    const clickLogin = () => {
        if (username !== '' && isErrorUserName == false) {
            dispatch(chnageUsername(username));
            dispatch(changeIsLogin(true));
        }
    };

    const changeUserName = (value: string) => {
        if(value==''){
            setUsername(value)
            setIsErrorUserName(true)
        }else{
            setUsername(value)
            setIsErrorUserName(false);
        }
      
    }

    return (
        <SafeAreaView style={styles.container}>
                <AppBar
        navigation={props.navigation}
        isShowBack={false}
        title={'Login'}
      />
            <ImageBackground source={Images.Welcome} style={styles.bgImgStyle}>
        
                <View style={{ height: '100%', marginTop: '20%' }}>
                    <LottieView source={Lottie.TeachingGirl} style={{ flex: 1 }} autoPlay loop />
                    <Text style={{color:colors.blackColor, textAlign:'center', paddingTop:(height*10)/100, fontFamily:'Quicksand-Medium'}}>Please enter your username here.</Text>
                    <View style={styles.textInputStyles}>

     
                          



                        <TextInputCustom
                            value={username}
                            onChangeText={(value) => changeUserName(value)}
                            placeholder="Enter Username"
                        />
                        {/* {isErrorUserName ? null : <Text style={{ color: 'red', alignSelf: 'flex-start', paddingLeft: width / 6, paddingBottom: 20 }}>* Please enter username</Text>
                        } */}
                      
                        <View style={{ width: width / 1.5, paddingTop: height / 20 }}>
                            <CustomButton title="Login" onPress={() => clickLogin()} buttonStyle={[{backgroundColor:isErrorUserName ? colors.gray:colors.btnFillColor}]} disabled={isErrorUserName} />
                        </View>
                    </View>
                </View>
            </ImageBackground>
          
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        width: width,
        height: width / 2,
        backgroundColor: 'red'
    },
    textHeader: {
        fontSize: 40,
        color: colors.fontColor,

    },
    textOr: {
        fontSize: 20,
        color: colors.fontColor,

        paddingTop: 15
    },
    textInputStyles: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        paddingTop:( height * 2)/100
    },
    bgImgStyle: { width: '100%', resizeMode: 'cover', backgroundColor: colors.blackColor, justifyContent: 'center', }
});

export default LoginScreen;
