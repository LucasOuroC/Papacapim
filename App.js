import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'; // Certifique-se de importar todos os componentes necessários
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CadastroScreen from './screens/CadastroScreen';
import PostagensScreen from './screens/PostagensScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerItem} onPress={() => props.navigation.navigate('Home')}>Home</Text>
      <Text style={styles.drawerItem} onPress={() => props.navigation.navigate('Postagens')}>Postagens</Text>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Postagens" component={PostagensScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen options={{ headerShown: false }} name="Cadastro" component={CadastroScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Postagens" component={PostagensScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1E1E1E',
  },
  drawerItem: {
    marginVertical: 16,
    color: '#ffffff',
    fontSize: 18,
  },
});
