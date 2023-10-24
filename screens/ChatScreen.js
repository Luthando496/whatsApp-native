import React, { useState,useCallback } from "react";
import { View, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";




const ChatScreen = () => {
  const [messageText, setMessageText] = useState("");

  const sendMessage = useCallback(() => {
    setMessageText('')

  },[messageText])
  return (
    <SafeAreaView edges={["right", "left", "bottom"]} className="flex-1">
      <Image
        className="flex-1"
        source={{
          uri: "https://i.pinimg.com/564x/7e/52/c4/7e52c47b604b6bf27589d59b4284f1b4.jpg",
        }}
      />

      <View className="flex-row h-20  items-center py-2 px-3">
        <TouchableOpacity>
          <Feather name="image" size={27} color="orange" />
        </TouchableOpacity>
        <TextInput
          value={messageText}
          onSubmitEditing={sendMessage}
          onChangeText={(text) => setMessageText(text)}
          className="flex-1 pl-4 text-lg  rounded-3xl border border-gray-500 py-2 mx-2"
        />
        {!messageText ? (
          <TouchableOpacity>
            <Feather name="camera" size={27} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={sendMessage} className=''>
            <Feather name="send" size={27} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
