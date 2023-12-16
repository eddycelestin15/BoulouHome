import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';

import Dashboard from "../Screens/Dashboard";
import Activity from "../Screens/Activity";
import User from "../Screens/User";


const BottomTab = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <BottomTab.Navigator
          initialRouteName="Menu"
          screenOptions={{
            tabBarStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              elevation: 0,
              borderTopWidth: 0,
              position: "absolute"
            },
            tabBarBackground: () => {
              <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
            },
            headerShown: false,
            tabBarActiveBackgroundColor: "yellow",
          }}>
          <BottomTab.Screen
            name="Menu"
            component={Dashboard}
            options={{
              tabBarIcon: () => (
                <Icon
                  name="home"
                  color="#600150"
                  backgroundColor="transparent"
                  size={20}
                />
              )
            }}
          />
          <BottomTab.Screen
            name="Activité"
            component={Activity}
            options={{
              tabBarIcon: () => (
                <Icon
                  name="gears"
                  color="#600150"
                  backgroundColor="transparent"
                  size={20}
                />
              )
            }}
          />
          <BottomTab.Screen
            name="Profil"
            component={User}
            options={{
              tabBarIcon: () => (
                <Icon
                  name="user-o"
                  color="#600150"
                  backgroundColor="transparent"
                  size={20}
                />
              )
            }}
          />
        </BottomTab.Navigator>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTabIcon: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});