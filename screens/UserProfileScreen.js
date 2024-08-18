import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const UserProfileScreen = ({ route, navigation }) => {
  const { top, bottom } = useSafeAreaInsets();
  const [user, setUser] = useState(null);
  const { userId } = route.params;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedPosts = await AsyncStorage.getItem('@posts');
        const posts = storedPosts ? JSON.parse(storedPosts) : [];
        const userData = posts.find(post => post.id === userId);
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
      }
    };

    loadUserData();
  }, [userId]);

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{user.name}</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userHandle}>@{user.userId}</Text>
        <Text style={styles.userDescription}>{user.description}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>150</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>300</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#1E1E1E',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderColor: '#1DA1F2',
    borderWidth: 2,
  },
  userName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userHandle: {
    color: '#aaaaaa',
    fontSize: 16,
    marginBottom: 10,
  },
  userDescription: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#aaaaaa',
    fontSize: 14,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default UserProfileScreen;
