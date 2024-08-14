import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const posts = [
  {
    id: '1',
    user: 'User1',
    content: 'This is a sample tweet. #reactnative',
    time: '2h ago',
    image: 'https://via.placeholder.com/150' 
  },
  {
    id: '2',
    user: 'User2',
    content: 'Another example tweet to show the layout.',
    time: '5h ago',
    image: 'https://via.placeholder.com/150'
  },
];

const HomeScreen = () => {
  const navigation = useNavigation(); 
  const { top, bottom } = useSafeAreaInsets(); 

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postContent}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={styles.postText}>{item.content}</Text>
        <Text style={styles.postTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()} // Abre o menu lateral
        >
          <Image
            source={require('../assets/icon.png')} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
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
        onPress={() => navigation.navigate('Postagens')} // Navega para a tela de postagens
      >
        <FontAwesome name="plus" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Cor de fundo escura
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    justifyContent: 'space-between', // Adiciona espaço entre os itens
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
  buttonBack: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 5,
    width: 80,
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
