import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = ({ route, navigation }) => {
  const { login } = route.params; // login do perfil que está sendo visualizado
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerId, setFollowerId] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (user && user.login) {
      checkFollowing(); // Verifica se o usuário já foi carregado
    }
  }, [user]);

  // Função para carregar o perfil do usuário visualizado
  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`https://api.papacapim.just.pro.br/users/${login}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-session-token': token,
        },
      });
      const data = await response.json();
      setUser(data);
      console.log('Dados do usuário:', data); // Log para verificar dados do usuário
    } catch (error) {
      console.error('Erro ao carregar o usuário:', error);
    }
  };

  // Função para verificar se o usuário autenticado já segue o perfil visualizado
// Função para verificar se o usuário autenticado já segue o perfil visualizado
const checkFollowing = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const currentUserLogin = await AsyncStorage.getItem('userLogin'); // login do usuário autenticado

    const response = await fetch(`https://api.papacapim.just.pro.br/users/${login}/followers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-session-token': token,
      },
    });
    const followers = await response.json();

    console.log('Seguidores retornados:', followers); // Log para verificar seguidores retornados

    // Verificar se o usuário autenticado está na lista de seguidores
    console.log('Login atual:', currentUserLogin)
    const followerRelation = followers.find(follower => follower.follower_login === currentUserLogin);

    if (followerRelation) {
      setIsFollowing(true);
      setFollowerId(followerRelation.follower_id); // Armazena o ID da relação de seguidor
      console.log('Já está seguindo, ID da relação:', followerRelation.follower_id); // Log para confirmar seguimento
    } else {
      setIsFollowing(false);
      setFollowerId(null); // Limpar ID caso não esteja seguindo
      console.log('Não está seguindo ainda.', followerRelation.follower_id); // Log para confirmar que não está seguindo
    }
  } catch (error) {
    console.error('Erro ao verificar o status de seguir:', error);
  }
};


  // Função para seguir ou deixar de seguir
  const handleFollow = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (isFollowing) {
        // Deixar de seguir
        const response = await fetch(`https://api.papacapim.just.pro.br/users/${login}/followers/${followerId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-session-token': token,
          },
        });

        if (response.status === 204) {
          setIsFollowing(false);
          setFollowerId(null);
          Alert.alert('Você deixou de seguir');
        } else {
          Alert.alert('Erro ao deixar de seguir.');
        }
      } else {
        // Seguir
        const response = await fetch(`https://api.papacapim.just.pro.br/users/${login}/followers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-session-token': token,
          },
        });

        const data = await response.json();

        if (response.status === 201) {
          setIsFollowing(true);
          setFollowerId(data.id);  // Armazena o ID da relação criada
          Alert.alert('Você está seguindo');
        } else if (data?.followed_id?.[0] === 'has already been taken') {
          // Se a API informar que o seguidor já existe
          Alert.alert('Você já está seguindo este usuário.');
        } else {
          Alert.alert('Erro ao seguir.');
        }
      }
    } catch (error) {
      console.error('Erro ao seguir/deseguir o usuário:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace("Home")}>
          <FontAwesome name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{user.name || 'Usuário'}</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.userName}>@{user.login}</Text>
        <Text style={styles.userCreatedAt}>
          Membro desde {new Date(user.created_at).toLocaleDateString()}
        </Text>
        <TouchableOpacity
          style={[styles.followButton, isFollowing ? styles.unfollowButton : styles.followButton]}
          onPress={handleFollow}
        >
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Deixar de Seguir' : 'Seguir'}
          </Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  userName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userCreatedAt: {
    color: '#aaaaaa',
    marginTop: 10,
    fontSize: 16,
  },
  followButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#1DA1F2',
    borderRadius: 5,
  },
  unfollowButton: {
    backgroundColor: '#FF6347',
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default UserProfileScreen;
