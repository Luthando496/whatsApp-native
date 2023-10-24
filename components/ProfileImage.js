import React,{useState} from 'react';
import { Image } from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { launchImagePicker, uploadImage } from '../utils/ImagePickerHelper';
import { signedInUserUpdate } from '../utils/actions/authActions';




const ProfileImage = ({width,height,uri,userId}) => {
    // const [image, setImage] = useState(null);

    const source = uri ? {uri:uri} : {uri:'https://i.pinimg.com/564x/bc/6b/17/bc6b1796df8028cc8e463cd1606625c1.jpg'}
    
    const [image, setImage] = useState(source);

    const pickImage = async () => {
        try {
            const tempUri = await launchImagePicker();

            if (!tempUri) return;

            // Upload the image
            const uploadUrl = await uploadImage(tempUri);
            await signedInUserUpdate(userId,{profilePicture:uploadUrl})

            if (!uploadUrl) {
                throw new Error("Could not upload image");
            }

            setImage({ uri: uploadUrl });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <TouchableOpacity onPress={pickImage} className='w-full flex-row justify-center items-center relative mb-3'>
            <Image  className={`${height} ${width} rounded-full`} resizeMode='cover'  source={image} />

            <View className="w-6 absolute -bottom-3">
                <Feather name='edit'  size={20} color={'#567'}  />
            </View>
        </TouchableOpacity>
    );
};




export default ProfileImage;