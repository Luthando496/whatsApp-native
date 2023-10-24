import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from './MainNavigator';
import AuthScreens from '../screens/AuthScreens';
import { useSelector } from 'react-redux';
import StartUpScreen from '../screens/StartUpScreen';







const AppNavigator = () => {
    const isAuth = useSelector(state => state.auth.token !== null && state.auth.token !== '')

    const didAutoLogin = useSelector(state => state.auth.didAutoLogin)

    return (
        <NavigationContainer>
        {isAuth && <MainNavigator  /> }
        {!isAuth && didAutoLogin && <AuthScreens  /> }
        {!isAuth && !didAutoLogin && <StartUpScreen  /> }
        </NavigationContainer>
    );
};


export default AppNavigator;