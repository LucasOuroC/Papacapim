import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from "react-native-animatable";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const backhome = () => {
    navigation.replace('Login')
  }

  const handleRegister = () => {
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        
        navigation.replace('Home');
      } else {
        alert('As senhas não coincidem');
      }
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.central}>
        <TouchableOpacity style={styles.buttonBack} onPress={backhome}>
          <Text style={styles.textbBack}> 
            Back
          </Text>
        </TouchableOpacity>
        <Animatable.Image 
        resizeMode='contain'
        animation="flipInY"
        style={styles.img}
        source={require('../assets/icone.png')}
      />
        <Text style={styles.title}>Cadastro Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme a Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button1} onPress={handleRegister}> 
        <Text style={styles.textb1}>
          Cadastrar
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  buttonBack: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 25,
    marginHorizontal: 5,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  textbBack: {
    color: '#000000',
    fontSize: 17,
  },
  button1: {
    borderRadius: 10,
    backgroundColor: '#0033A0',   
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    elevation: 3,
  },
  textb1: {
    color: '#ffffff',
    fontSize: 17,
  },
  central: {
    padding: 10,
    height: 600
  },
  img: {
    width: 130,
    height: 180,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
});
