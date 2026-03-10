import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useTransactions } from "../context/TransactionsContext";

export default function SettingsScreen({ navigation }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { transactions } = useTransactions();

  const parentNav = navigation.getParent();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          signOut();
          if (parentNav) parentNav.replace("Login");
          else navigation.replace("Login");
        },
      },
    ]);
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear Data",
      "This will reset all transactions to default. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => Alert.alert("Note", "Feature coming in next update."),
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* profile section */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Account</Text>
        <View style={styles.row}>
          <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Email</Text>
          <Text style={[styles.rowValue, { color: theme.text }]}>{user?.email || "N/A"}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Transactions</Text>
          <Text style={[styles.rowValue, { color: theme.text }]}>{transactions.length}</Text>
        </View>
      </View>

      {/* appearance */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Appearance</Text>
        <View style={styles.row}>
          <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: "#ccc", true: "#64b5f6" }}
            thumbColor={isDark ? "#1976d2" : "#f4f4f4"}
          />
        </View>
      </View>

      {/* data */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Data</Text>
        <TouchableOpacity onPress={handleClearData}>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: theme.negative }]}>
              Reset Transactions
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* about */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
        <View style={styles.row}>
          <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Version</Text>
          <Text style={[styles.rowValue, { color: theme.text }]}>1.0.0</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={[styles.rowLabel, { color: theme.textSecondary }]}>Built with</Text>
          <Text style={[styles.rowValue, { color: theme.text }]}>React Native + Expo</Text>
        </View>
      </View>

      {/* logout */}
      <TouchableOpacity
        style={[styles.logoutBtn, { backgroundColor: theme.negative }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  section: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  rowLabel: { fontSize: 14 },
  rowValue: { fontSize: 14, fontWeight: "500" },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 2,
  },
  logoutBtn: {
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 4,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
