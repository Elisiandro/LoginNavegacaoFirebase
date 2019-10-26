import React from 'react';
import { ScrollView, StyleSheet, Button, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Toast from 'react-native-simple-toast';

import * as ImagePicker from 'expo-image-picker'

import * as firebase from "firebase";
//import console = require('console');

export default function LinksScreen() {
  
  onProcessFoto = async () => {
    let result = await ImagePicker.launchCameraAsync();
    //let result = await ImagePicker.launchImageLibraryAsync();

    
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    


    if (!result.cancelled)
    {

      var numero_aleatorio = Math.random();
      numero_aleatorio = Math.floor(numero_aleatorio * 10);
      
      
      this.uploadImage(result.uri, 'name_'+date+month+year+'_'+numero_aleatorio.toString()).
      then(()=>{
        Toast.show('Foto enviado com sucesso!!!', Toast.LONG);

      }).
      catch((error)=>{
        console.log(error.message)
        Toast.show(error.message, Toast.LONG);
      })
    }
  }

  uploadImage = async (uri, imageName) =>
  {
    const response = await fetch(uri);
    const blob  = await response.blob();

    var ref = firebase.storage().ref().child("images/"+ imageName)
    return ref.put(blob)
  }
  
  return (
    // <ScrollView style={styles.container}>
    //   {/**
    //    * Go ahead and delete ExpoLinksView and replace it with your content;
    //    * we just wanted to provide you with some helpful links.
    //    */}
    //   <ExpoLinksView />
    // </ScrollView>

    <View style={styles.container}>
      <Button title='Tirar Foto!' onPress={this.onProcessFoto}></Button>
    </View>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
