import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
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
    if (isNaN(amt)) {
      Alert.alert("Amount must be a number.");
      return;
    }
    addTransaction({ name, amount: amt, location, date, type, category });
    Alert.alert("Success", "Transaction added.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Transaction Name"
        style={styles.input}
      />
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
        style={styles.input}
      />
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="Date (YYYY-MM-DD)"
        style={styles.input}
      />

      <Text style={styles.pickerLabel}>Type</Text>
      <Picker selectedValue={type} onValueChange={setType}>
        <Picker.Item label="Expense" value="Expense" />
        <Picker.Item label="Deposit" value="Deposit" />
      </Picker>

      <Text style={styles.pickerLabel}>Category</Text>
      <Picker selectedValue={category} onValueChange={setCategory}>
        {categories.map((c) => (
          <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>

      <Button title="Add Transaction" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  pickerLabel: { marginTop: 8, fontWeight: "bold" },
});
