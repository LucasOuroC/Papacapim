import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userLogin, setUserLogin] = useState('');
  const [userName, setUserName] = useState('');
  const [userCreatedAt, setUserCreatedAt] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const login = await AsyncStorage.getItem('userLogin');
      setUserLogin(login);

      try {
        const userResponse = await fetch(`https://api.papacapim.just.pro.br/users/${login}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-session-token': token,
          },
        });

        const userData = await userResponse.json();
        setUserName(userData.name);
        setUserCreatedAt(new Date(userData.created_at).toLocaleDateString());

        const followersResponse = await fetch(`https://api.papacapim.just.pro.br/users/${login}/followers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-session-token': token,
          },
        });

        const followersData = await followersResponse.json();
        setFollowers(followersData);

        const postsResponse = await fetch(`https://api.papacapim.just.pro.br/users/${login}/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-session-token': token,
          },
        });

        const postsData = await postsResponse.json();
        setPosts(postsData);
      } catch (error) {
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor.');
      }
    };

    fetchUserData();
  }, []);

  const deletePost = async (postId) => {
    const token = await AsyncStorage.getItem('userToken');

    try {
      const response = await fetch(`https://api.papacapim.just.pro.br/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-session-token': token,
        },
      });

      if (response.status === 204) {
        Alert.alert('Sucesso', 'Postagem excluída com sucesso!');
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        Alert.alert('Erro', 'Não foi possível excluir a postagem.');
      }
    } catch (error) {
      Alert.alert('Erro de conexão', 'Não foi possível excluir a postagem.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <FontAwesome name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName || 'Usuário'}</Text>
        <Text style={styles.userLogin}>@{userLogin}</Text>
        <Text style={styles.userCreatedAt}>Membro desde {userCreatedAt}</Text>
      </View>

      <Text style={styles.sectionTitle}>Seguidores</Text>
      {followers.length === 0 ? (
        <Text style={styles.noDataText}>Você não tem seguidores.</Text>
      ) : (
        <FlatList
          data={followers}
          keyExtractor={(item) => `${item.follower_id}-${item.followed_id}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.listItemText}>@{item.follower_login}</Text>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 200 }}
        />
      )}

      <Text style={styles.sectionTitle}>Minhas Postagens</Text>
      {posts.length === 0 ? (
        <Text style={styles.noDataText}>Você ainda não tem postagens.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postItem}>
              <Text style={styles.postText}>{item.message}</Text>
              <Text style={styles.postDate}>{item.created_at.split('T')[0]}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePost(item.id)}
              >
                <FontAwesome name="trash" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 24,
    color: '#ffffff',
  },
  userInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userName: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  userLogin: {
    fontSize: 18,
    color: '#aaaaaa',
  },
  userCreatedAt: {
    fontSize: 16,
    color: '#888888',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  noDataText: {
    color: '#ffffff',
    fontStyle: 'italic',
    marginVertical: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#2A2A2A',
    borderRadius: 5,
    marginVertical: 5,
  },
  listItemText: {
    color: '#ffffff',
  },
  postItem: {
    padding: 10,
    backgroundColor: '#2A2A2A',
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postText: {
    color: '#ffffff',
    fontSize: 16,
    flex: 1,
  },
  postDate: {
    color: '#888888',
    fontSize: 12,
    marginLeft: 10,
  },
  deleteButton: {
    padding: 5,
  },
});

export default SettingsScreen;
