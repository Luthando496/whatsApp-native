import * as ImagePicker from 'expo-image-picker';
import { getFirebaseApp } from './firebaseHelper';


export const launchImagePicker=async()=>{

    await checkMediaPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.6,
      });
  
  
      if (!result.canceled) {
       return result.assets[0].uri;
      }



}


export const uploadImage = async(uri)=>{
    const app = getFirebaseApp();

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };

        xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };

        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send();
    });

    const pathFolder = 'profilePics';
    const storageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`);

    await uploadBytesResumable(storageRef, blob);

    blob.close();

    return await getDownloadURL(storageRef);
}

const checkMediaPermission =async()=>{

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permissionResult.granted === false){
        return Promise.reject('We Need permission to access your gallery')
    }

    return Promise.resolve()

}