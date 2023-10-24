import React from 'react';
import {View} from 'react-native';



const PageContainer = ({children,bg}) => {

    return (
        <View className={`px-5 flex-1 ${bg}`}>
            {children}
        </View>
    );
};


export default PageContainer;