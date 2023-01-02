import { StyleSheet, Text, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { useState } from 'react';

export default function App() {
 
 const [imageArray, setImageArray] = useState([])
 const [image, setImage] = useState('')
 
  const selectMultipleImages = async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        selectionLimit : 5,
        allowsMultipleSelection : true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('this is the result',result);
      if(!result.canceled){
        setImageArray(result.assets)
      }
  
      
   }
   const selectSingleImage = async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('this is the result',result);
    if(!result.canceled){
      setImageArray(result.assets[0].uri)
    }
   }

   const senSingledPictureToServer = async()=>{
      const response = await FileSystem.uploadAsync('http://54.162.138.235:3005/dashboard/chooseProfilePic' ,image,{
        
        fieldName: 'file',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,

    })
    
   }
const sendMultipleImages = async()=>{
  //to be developed
}
  return (
    <View style={styles.container}>
                <Button title = 'select' onPress={selectSingleImage}/>
                <Button title='send' onPress={senSingledPictureToServer}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

