import React, { useEffect } from 'react'
import { View } from 'react-native'
import { MainStack, Onboarding } from '../routes/NavigationStack';
import { RootState } from '../store';
import { useSelector } from 'react-redux';


const Root = () => {

  const {  username } = useSelector((state: RootState) => (state.login));

  useEffect(()=>{
     console.log("username",username)
  },[])



  return (

    <View style={{flex:1}}>
       {username!=='' ? <MainStack/>:  <Onboarding /> }
    </View>
  )
}

export default Root