import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Images from '../../../config/Images.d';
import { colors } from '../../../config/styles';
import TextInputCustom from '../../../componants/TextInputField';
import CustomButton from '../../../componants/CustomButton';
import LottieView from 'lottie-react-native';
import Lottie from '../../../config/Lottie';
import { chnageUsername, changeIsLogin } from './LoginSlice'
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
        if (username !== '' && isErrorUserName == true) {
            dispatch(chnageUsername(username));
            dispatch(changeIsLogin(true));
        }
    };

    const changeUserName = (value: string) => {
        setUsername(value)
        setIsErrorUserName(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={Images.Welcome} style={styles.bgImgStyle}>
                <View style={{ height: '100%', marginTop: '20%' }}>
                    <LottieView source={Lottie.TeachingGirl} style={{ flex: 1 }} autoPlay loop />
                    <View style={styles.textInputStyles}>

                        <TextInputCustom
                            value={username}
                            onChangeText={(value) => changeUserName(value)}
                            placeholder="Enter Username"
                        />
                        {isErrorUserName ? null : <Text style={{ color: 'red', alignSelf: 'flex-start', paddingLeft: width / 6, paddingBottom: 20 }}>* Please enter username</Text>
                        }

                        <View style={{ width: width / 1.5, paddingTop: height / 20 }}>
                            <CustomButton title="Continue" onPress={() => clickLogin()} buttonStyle={{ colors: 'red' }} disabled={false} />
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
        paddingTop: height / 9
    },
    bgImgStyle: { width: '100%', resizeMode: 'cover', backgroundColor: colors.blackColor, justifyContent: 'center', }
});

export default LoginScreen;
