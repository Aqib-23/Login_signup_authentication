import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
var {width , height} = Dimensions.get('window')

export default function ButtonComp() {
    const navigation = useNavigation()
  return (
    <TouchableOpacity
    activeOpacity={0.5}
    onPress={() => navigation.navigate("forgetpassword")}
  >
    <Text
      style={{
        width: width * 0.3,
        borderWidth: 1,
        textAlign: "center",
        borderRadius: 5,
        backgroundColor: "black",
        color: "white",
        height: 25,
      }}
    >
      ForgetPassword
    </Text>
  </TouchableOpacity>
  )
}