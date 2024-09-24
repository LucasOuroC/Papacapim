import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token:', token); 

      if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
      }

      const response = await fetch('https://api.papacapim.just.pro.br/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-session-token': token, 
        },
      });

      console.log('Status da resposta:', response.status);
      const data = await response.json();
      console.log('Dados da API:', data);

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

  const handleUserPress = (login) => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
      navigation.navigate('UserProfile', { login }); 
    }, 1000); 
  };

  const handleLikePress = (postId) => {
    console.log('Post curtido:', postId);
    // Lógica futura para curtir a postagem
  };

  const handleCommentPress = (postId) => {
    console.log('Comentários para o post:', postId);
    // Navegar para uma tela ou abrir uma aba de comentários
    navigation.navigate('Comments', { postId });
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => handleUserPress(item.user_login)}>
        <Text style={styles.userName}>{item.user_login}</Text>
        <Text style={styles.postText}>{item.message}</Text>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleLikePress(item.id1)}>
          <FontAwesome name="heart-o" size={24} color="#ffffff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCommentPress(item.id)}>
          <FontAwesome name="comment-o" size={24} color="#ffffff" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </TouchableOpacity>
        <Image
          style={styles.headerImagem}
          source={require('../assets/icone.png')}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <FontAwesome name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DA1F2" />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={true} 
        />
      )}

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
    backgroundColor: '#1E1E1E',
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
  headerImagem: {
    width: 30,
    height: 40,
    alignSelf: 'center',
    marginBottom: 5,
    marginLeft: -10,
  },
  postContainer: {
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginTop: 10, 
  },
  userName: {
    color: '#A9A9A9',
    fontWeight: 'bold',
    fontSize: 15,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: '70%',
  },
  icon1: {
    marginLeft: 10,
    fontSize: 20,
  },
  icon: {
    marginLeft: 20,
    fontSize: 20,
  },
});

export default HomeScreen;
