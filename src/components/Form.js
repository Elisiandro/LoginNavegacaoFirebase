import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import Toast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';

const firebaseConfig = {
  apiKey: "AIzaSyDW9xJ2tylpKMVu14rXJO39t9-0DD028Do",
  authDomain: "reactfirebase-2bfe5.firebaseapp.com",
  databaseURL: "https://reactfirebase-2bfe5.firebaseio.com",
  projectId: "reactfirebase-2bfe5",
  storageBucket: "reactfirebase-2bfe5.appspot.com",
  messagingSenderId: "788959517253",
  appId: "1:788959517253:web:221135c5df4557e3eb612c",
  measurementId: "G-LX4K4LS97Z"
};

export default class Logo extends Component {

  constructor(props) {
    super(props)

    this.state = {
      _email: '',
      _senha: ''
    }

    if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig) }


  }

  onPress = () => {

    if (this.props.type == 'Criar') {      
      try {
        
        if (this.state._senha.length < 6)
        {          
          Toast.show('A SENHA deve ter no mínimo 6 caracteres ', Toast.LONG);
          return
        }

        firebase.auth().createUserWithEmailAndPassword(this.state._email, this.state._senha).catch(function(error)
        {
          Toast.show('(2) Não foi possivel cadastrar o usuário', Toast.LONG)        
        })

        Toast.show('Cadastro realizado com sucesso', Toast.LONG)

      } catch (error) {        
        Toast.show('(1) Não foi possivel cadastrar o usuário', Toast.LONG)        
      }
      finally{
      }
    }
    else {
      try {        
        firebase.auth().signInWithEmailAndPassword(this.state._email, this.state._senha).then(function (user)
        {
          //Toast.show('Login com sucesso!!!', Toast.LONG)
          Actions.main()

        }).catch(function(error)
        {
          Toast.show('(1) Usuário/senha inválido', Toast.LONG)
        })

      } catch (error) {        
        Toast.show('(2) Usuário/senha inválido', Toast.LONG)
      }
      finally{

      }

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="E-mail"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={() => this.password.focus()}
          onChangeText={_email => this.setState({ _email })}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="senha"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          ref={(input) => this.password = input}
          onChangeText={_senha => this.setState({ _senha })}
        />
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text style={styles.buttonText}>{this.props.type == 'Criar'? 'Criar Conta': this.props.type}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10
  },
  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }

});