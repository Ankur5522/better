import React from "react";
import { Stack } from "expo-router";
import { Button, Text, View, StyleSheet } from "react-native";
import Login from "./screens/login";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <Button title="Login" onPress={() => router.push('/screens/login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
