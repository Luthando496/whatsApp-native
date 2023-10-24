import React ,{useState} from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const CustomInput = (props) => {

  const changeText =(text) =>{
    setValue(text)
    props.onChangeTextHandler(props.inputID,text)
  }

  const [value,setValue] = useState(props.initialValue);
  return (
    <View className="w-full mb-5">
      <Text
        style={styles.inputTextHeader}
        className="text-lg text-sky-700 my-2  tracking-[2px]"
      >
        {props.label}
      </Text>
      <View
        style={styles.input}
        className="w-full bg-slate-100 px-3 gap-x-2 py-4 rounded-lg mt-3 flex-row items-center"
      >
        {props.icon && <Feather name={props.icon} size={30} color="#FA8072" />}
        <TextInput
          {...props}
          value={value}
          onChangeText={changeText}
          style={styles.inputText}
          className="flex-1 pt-0 tracking-[3px]"
        />
      </View>
      {props.errorText && (
        <View className="my-3">
          <Text className="font-extrabold text-red-600 uppercase">
            {props.errorText[0]}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFAFA",
    elevation: 20,
  },
  inputTextHeader: {
    fontFamily: "play",
  },
  inputText: {
    fontFamily: "roboto",
  },
});

export default CustomInput;
