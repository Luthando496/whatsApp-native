import {View, Text, StyleSheet, Button} from 'react-native';



const ChatListScreen = ({navigation}) => {

    return (
        <View className=''>
            <Text className='text-2xl text-pink-600 font-semibold text-center'>Chat List Screen</Text>
            <Button className='mt-20' title='chat screen' onPress={()=> navigation.navigate("ChatScreen")}  />
        </View>
    );
};
 

export default ChatListScreen;