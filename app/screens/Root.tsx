import React, { useEffect } from 'react'
import { View } from 'react-native';

import { MainStack, Onboarding } from '../routes/NavigationStack';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { LoadingSpinner } from '../componants/LoadingSpinner';



const Root = () => {
  const { loading,username} = useSelector((state: RootState) => ( state.login, state.common));



  useEffect(()=>{
     console.log("username",username)
  },[])



  return (

    <View style={{flex:1}}>
        <LoadingSpinner showLoading={ loading} />
       {username!=='' ? <MainStack/>:  <Onboarding /> }
    </View>
  )
}

export default Root