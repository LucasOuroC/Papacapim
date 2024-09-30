import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Não se esqueça de importar AsyncStorage

const ReplyScreen = ({ route, navigation }) => {
  const { postId } = route.params; // Obtém o ID do post da rota
  const [message, setMessage] = useState('');

  // Função para enviar a resposta
  const sendReply = async (postId, message) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('Token de autenticação não encontrado.');
      return;
    }

    try {
      const response = await fetch(`https://api.papacapim.just.pro.br/posts/${postId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-token': token,
        },
        body: JSON.stringify({
          reply: { message }
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log('Resposta enviada com sucesso:', data);
        return data; // Retorna a nova resposta criada
      } else {
        console.error('Erro ao enviar resposta:', response.status);
      }
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
    }
  };

  const handleSendReply = async () => {
    if (message.trim()) {
      const newReply = await sendReply(postId, message); // Chama a função de enviar resposta
      if (newReply) {
        navigation.goBack(); // Retorna para a tela anterior após enviar
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite sua resposta..."
        placeholderTextColor="#888"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="Responder" onPress={handleSendReply} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default ReplyScreen;
