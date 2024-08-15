import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PostScreen = ({ navigation, route }) => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    if (postContent.trim() !== '') {
      // Adicionando o novo post à lista de posts na Home
      const newPost = {
        id: Math.random().toString(),
        user: 'Novo Usuario',  // Pode ser substituído pelo nome do usuário real
        content: postContent,
        time: 'Agora',
        image: 'https://via.placeholder.com/150',  // Pode ser substituído por uma imagem real
      };

      // Passando o novo post para a Home
      route.params.addPost(newPost);

      // Retornando para a Home
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Post</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="O que você está pensando?"
        placeholderTextColor="#aaaaaa"
        multiline
        value={postContent}
        onChangeText={setPostContent}
      />
      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Postar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    color: '#ffffff',
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#1DA1F2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostScreen;
