import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
          <Text>
            Voltar
          </Text>
        </TouchableOpacity>
        <Image 
          source = {require('../assets/icone.png')} 
          style={styles.img}
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text>
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
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonBack: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 5,
    width: 80,
    marginBottom: 10,
    alignItems: 'center',
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
  },
});
