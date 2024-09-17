import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileSettingsScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const [login, setLogin] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('userToken');
    
    if (!userId) {
      Alert.alert('Erro', 'ID de usuário não encontrado');
      return;
    }
  
    console.log('Token:', token);
    console.log('UserId:', userId);
  
    if (password === confirmPassword) {
      try {
        const response = await fetch(`https://api.papacapim.just.pro.br/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-session-token": token,
          },
          body: JSON.stringify({
            "user": {
              "login": login,
              "name": nome,
              "password": password,
              "password_confirmation": confirmPassword,
            }
          }),
        });
  
        const data = await response.json();
  
        // Logs detalhados para inspeção
        console.log('Response status:', response.status); // Código de status HTTP
        console.log('Response data:', data); // Resposta completa da API
  
        if (response.ok) {
          Alert.alert("Usuário Atualizado!");
          navigation.navigate("Login");
        } else {
          const errorMessage = data.message || "Erro de atualização";
          Alert.alert("Erro de atualização", errorMessage);
        }
  
      } catch (error) {
        console.error('Erro de conexão:', error);
        Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
      }
    } else {
      Alert.alert("As senhas não coincidem");
    }
  };
  

  const handleDelete = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza de que deseja deletar o usuário?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const userId = await AsyncStorage.getItem('userId');
              const response = await fetch(`https://api.papacapim.just.pro.br/users/${userId}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "x-session-token": token,
                },
              });
  
              if (response.ok) {
                Alert.alert("Usuário deletado com sucesso!");
                navigation.navigate("Login");
              } else {
                const data = await response.json();
                Alert.alert("Erro na exclusão", data.message || "Tente novamente.");
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  

  return (
    <SafeAreaView style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configurações</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileSection}>
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
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.DelButton} onPress={handleDelete}>
          <Text style={styles.DelButtonText}>Excluir Conta</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Postagens')}
      >
        <FontAwesome name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  largeProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: -50,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: 5,
    padding: 15,
    marginTop: 60,
    marginBottom: 80,
    alignItems: 'center',
  },
  DelButton: {
    color: '#ff0000',
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
    marginBottom: -90,
    alignItems: 'center',
  },
  DelButtonText: {
    color: '#ff0F00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#1DA1F2',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  backButton: {
    padding: 10,
  },
});

export default ProfileSettingsScreen;
