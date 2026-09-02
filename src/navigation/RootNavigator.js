import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

import AuthStack from "./AuthStack";
import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoggedIn(!!token);
    setLoading(false);
  };
  
  useEffect(() => {
    checkLogin();
    const interval = setInterval(checkLogin, 500);
    return () => clearInterval(interval);
  }, []);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return loggedIn ? <AppNavigator /> : <AuthStack />;
}