import React, { useCallback, useReducer,useState,useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
import CustomInput from "./CustomInput";
import SubmitButton from "./SubmitButton";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { signInForm } from "../utils/actions/authActions";
import { useDispatch } from "react-redux";
import { ActivityIndicator ,Alert} from "react-native";




const SignInForm = () => {

  const dispatch = useDispatch()

  const [errorMessage,setErrorMessage] = useState(null)
  const [isLoading,setIsLoading] = useState(false)

  

  const initialState = {
    inputValues:{
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  };

  const [formState, dispatchForm] = useReducer(reducer, initialState);

  const changeTextHandler = useCallback((inputID, inputText) => {
    const result = validateInput(inputID, inputText);
    dispatchForm({inputID, validationResult: result,inputText });
  },[dispatchForm]);

  useEffect(()=>{
    if(errorMessage){
      Alert.alert('An error occured', errorMessage)
    }

  },[errorMessage])

  const authHandler =async()=>{
    try{
      setIsLoading(true)

      await dispatch(signInForm(formState.inputValues.email,formState.inputValues.password))
      setErrorMessage(null)
    }catch(err){
      setErrorMessage(err.message)
      setIsLoading(false)
    }
  }

  return (
    <>
      <CustomInput
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeTextHandler={changeTextHandler}
        label="Email"
        errorText={formState.inputValidities["email"]}
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
        Sign In
      </SubmitButton>}
    </>
  );
};

export default SignInForm;
