import React from 'react';
import {createSwitchNavigator, createAppContainer} from "react-navigation";
import LoginScreen from "./screens/LoginScreen";
import {DrawerNavigator} from "./navigation/DrawerNavigator";

export default function App() {
  return (
    <LoginScreen/>
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  DrawerNavigator: DrawerNavigator,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);