import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]); // Estado para armazenar posts curtidos
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
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

      if (Array.isArray(data)) {
        setPosts(data);
        // Após carregar os posts, buscar curtidas
        await checkLikedPosts(data);
      } else {
        console.error('A resposta da API não é um array:', data);
      }
    } catch (error) {
      console.error('Erro ao carregar os posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkLikedPosts = async (posts) => {
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userLogin'); // Pegando o Login do usuário logado

    console.log('User ID do AsyncStorage:', userId);

    if (!token || !userId) {
        console.error('Token ou userId não encontrados.');
        return;
    }

    try {
        const likedPostIds = [];
        for (const post of posts) {
            const response = await fetch(`https://api.papacapim.just.pro.br/posts/${post.id}/likes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-session-token': token,
                },
            });

            if (response.status === 200) {
                const likes = await response.json();
                console.log(`Curtidas para o post ${post.id}:`, likes);

                // Verificar se o usuário logado curtiu o post
                if (likes.some(like => like.user_login.toLowerCase() === userId.toLowerCase())) {
                    likedPostIds.push(post.id);
                }
            } else {
                console.error(`Erro ao carregar curtidas para o post ${post.id}:`, response.status);
            }
        }
        setLikedPosts(likedPostIds); // Atualiza os posts curtidos
        console.log('Posts curtidos:', likedPostIds); // Verifica os IDs atualizados
    } catch (error) {
        console.error('Erro ao buscar curtidas:', error);
    }
};

  

  const handleLikePress = async (postId) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('Token de autenticação não encontrado.');
      return;
    }

    const isLiked = likedPosts.includes(postId);

    try {
      if (isLiked) {
        const userID = await AsyncStorage.getItem('userId');
        const response = await fetch(`https://api.papacapim.just.pro.br/posts/${postId}/likes/${userID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-session-token': token,
          },
        });

        if (response.status === 200 || response.status === 204) {
          console.log(`Post ${postId} descurtido com sucesso.`);
          setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.filter((id) => id !== postId)
          );
        } else {
          console.error('Erro ao descurtir o post:', response.status);
        }
      } else {
        const response = await fetch(`https://api.papacapim.just.pro.br/posts/${postId}/likes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-session-token': token,
          },
        });

        if (response.status === 201) {
          const data = await response.json();
          console.log('Post curtido com sucesso:', data);
          setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
        } else {
          console.error('Erro ao curtir o post:', response.status);
        }
      }
    } catch (error) {
      console.error('Erro ao curtir/descurtir o post:', error);
    }
  };
  
  const handleUserPress = (login) => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
      navigation.navigate('UserProfile', { login }); 
    }, 1000); 
  };


  const handleCommentPress = (postId) => {
    navigation.navigate('ReplyScreen', { postId }); // Navega para a tela de resposta
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => handleUserPress(item.user_login)}>
        <Text style={styles.userName}>@{item.user_login}</Text>
        <Text style={styles.postText}>{item.message}</Text>
        <Text style={styles.postData}>
          {item.created_at.split('T')[0]}
        </Text>

        
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleLikePress(item.id)}>
          <FontAwesome
            name={likedPosts.includes(item.id) ? 'heart' : 'heart-o'}
            size={24}
            color={likedPosts.includes(item.id) ? 'red' : '#ffffff'}
            style={styles.icon}
          />
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
          <FontAwesome name="bars" size={24} color="#FFF" style={styles.icon} />
        </TouchableOpacity>
        <Image
          style={styles.headerImagem}
          source={require('../assets/icone.png')}
        />
        <TouchableOpacity
          style={styles.settingsButton}
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
        onPress={() => navigation.navigate('Postagens')}
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
  headerImagem: {
    width: 30,
    height: 40,
    alignSelf: 'center',
    marginBottom: 5,
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
  postData: {
    color: '#A9A9A9',
    marginTop: 30,
    marginBottom: -20,
    fontSize: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 2,
    marginLeft: '70%',
  },
  icon: {
    marginLeft: 20,
    fontSize: 20,
  },
  settingsButton: {
    padding: 10,
  },
});

export default HomeScreen;
