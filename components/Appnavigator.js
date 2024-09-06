import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Forget from '../components/ForgetPassword'
import Home from '../components/Home'


export default function Appnavigator() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Loginscreen" component={Login}></Stack.Screen>
        <Stack.Screen options={{headerShown:false}} name="signupscreen" component={Signup}></Stack.Screen>
        <Stack.Screen options={{headerShown:false}} name='forgetpassword' component={Forget}></Stack.Screen>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
    </Stack.Navigator>
  );
}
