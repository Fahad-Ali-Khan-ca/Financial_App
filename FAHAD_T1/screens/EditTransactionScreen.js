import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTransactions } from "../context/TransactionsContext";
import { useTheme } from "../context/ThemeContext";

const categories = [
  "Utilities",
  "Transportation",
  "Groceries",
  "Shopping",
  "Entertainment",
  "Health",
  "Payroll",
];

export default function EditTransactionScreen({ route, navigation }) {
  const { tx } = route.params;
  const { updateTransaction } = useTransactions();
  const { theme } = useTheme();
  const [name, setName] = useState(tx.name);
  const [amount, setAmount] = useState(tx.amount.toString());
  const [location, setLocation] = useState(tx.location);
  const [date, setDate] = useState(tx.date);
  const [type, setType] = useState(tx.type);
  const [category, setCategory] = useState(tx.category);

  const onSave = () => {
    if (!name || !amount || !location || !date) {
      Alert.alert("All fields are required.");
      return;
    }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Amount must be a valid positive number.");
      return;
    }
    updateTransaction(tx.id, { name, amount: amt, location, date, type, category });
    Alert.alert("Updated", "Transaction has been updated.");
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Transaction Name"
        placeholderTextColor={theme.textMuted}
        style={[styles.input, {
          backgroundColor: theme.inputBg,
          borderColor: theme.inputBorder,
          color: theme.text,
        }]}
      />

      <Text style={[styles.label, { color: theme.textSecondary }]}>Amount ($)</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        placeholderTextColor={theme.textMuted}
        keyboardType="numeric"
        style={[styles.input, {
          backgroundColor: theme.inputBg,
          borderColor: theme.inputBorder,
          color: theme.text,
        }]}
      />

      <Text style={[styles.label, { color: theme.textSecondary }]}>Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
        placeholderTextColor={theme.textMuted}
        style={[styles.input, {
          backgroundColor: theme.inputBg,
          borderColor: theme.inputBorder,
          color: theme.text,
        }]}
      />

      <Text style={[styles.label, { color: theme.textSecondary }]}>Date</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={theme.textMuted}
        style={[styles.input, {
          backgroundColor: theme.inputBg,
          borderColor: theme.inputBorder,
          color: theme.text,
        }]}
      />

      <Text style={[styles.label, { color: theme.textSecondary }]}>Type</Text>
      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeBtn, { backgroundColor: theme.filterBg },
            type === "Expense" && { backgroundColor: theme.negative }]}
          onPress={() => setType("Expense")}
        >
          <Text style={[styles.typeBtnText, { color: theme.textSecondary },
            type === "Expense" && { color: "#fff" }]}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeBtn, { backgroundColor: theme.filterBg },
            type === "Deposit" && { backgroundColor: theme.positive }]}
          onPress={() => setType("Deposit")}
        >
          <Text style={[styles.typeBtnText, { color: theme.textSecondary },
            type === "Deposit" && { color: "#fff" }]}>
            Deposit
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, { color: theme.textSecondary }]}>Category</Text>
      <View style={[styles.pickerWrapper, {
        backgroundColor: theme.inputBg,
        borderColor: theme.inputBorder,
      }]}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={{ color: theme.text }}
        >
          {categories.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.primary }]} onPress={onSave}>
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 4,
    borderRadius: 8,
    fontSize: 15,
  },
  typeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 4,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  typeBtnText: { fontSize: 14, fontWeight: "600" },
  pickerWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 4,
  },
  saveBtn: {
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
