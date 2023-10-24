import {createSlice} from '@reduxjs/toolkit'



// let userData;

const authSlice =createSlice({
    name:'auth',
    initialState:{
        token:null,
        userData:null,
        didAutoLogin:false
    },
    reducers:{
        authenticate:(state,action)=>{
            const {payload} = action

            state.token = payload.token
            state.userData = payload.userData
            console.log('this is the store',state.userData)
            state.didAutoLogin = true
        },
        setDidTryLogin:(state,action)=>{
            state.didAutoLogin = true;
        },
        authLogOut:(state,action)=>{
            state.token = null
            state.userData = null
            state.didAutoLogin = false
        },
    updateSignedInUser:(state,action)=>{
        state.userData = {...state.userData, ...action.payload.newData}
    }
    }
})

export const authSliceReducer = authSlice.reducer
export const {authenticate,setDidTryLogin,authLogOut,updateSignedInUser} = authSlice.actions