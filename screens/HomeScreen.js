import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    // Carregar os posts armazenados ao inicializar a tela
    loadPosts();
  }, []);

  // Função para carregar posts do AsyncStorage
  const loadPosts = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem('@posts');
      if (storedPosts !== null) {
        setPosts(JSON.parse(storedPosts));
      } else {
        // Se não houver posts salvos, usar os dados de exemplo
        const examplePosts = [
          { id: '1', name: 'John Doe', description: 'Developer at XYZ', content: 'This is a sample tweet. #reactnative', time: '2h ago', image: 'https://via.placeholder.com/150' },
          { id: '2', name: 'Jane', description: 'Designer at ABC', content: 'Another example tweet to show the layout.', time: '5h ago', image: 'https://via.placeholder.com/150' },
          { id: '3', name: 'Alice', description: 'Product Manager at LMN', content: 'Another example tweet to show the layout.', time: '6h ago', image: 'https://via.placeholder.com/150' },
          { id: '4', name: 'Bob', description: 'CTO at Startup', content: 'Another example tweet to show the layout.', time: '7h ago', image: 'https://via.placeholder.com/150' },
          { id: '5', name: 'Charlie', description: 'Engineer at QRS', content: 'Another example tweet to show the layout.', time: '9h ago', image: 'https://via.placeholder.com/150' },
        ];
        setPosts(examplePosts);
        await AsyncStorage.setItem('@posts', JSON.stringify(examplePosts));
      }
    } catch (error) {
      console.error('Erro ao carregar os posts:', error);
    }
  };

  // Função para renderizar cada item do FlatList
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId: item.id })}>
        <Image source={{ uri: item.image }} style={styles.postImage} />
      </TouchableOpacity>
      <View style={styles.postContent}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.postText}>{item.content}</Text>
        <Text style={styles.postTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image source={require('../assets/Lucas Perfil.jpg')} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
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
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Postagens')}
      >
        <FontAwesome name="plus" size={24} color="#ffffff"/>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Definições de estilo
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
  postContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  postImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
  },
  userName: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postText: {
    color: '#ffffff',
    marginBottom: 5,
  },
  postTime: {
    color: '#aaaaaa',
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
