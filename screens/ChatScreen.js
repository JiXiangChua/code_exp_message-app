import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import firebase from "../database/firestoreDB";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const db = firebase.firestore();

export default function ChatScreen({ navigation }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      //using auth listener to check when the user comes to your app still logged in,
      //then they dont have to log in again!

      if (user) {
        //if user is logged in
        navigation.navigate("Chat", { id: user.id, email: user.email });
      } else {
        //user was logged out, get kicked back to login page
        navigation.navigate("Login");
      }
    });
  }, []);

  function logout() {
    firebase.auth().signOut(); //sign out for the auth listener
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <Text>Chat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
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
