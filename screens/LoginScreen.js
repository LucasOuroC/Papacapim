import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // Redireciona ao cadastro
  const goCad = () => {
    navigation.replace('Cadastro');
  };

  // Logica de login para a acesso 
  const handleLogin = async () => {
    try {
      const response = await fetch("https://api.papacapim.just.pro.br/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login, // Usa o valor do estado login
          password: password, // Usa o valor do estado password
        }),
      });

      const data = await response.json();

      // Adicione este console.log para verificar o conteúdo da resposta
      console.log(data);

      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token);
        Alert.alert("Login bem-sucedido!");
        navigation.navigate("Home");
      } else {
        // Verifica se a resposta contém uma mensagem de erro e exibe-a
        const errorMessage = data.message || "Tente novamente.";
        Alert.alert("Erro no login", errorMessage);
      }
        
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Image 
        resizeMode='contain'
        animation="flipInY"
        style={styles.img}
        source={require('../assets/icone.png')}
      />
      <Text style={styles.title}>Papacapim</Text>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.textb1}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={goCad}>
        <Text style={styles.textb2}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#00008b',   
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textb1: {
    color: '#ffffff',
    fontSize: 17,
  },
  button2: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  textb2: {
    color: '#000000',
    fontSize: 17,
  },
  img: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
