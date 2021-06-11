import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import firebase from "../database/firestoreDB";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";

const db = firebase.firestore().collection("messages");

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  //useEffect to handle logging in and out and setting up the db
  useEffect(() => {
    const unsubscribe = db
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        const serverMessages = collectionSnapshot.docs.map((docs) =>
          docs.data()
        );
        setMessages(serverMessages);
      });

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
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });

    return unsubscribe;
  }, []);

  //useEffect to handle the chat messages
  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: "Hello there!",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any",
    //     },
    //   },
    // ]);
  }, []);

  //   const onSend = useCallback((messages = []) => {
  //     setMessages((previousMessages) =>
  //       GiftedChat.append(previousMessages, messages)
  //     );
  //   }, []);

  function sendMessages(newMessages) {
    //let's see what's inside
    console.log(newMessages);
    // send the message in there to our db
    db.add(newMessages[0]);
    //the message order is reversed, for some reason
    //no need this any more becuz we retrieve from db
    //setMessages([...newMessages, ...messages]);
  }

  function logout() {
    firebase.auth().signOut(); //sign out for the auth listener
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => sendMessages(messages)}
      user={{
        _id: 1,
      }}
    />
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
