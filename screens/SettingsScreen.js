import { View, Text,ScrollView,ActivityIndicator } from "react-native";
import { useReducer ,useCallback,useState} from "react";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";
import CustomInput from "../components/CustomInput";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducer";
import { useSelector ,useDispatch} from "react-redux";
import SubmitButton from "../components/SubmitButton";
import { LogOut, signedInUserUpdate } from "../utils/actions/authActions";
import { updateSignedInUser } from "../store/authSlice";
import ProfileImage from "../components/ProfileImage";

const SettingsScreen = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [showSuccessMessage,setShowSuccessMessage] = useState(false)
    

    const dispatch = useDispatch()

    const userData = useSelector(state=> state.auth.userData)
    const userDataT = useSelector(state=> state.auth)
    console.log(userDataT)

    const firstName = userData?.firstName || ''
    const lastName = userData?.lastName || ''
    const email = userData?.email || ''
    const about = userData?.about || ''
    const initialState = {
        inputValues:{
        firstName,
          lastName,
          email,
          about,
        },
        inputValidities: {
          firstName: undefined,
          lastName: undefined,
          email: undefined,
          about: undefined,
        },
        formIsValid: false,
      };
      const saveHandler =async()=>{
        const updatedValues = formState.inputValues;

        try{
            setIsLoading(true)
           await signedInUserUpdate(userData.userID,updatedValues)
           dispatch(updateSignedInUser({newData:updatedValues}))
           setShowSuccessMessage(true)

        setTimeout(()=>{
            setShowSuccessMessage(false)

        },3000)

        }catch(err){
            console.log(err)
        }finally{
            setIsLoading(false)
        }
      }
    const [formState, dispatchForm] = useReducer(reducer, initialState);

    const changeTextHandler = useCallback((inputID, inputText) => {
        const result = validateInput(inputID, inputText);
        dispatchForm({inputID, validationResult: result,inputText });
      },[dispatchForm]);


      const hasChanges =()=>{
      const currentValues = formState.inputValues;

      return currentValues.firstName != firstName || currentValues.lastName!= lastName || currentValues.email != email || currentValues.about != about
      
      }


  return (
    <ScrollView className='flex-1 bg-white'>
    <PageContainer className="flex-1 mb-10 bg-white">
      <PageTitle>Settings</PageTitle>

      <ProfileImage userId={userData?.userID} width={'w-40'} height={'h-40'} />

      <CustomInput
        onChangeTextHandler={changeTextHandler}
        label="First Name"
        inputID="firstName"
        initialValue={userData?.firstName}
        errorText={formState.inputValidities["firstName"]}
        icon="user"
      />
      <CustomInput
      initialValue={userData?.lastName}
        onChangeTextHandler={changeTextHandler}
        label="Last Name"
        inputID="lastName"
        errorText={formState.inputValidities["lastName"]}
        icon="user"
      />
      <CustomInput
        onChangeTextHandler={changeTextHandler}
        label="About"
        initialValue={userData?.about}
        inputID="about"
        errorText={formState.inputValidities["about"]}
        icon="user"
      />
      <CustomInput
        autoCapitalize="none"
        initialValue={userData?.email}
        keyboardType="email-address"
        errorText={formState.inputValidities["email"]}
        onChangeTextHandler={changeTextHandler}
        label="Email"
        inputID="email"
        icon="mail"
      />
      
      <View className="mb-4">
      {isLoading ?<ActivityIndicator className='mt-3' size='large' color='#29AB87' /> :hasChanges() && <SubmitButton
        disabled={!formState.formIsValid}
        mt="mt-3"
        onPress={saveHandler}
      >
        Save
      </SubmitButton>}
      </View>
        {showSuccessMessage && <Text className='text-amber-400 text-base font-bold'>Saved!</Text>}
      <View className="mb-10">
      <SubmitButton bgColor='bg-red-500'
        mt="mt-3"
        onPress={()=> dispatch(LogOut())}
      >
        Log Out
      </SubmitButton>

      </View>

    </PageContainer>
    </ScrollView>
  );
};

export default SettingsScreen;
