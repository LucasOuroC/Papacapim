import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userLogin, setUserLogin] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const login = await AsyncStorage.getItem('userLogin');
      setUserLogin(login);

      try {
        // Carregar seguidores
        const followersResponse = await fetch(`https://api.papacapim.just.pro.br/users/${login}/followers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-session-token': token,
          },
        });

        if (!followersResponse.ok) {
          const errorText = await followersResponse.text();
          console.error('Erro ao carregar seguidores:', errorText);
          Alert.alert('Erro', 'Não foi possível carregar os seguidores.');
          return;
        }

        const followersText = await followersResponse.text();
        const followersData = JSON.parse(followersText);
        setFollowers(followersData);

        // Carregar quem o usuário segue
        const followingResponse = await fetch(`https://api.papacapim.just.pro.br/users/${login}/following`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-session-token': token,
          },
        });

        if (!followingResponse.ok) {
          if (followingResponse.status === 404) {
            Alert.alert('Atenção', 'Você não está seguindo ninguém.');
          } else {
            const errorText = await followingResponse.text();
            console.error('Erro ao carregar seguindo:', errorText);
            Alert.alert('Erro', 'Não foi possível carregar quem você está seguindo.');
          }
          return;
        }

        const followingText = await followingResponse.text();
        const followingData = JSON.parse(followingText);
        setFollowing(followingData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        Alert.alert('Erro de conexão', 'Não foi possível conectar ao servidor.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <Text style={styles.sectionTitle}>Seguidores</Text>
      {followers.length === 0 ? (
        <Text style={styles.noDataText}>Você não tem seguidores.</Text>
      ) : (
        <FlatList
          data={followers}
          keyExtractor={(item) => item.follower_login || item.login}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.listItemText}>@{item.follower_login}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.sectionTitle}>Seguindo</Text>
      {following.length === 0 ? (
        <Text style={styles.noDataText}>Você não está seguindo ninguém.</Text>
      ) : (
        <FlatList
          data={following}
          keyExtractor={(item) => item.followed_login || item.login}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.listItemText}>@{item.followed_login}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 20,
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
});

export default SettingsScreen;
