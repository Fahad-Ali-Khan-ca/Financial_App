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

export default function EditTransactionScreen({ route, navigation }) {
  const { tx } = route.params;
  const { updateTransaction } = useTransactions();
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
    if (isNaN(amt)) {
      Alert.alert("Amount must be a number.");
      return;
    }
    updateTransaction(tx.id, { name, amount: amt, location, date, type, category });
    Alert.alert("Updated", "Transaction has been updated.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Transaction</Text>
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

      <Button title="Save Changes" onPress={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 15,
  },
  pickerLabel: { marginTop: 8, fontWeight: "bold", fontSize: 14 },
});
