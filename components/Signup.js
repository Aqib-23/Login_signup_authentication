import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Fontisto from "@expo/vector-icons/Fontisto";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Feather from "@expo/vector-icons/Feather";

export default function Signup() {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dob, setDob] = useState("");
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showpassword, setshowpassword] = useState(true);
  const [showconfirmpassword, setshowconfirmpassword] = useState(true);

  const genderfunc = (genderparameter) => {
    setgender(genderparameter);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Show picker if the platform is iOS; you can adjust it to false for Android as it's redundant.
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setDob(fDate);
  };

  const showMode = () => {
    setShow(true); 
  };

  const eyeshowpassword = () => {
    setshowpassword(!showpassword);
  };

  const confirmeyeshowpassword = () => {
    setshowconfirmpassword(!showconfirmpassword);
  };

  const handlesignup = () => {
    if (password != confirmpassword) {
      alert("Passwords do not match!");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((newuserinfo) => {
        const user = newuserinfo.user;
        alert("User registered successfully!");
        navigation.navigate("Loginscreen");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: 400 }}>Signup</Text>
      </View>
      <View style={{ padding: 20, gap: 20, flex: 1, justifyContent: "center" }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "black",
            padding: 4,
            top: 40,
          }}
          value={email}
          onChangeText={(text) => setemail(text)}
          placeholder="e-mail"
        ></TextInput>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "black",
            padding: 4,
            top: 40,
          }}
          value={password}
          onChangeText={(text) => setpassword(text)}
          placeholder="Password"
          secureTextEntry={showpassword}
        ></TextInput>
        {showpassword == true ? (
          <Feather
            onPress={() => eyeshowpassword()}
            style={{ bottom: 10, left: 270 }}
            name="eye-off"
            size={24}
            color="black"
          />
        ) : (
          <Feather
            style={{ bottom: 10, left: 270 }}
            onPress={() => eyeshowpassword()}
            name="eye"
            size={24}
            color="black"
          />
        )}
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "black",
            padding: 4,
          }}
          secureTextEntry={showconfirmpassword}
          value={confirmpassword}
          onChangeText={(text) => setconfirmpassword(text)}
          placeholder="confirm-Password"
        ></TextInput>
        {showconfirmpassword == true ? (
          <Feather
            onPress={() => confirmeyeshowpassword()}
            style={{ bottom: 50, left: 270 }}
            name="eye-off"
            size={24}
            color="black"
          />
        ) : (
          <Feather
            style={{ bottom: 50, left: 270 }}
            onPress={() => confirmeyeshowpassword()}
            name="eye"
            size={24}
            color="black"
          />
        )}
        <View>
          <Text>Gender:</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 100,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text>Male</Text>
              {gender == "male" ? (
                <Fontisto name="radio-btn-active" size={24} color="black" />
              ) : (
                <Ionicons
                  onPress={() => genderfunc("male")}
                  name="radio-button-off"
                  size={24}
                  color="black"
                />
              )}
            </View>
            <View
              onPress={() => setgender("female")}
              style={{ flexDirection: "row" }}
            >
              <Text>Female</Text>
              {gender == "female" ? (
                <Fontisto name="radio-btn-active" size={24} color="black" />
              ) : (
                <Ionicons
                  onPress={() => genderfunc("female")}
                  name="radio-button-off"
                  size={24}
                  color="black"
                />
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              marginBottom: 20,
            }}
          >
            Date of Birth: {dob}
          </Text>
          <Button title="Select Date of Birth" onPress={showMode} />

          {show && Platform.OS === "android" && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
              maximumDate={new Date()} // Sets the maximum date to today's date
            />
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Loginscreen")}
            activeOpacity={0.5}
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
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            // onPress={() => navigation.navigate("signupscreen")}
            onPress={handlesignup}
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
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
