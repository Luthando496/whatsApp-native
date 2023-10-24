import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect } from 'react';
import {View,ActivityIndicator} from 'react-native';
import { useDispatch } from 'react-redux';
import { setDidTryLogin,authenticate} from '../store/authSlice';
import { getUserData } from '../utils/actions/userActions';



const StartUpScreen = () => {

    const dispatch = useDispatch()
    
    useEffect(()=>{
        
        const tryLoginFetch = async()=>{
            const storedData = await AsyncStorage.getItem('userData')
            if(!storedData){
                console.log('No storage available')
                dispatch(setDidTryLogin())
                return;
            }

            const pastData = JSON.parse(storedData)
            const {token,userId,expiryDate:expiryDateString} = pastData

            const expiryDate = new Date(expiryDateString)
            
            if(expiryDate <= new Date() || !token || !userId){
                dispatch(setDidTryLogin())
                return;
            }

            const userData = await getUserData(userId)

            dispatch(authenticate({token,userData}))
        }

        tryLoginFetch()
    },[dispatch])

    return (
        <View className=' flex-1 justify-center items-center'>
            <ActivityIndicator size="large" color="#004F98"/>
        </View>
    );
};


export default StartUpScreen;