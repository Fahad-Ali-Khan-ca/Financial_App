import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const { theme } = useTheme();
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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Finance Tracker</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Sign in to manage your finances
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={theme.textMuted}
          keyboardType="email-address"
          style={[styles.input, {
            backgroundColor: theme.inputBg,
            borderColor: theme.inputBorder,
            color: theme.text,
          }]}
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={theme.textMuted}
          secureTextEntry
          style={[styles.input, {
            backgroundColor: theme.inputBg,
            borderColor: theme.inputBorder,
            color: theme.text,
          }]}
        />
        <TouchableOpacity style={[styles.signInBtn, { backgroundColor: theme.primary }]} onPress={onSubmit}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  card: {
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 4 },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 24 },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 14,
    borderRadius: 8,
    fontSize: 15,
  },
  signInBtn: {
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
