import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native"; 
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CadastroScreen from "./screens/CadastroScreen";
import PostagensScreen from "./screens/PostagensScreen";
import PerfilScreen from "./screens/PerfilScreen";
import UserProfileScreen from "./screens/UserProfileScreen"
import BuscaProfileScreen from "./screens/BuscaProfileScreen"
import UserPerfilScreen from "./screens/UserPerfilScreen"
import ReplyScreen from "./screens/ReplyScreen"

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//Drawer com aba lateral da home
function CustomDrawerContent(props) {
  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={() => props.navigation.navigate("Perfil")}>
          <Text
            style={styles.drawerItem1}
          >
            Configuração do Perfil
          </Text>
      </TouchableOpacity>
      <Text
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate("UserPerfil")}
      >
        Perfil Usuario
      </Text>
      <Text
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate("Postagens")}
      >
        Fazer uma canção
      </Text>
      <Text
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate("BuscaProfile")}
      >
        Realizar uma busca por Usuario
      </Text>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Postagens" component={PostagensScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="BuscaProfile" component={BuscaProfileScreen} />
      <Drawer.Screen name="UserPerfil" component={UserPerfilScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Cadastro"
          component={CadastroScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Perfil"
          component={PerfilScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Postagens"
          component={PostagensScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UserProfile"
          component={UserProfileScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BuscaProfile"
          component={BuscaProfileScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UserPerfil"
          component={UserPerfilScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ReplyScreen"
          component={ReplyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1E1E1E",
  },
  drawerItem: {
    marginVertical: 16,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  drawerItem1: {
    marginTop: 80,
    marginLeft: 0,
    marginBottom: 20,
    marginVertical: 16,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 70,
  },
});
