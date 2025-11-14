import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../views/HomeScreen";
import SearchScreen from "../views/SearchScreen";
import DownloadsScreen from "../views/DownloadScreen";
import SettingsScreen from "../views/SettingsScreen";
import PlayerScreen from "../views/PlayerScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SearchMain" 
        component={SearchScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Player" 
        component={PlayerScreen}
        options={{ 
          title: "Reproductor",
          headerShown: true 
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Inicio") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Buscar") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Descargas") {
              iconName = focused ? "download" : "download-outline";
            } else if (route.name === "Ajustes") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#ff4444",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Buscar" component={SearchStack} />
        <Tab.Screen name="Descargas" component={DownloadsScreen} />
        <Tab.Screen name="Ajustes" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
