import { getFirebaseApp } from "../firebaseHelper"
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {child, getDatabase, set,ref, update} from 'firebase/database'
import { authLogOut, authenticate } from "../../store/authSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getUserData } from "./userActions"


let timer;



const saveDataToStorage = (token,userId,expiryDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({token,userId,expiryDate:expiryDate.toISOString()}))
}

export const signUpForm = (firstName,lastName,email,password) => {
    return async dispatch => {
        const app = getFirebaseApp();
    
        const auth = getAuth(app)
    
        try{
            console.log('email',email,'password',password,'firstName',firstName,'lastName',lastName)
            const result = await createUserWithEmailAndPassword(auth,email,password)
            const {uid,stsTokenManager} =   result.user

            const {accessToken,expirationTime} = stsTokenManager

            const expiryDate = new Date(expirationTime)

            const timeNow = new Date()

            const miliDateExpire = expiryDate - timeNow
    
            const userData = await createUser(firstName,lastName,email,uid)

            dispatch(authenticate({token:accessToken,userData}))

            saveDataToStorage(accessToken,uid,expiryDate)

            timer = setTimeout(() => {
                dispatch(LogOut())
            },miliDateExpire)
    
        }catch(err){
            const errorCode = err.code
            console.log(err)
            let message = 'Something went wrong'
    
            if(errorCode=== 'auth/email-already-in-use'){
                message = 'Email already in use'
            }
    
            throw new Error(message)
            // console.error(err.code)
        }

    }
}



const createUser =async(firstName,lastName,email,userID)=>{

    const firstLast = `${firstName} ${lastName}`.toLowerCase()

    const userData ={
        firstName,
        lastName,
        email,
        userID,
        firstLast,
        userID,
        signUpDate: new Date().toISOString()
    }

    const dbRef = ref(getDatabase())
    const childRef = child(dbRef,`users/${userID}`)

    await set(childRef,userData)

    return userData;

}

export const signInForm = (email,password) => {
    return async dispatch => {
        const app = getFirebaseApp();
    
        const auth = getAuth(app)
    
        try{
            const result = await signInWithEmailAndPassword(auth,email,password)
            const {uid,stsTokenManager} = result.user

            const {accessToken,expirationTime} = stsTokenManager

            const expiryDate = new Date(expirationTime)

            const timeNow = new Date()

            const miliDateExpire = expiryDate - timeNow
    
            const userData = await getUserData(uid)

            dispatch(authenticate({token:accessToken,userData}))

            saveDataToStorage(accessToken,uid,expiryDate)

            timer = setTimeout(() => {
                dispatch(LogOut())
            },miliDateExpire)
    
        }catch(err){
            const errorCode = err.code
            let message = 'Something went wrong'
    
            if(errorCode=== 'auth/user-not-found' || errorCode === 'auth/wrong-password'){
                message = 'the email or password is incorrect'
            }
    
            throw new Error(message)
            // console.error(err.code)
        }

    }
}



export const LogOut = ()=>{
    return async dispatch =>{
        AsyncStorage.clear()
        clearTimeout(timer)

        dispatch(authLogOut())
    }
}

export const signedInUserUpdate =async(userId,newData)=>{
    if(newData.firstName && newData.lastName){
        const firstLast = `${newData.firstName} ${newData.lastName}`.toLowerCase()
    
        newData.firstLast = firstLast
        
    }
    const dbRef = ref(getDatabase())
    const childRef = child(dbRef,`users/${userId}`)

    await update(childRef,newData)
}
