import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const SubmitButton = ({ children,disabled,onPress,mt,bgColor}) => {
  return (
      <TouchableOpacity onPress={disabled ? null : onPress} style={styles.btnShadow}  className={`${disabled ? 'bg-gray-400' : bgColor ? bgColor : 'bg-pink-400'} -ml-[6px] px-6 ${mt} py-3 rounded-lg flex-row items-center justify-center w-ful`}>
        <Text className={`${disabled ? 'text-black' :'text-white'} text-base font-bold uppercase tracking-[2px]`}>{children}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnShadow: {
    elevation: 30,
  },
});

export default SubmitButton;
