import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SearchUserScreen = ({ navigation }) => {
  const [userLogin, setUserLogin] = useState('');
  const [userData, setUserData] = useState(null);

  
  const handleSearch = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
      }

      if (userLogin.trim() === '') {
        Alert.alert('Erro', 'O campo de login não pode estar vazio.');
        return;
      }

      const response = await fetch(`https://api.papacapim.just.pro.br/users/${userLogin}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "x-session-token": token,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
      console.log('Dados do usuário:', data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      Alert.alert('Erro', 'Erro ao buscar o usuário. Verifique o login e tente novamente.');
    }
  };


  const handleOpenProfile = () => {
    if (userData) {
      navigation.navigate('UserProfile', { login: userData.login });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace("Home")}>
          <FontAwesome name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buscar Usuário</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Digite o login do usuário"
        placeholderTextColor="#aaaaaa"
        value={userLogin}
        onChangeText={setUserLogin}
      />

      {userData && (
        <TouchableOpacity style={styles.userContainer} onPress={handleOpenProfile}>
          <Text style={styles.userText}>{userData.name}</Text>
          <Text style={styles.userTextLogin}>@{userData.login}</Text>
          <Text style={styles.userTextData}>Usuário desde: {new Date(userData.created_at).toLocaleDateString()}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#ffffff',
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1DA1F2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userContainer: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: '100%',
  },
  userText: {
    color: '#ffffff',
    fontSize: 19,
    marginBottom: 5,
  },
  userTextLogin: {
    color: '#A9A9A9',
    fontSize: 16,
    marginBottom: 5,
  },
  userTextData: {
    color: '#A9A9A9',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SearchUserScreen;
