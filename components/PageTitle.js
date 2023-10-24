import {View, Text} from 'react-native';



const PageTitle = ({children}) => {

    return (
        <View className='my-4'>
            <Text style={{fontFamily:"nanu"}} className='text-2xl  text-teal-400 tracking-[2px]'>{children}</Text>
        </View>
    );
};


export default PageTitle;