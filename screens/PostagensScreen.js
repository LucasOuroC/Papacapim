import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PostScreen = ({ navigation, route }) => {
  const [postContent, setPostContent] = useState('');

  const handlePost = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token:', token); 

      if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
      }

      if (postContent.trim() === '') {
        console.warn('O conteúdo do post não pode estar vazio.');
        return;
      }

      const response = await fetch('https://api.papacapim.just.pro.br/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-session-token": token,
        },
        body: JSON.stringify({
          post: {
            message: postContent,
          },
        }),
      });

      console.log('Status da resposta:', response.status); 

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Text: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Resposta da API:', responseData);

      if (route.params?.addPost) {
        route.params.addPost(responseData);
      }

      navigation.replace("Home");
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Ajuste conforme necessário
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    marginTop: 30,
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
    padding: '5%',
    paddingBottom: '20%',
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
