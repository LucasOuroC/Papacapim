import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from "react-native-animatable";

export default function RegisterScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const backhome = () => {
    navigation.replace('Login')
  }

  const handleRegister = async () => {
    if (login && nome && password && confirmPassword) {
      if (password === confirmPassword) {
        
        try {
          const response = await fetch("https://api.papacapim.just.pro.br/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             "user":{
              "login": login,
              "name": nome,
              "password": password,
              "password_confirmation": confirmPassword,
             }
            }),
          });
          const data = await response.json();
          console.log(data)

          if (response.ok) {
            Alert.alert("Usuario Criado!");
            navigation.navigate("Login");
          } else {
            Alert.alert("Erro de criação", data.message || "Tente novamente.")
          }

        } catch (error) {
          console.error(error);
          Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
        }
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
          placeholder="Login"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
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
    backgroundColor: '#00008b',   
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
