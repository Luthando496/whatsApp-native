import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "../screens/ChatListScreen";
import ChatSettingsScreen from "../screens/ChatSettingsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ChatScreen from '../screens/ChatScreen';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: "",
        headerShadowVisible:false

      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
        name="ChatList"
        component={ChatListScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size} />
          ),
        }}
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};


const MainNavigator = () => {

    return (
        <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={TabNavigator}
        />
        <Stack.Screen
          options={{
            headerTitle: "",
          }}
          name="ChatScreen"
          component={ChatScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "Settings",
          }}
          name="ChatSettings"
          component={ChatSettingsScreen}
        />
      </Stack.Navigator>
    );
};


export default MainNavigator;