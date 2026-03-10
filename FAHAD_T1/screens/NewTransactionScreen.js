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

const categories = [
  "Utilities",
  "Transportation",
  "Groceries",
  "Shopping",
  "Entertainment",
  "Health",
  "Payroll",
];

export default function NewTransactionScreen({ navigation }) {
  const { addTransaction } = useTransactions();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState(categories[0]);

  const onSubmit = () => {
    if (!name || !amount || !location || !date) {
      Alert.alert("All fields are required.");
      return;
    }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert("Amount must be a valid positive number.");
      return;
    }
    // basic date format check
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      Alert.alert("Please enter date in YYYY-MM-DD format.");
      return;
    }
    addTransaction({ name, amount: amt, location, date, type, category });
    Alert.alert("Success", "Transaction added.");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g. Grocery run"
        style={styles.input}
      />

      <Text style={styles.label}>Amount ($)</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="0.00"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="e.g. Walmart"
        style={styles.input}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />

      <Text style={styles.label}>Type</Text>
      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeBtn, type === "Expense" && styles.typeBtnActiveExpense]}
          onPress={() => setType("Expense")}
        >
          <Text style={[styles.typeBtnText, type === "Expense" && styles.typeBtnTextActive]}>
            Expense
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeBtn, type === "Deposit" && styles.typeBtnActiveDeposit]}
          onPress={() => setType("Deposit")}
        >
          <Text style={[styles.typeBtnText, type === "Deposit" && styles.typeBtnTextActive]}>
            Deposit
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={category} onValueChange={setCategory}>
          {categories.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.submitBtnText}>Add Transaction</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 4,
    borderRadius: 8,
    backgroundColor: "#fff",
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
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  typeBtnActiveExpense: { backgroundColor: "#c62828" },
  typeBtnActiveDeposit: { backgroundColor: "#2e7d32" },
  typeBtnText: { fontSize: 14, fontWeight: "600", color: "#555" },
  typeBtnTextActive: { color: "#fff" },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 4,
  },
  submitBtn: {
    backgroundColor: "#1976d2",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
