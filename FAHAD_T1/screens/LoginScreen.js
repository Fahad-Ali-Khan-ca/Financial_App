import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    if (!email || !password) {
      Alert.alert("All fields are required");
      return;
    }
    const result = signIn(email, password);
    if (result.success) {
      navigation.replace("Transactions");
    } else {
      Alert.alert("Login Failed", result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finance Tracker</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign In" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});
