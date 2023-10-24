import React, { useCallback, useEffect, useReducer,useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { signUpForm } from "../utils/actions/authActions";
import { getFirebaseApp } from "../utils/firebaseHelper";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import { useDispatch,useSelector } from "react-redux";



const SignUpForm = () => {
  const [errorMessage,setErrorMessage] = useState(null)
  const [isLoading,setIsLoading] = useState(false)



  const dispatch = useDispatch()

  const initialState = {
    inputValues:{
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    inputValidities: {
      name: false,
      surname: false,
      email: false,
      password: false,
    },
    formIsValid: false,
  };
  
  useEffect(()=>{
    if(errorMessage){
      Alert.alert('An error occured', errorMessage)
    }

  },[errorMessage])

  const [formState, dispatchForm] = useReducer(reducer, initialState);

  const changeTextHandler = useCallback((inputID, inputText) => {
    const result = validateInput(inputID, inputText);
    dispatchForm({inputID, validationResult: result,inputText });
  },[dispatchForm]);

  const authHandler =async()=>{
    try{
      setIsLoading(true)
      
      await dispatch(signUpForm(formState.inputValues.name,formState.inputValues.surname,formState.inputValues.email,formState.inputValues.password))
      setErrorMessage(null)
    }catch(err){
      setErrorMessage(err.message)
      setIsLoading(false)
    }
  }

  return (
    <>
      <CustomInput
        onChangeTextHandler={changeTextHandler}
        label="First Name"
        inputID="name"
        errorText={formState.inputValidities["name"]}
        icon="user"
      />
      <CustomInput
        onChangeTextHandler={changeTextHandler}
        label="Last Name"
        inputID="surname"
        errorText={formState.inputValidities["surname"]}
        icon="user"
      />
      <CustomInput
        autoCapitalize="none"
        keyboardType="email-address"
        errorText={formState.inputValidities["email"]}
        onChangeTextHandler={changeTextHandler}
        label="Email"
        inputID="email"
        icon="mail"
      />
      <CustomInput
        onChangeTextHandler={changeTextHandler}
        autoCapitalize="none"
        secureTextEntry
        inputID="password"
        errorText={formState.inputValidities["password"]}
        label="Password"
        icon="lock"
      />
      {isLoading ?<ActivityIndicator className='mt-3' size='large' color='#29AB87' /> :<SubmitButton
        disabled={!formState.formIsValid}
        mt="mt-3"
        onPress={authHandler}
      >
        Submit Me
      </SubmitButton>}
    </>
  );
};

export default SignUpForm;
