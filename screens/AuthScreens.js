import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";

const AuthScreens = () => {
  const [signUp, setSignUp] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <KeyboardAvoidingView>
          <View className="w-full  h-32 flex-row items-center justify-center">
            <Image
              className="w-full h-full"
              resizeMode="contain"
              source={{
                uri: "https://i.pinimg.com/564x/ca/75/ae/ca75ae5b12f17b15b49c286aab84cead.jpg",
              }}
            />
          </View>
          <PageContainer bg="bg-white">
            {signUp ? <SignUpForm /> : <SignInForm />}

            <TouchableOpacity
              className="my-5 flex-row items-center justify-center"
              onPress={() => setSignUp((prev) => !prev)}
            >
              <Text className="text-lg  tracking-[2px] capitalize font-bold text-gray-400">{`Switch to ${
                signUp ? "Sign In" : "Sign Up"
              } `}</Text>
            </TouchableOpacity>
          </PageContainer>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthScreens;
