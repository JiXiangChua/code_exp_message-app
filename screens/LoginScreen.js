import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import firebase from "../database/firestoreDB";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        <TouchableOpacity style={styles.loginButton} onPress={null}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 30,
    justifyContent: "center",
    paddingBottom: "50%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    marginBottom: 20,
  },
  fieldTitle: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    width: "90%",
    padding: 10,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "blue",
    padding: 20,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});
