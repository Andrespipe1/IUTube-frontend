import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../views/HomeScreen";
import SearchScreen from "../views/SearchScreen";
import DownloadsScreen from "../views/DownloadScreen";
import SettingsScreen from "../views/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Buscar" component={SearchScreen} />
        <Tab.Screen name="Descargas" component={DownloadsScreen} />
        <Tab.Screen name="Ajustes" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
