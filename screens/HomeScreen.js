import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token:', token); // Verifica se o token está sendo recuperado corretamente

      if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
      }

      const response = await fetch('https://api.papacapim.just.pro.br/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-session-token': token, // Certifique-se de que este é o cabeçalho correto
        },
      });

      console.log('Status da resposta:', response.status);
      const data = await response.json();
      console.log('Dados da API:', data);

      // Verifica se a resposta é um array
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.error('A resposta da API não é um array:', data);
      }
    } catch (error) {
      console.error('Erro ao carregar os posts:', error);
    }
  };

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.userName}>{item.user_login}</Text>
      <Text style={styles.postText}>{item.message}</Text>
    </View>
  );

  const backhome = async () => {
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

      console.log('Response status:', response.status); 
      console.log('Response data:', data); 

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
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <FontAwesome name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Postagens', { addPost })}
      >
        <FontAwesome name="plus" size={24} color="#ffffff"/>
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
    marginTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
    flex: 1,
  },
  postContainer: {
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  userName: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  postText: {
    color: '#ffffff',
    marginTop: 5,
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

export default HomeScreen;
