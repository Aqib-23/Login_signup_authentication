import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");
import ButtonComp from "../components/ButtonComp";
import Feather from "@expo/vector-icons/Feather";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [showpassword, setshowpassword] = useState(true);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const eyepassword = () => {
    setshowpassword(!showpassword);
  };

  const navigation = useNavigation();

  const handlelogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userinfo) => {
        const user = userinfo.user;
        Alert.alert("Success", "Login successful");
        navigation.navigate("Home");
        setemail("");
        setpassword("");
      })
      .catch((error) => {
        if (error.message === "auth/user-not-found") {
          // Navigate to the signup screen if the user is not found
          Alert.alert("Error", "This email is not registered. Please sign up.");
          navigation.navigate("signupscreen"); // Ensure the route is correct
        } else if (error.code === "auth/wrong-password") {
          Alert.alert("Error", "Incorrect password. Please try again.");
        } else {
          Alert.alert("Error gt", error.message);
        }
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: 400 }}>Login</Text>
      </View>
      <View style={{ padding: 20, gap: 20, flex: 1, justifyContent: "center" }}>
        <TextInput
          value={email}
          onChangeText={(text) => setemail(text)}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "black",
            padding: 4,
          }}
          placeholder="e-mail"
        />
        <TextInput
          secureTextEntry={showpassword}
          value={password}
          onChangeText={(text) => setpassword(text)}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "black",
            padding: 4,
          }}
          placeholder="Password"
        />
        {showpassword == true ? (
          <Feather
            onPress={() => eyepassword()}
            style={{ bottom: 50, left: 270 }}
            name="eye-off"
            size={24}
            color="black"
          />
        ) : (
          <Feather
            onPress={() => eyepassword()}
            style={{ bottom: 50, left: 270 }}
            name="eye"
            size={24}
            color="black"
          />
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={handlelogin} activeOpacity={0.5}>
            <Text
              style={{
                width: width * 0.2,
                borderWidth: 1,
                textAlign: "center",
                borderRadius: 5,
                backgroundColor: "black",
                color: "white",
                height: 25,
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
          <ButtonComp />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("signupscreen")}
          >
            <Text
              style={{
                width: width * 0.2,
                borderWidth: 1,
                textAlign: "center",
                borderRadius: 5,
                backgroundColor: "black",
                color: "white",
                height: 25,
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
