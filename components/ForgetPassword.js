import { View, Text, Button, Alert } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "expo-router";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgetPassword() {
  const navigation = useNavigation();

  const [savepassword, setsavepassword] = useState("");
  const [confirmsavepassword, setconfirmsavepassword] = useState("");
  const [eyeshowpassword, seteyeshowpasswords] = useState(true);
  const [confirmeyeshowpassword, setconfirmeyeshowpasswords] = useState(true);
  const [email, setemail] = useState("");

  const updatepassword = () => {
    if (email === "") {
      Alert.alert("Error", "Please enter your email address.");
    }
    // this condition were valid when my password and confirm password fileds were present now there were no fields so it commented
    // else if (savepassword === "" || confirmsavepassword === "") {
    //   Alert.alert("Error", "Please fill out both password fields.");
    // } else if (savepassword !== confirmsavepassword) {
    //   Alert.alert(
    //     "Error",
    //     "Passwords do not match. Please enter the same password in both fields."
    //   );
    // } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(savepassword)) {
    //   Alert.alert(
    //     "Error",
    //     "Password must contain at least one special character."
    //   );
    // }
    else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert(
            "Password Reset",
            "Password reset email has been sent. Please check your inbox."
          );
          setemail("");
          setsavepassword("");
          setconfirmsavepassword("");
          navigation.navigate("Loginscreen");
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            Alert.alert(
              "Error",
              "This email is not registered. Please sign up."
            );
            navigation.navigate("signupscreen");
          } else {
            Alert.alert("Error", error.message);
          }
        });
    }
  };

  const password = (text) => {
    setsavepassword(text);
  };

  const confirmpassword = (text) => {
    setconfirmsavepassword(text);
  };

  const shownpassword = () => {
    seteyeshowpasswords(!eyeshowpassword);
  };

  const confirmshownpassword = () => {
    setconfirmeyeshowpasswords(!confirmeyeshowpassword);
  };

  return (
    <View style={{ padding: 30, gap: 1, flex: 1, justifyContent: "center" }}>
      <TextInput
        onChangeText={(text) => setemail(text)}
        style={{
          borderWidth: 1,
          padding: 3,
          textAlign: "center",
          marginVertical: 20,
        }}
        placeholder="Enter your email"
        value={email}
      />
      {/* <TextInput
        secureTextEntry={eyeshowpassword}
        onChangeText={password}
        style={{ borderWidth: 1, padding: 3, textAlign: "center" }}
        placeholder="New password"
        value={savepassword}
      />
      {eyeshowpassword ? (
        <Feather
          onPress={() => shownpassword()}
          style={{ bottom: 30, left: 270 }}
          name="eye-off"
          size={24}
          color="black"
        />
      ) : (
        <Feather
          onPress={() => shownpassword()}
          style={{ bottom: 30, left: 270 }}
          name="eye"
          size={24}
          color="black"
        />
      )}
      <TextInput
        secureTextEntry={confirmeyeshowpassword}
        onChangeText={confirmpassword}
        style={{ borderWidth: 1, padding: 3, textAlign: "center" }}
        placeholder="Confirm Password"
        value={confirmsavepassword}
      />
      {confirmeyeshowpassword ? (
        <Feather
          onPress={() => confirmshownpassword()}
          style={{ bottom: 30, left: 270 }}
          name="eye-off"
          size={24}
          color="black"
        />
      ) : (
        <Feather
          onPress={() => confirmshownpassword()}
          style={{ bottom: 30, left: 270 }}
          name="eye"
          size={24}
          color="black"
        />
      )} */}
      <Button onPress={updatepassword} title="Update Password" />
    </View>
  );
}
