import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

export default function TransactionItem({ tx, onDelete, onPress }) {
  const isDeposit = tx.type === "Deposit";
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{tx.name}</Text>
        <Text style={[styles.amount, isDeposit ? styles.deposit : styles.expense]}>
          {isDeposit ? "+" : "-"}${tx.amount.toFixed(2)}
        </Text>
      </View>
      <Button title="🗑" onPress={onDelete} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  info: { flexDirection: "column" },
  name: { fontSize: 16, marginBottom: 4 },
  amount: { fontSize: 16, fontWeight: "bold" },
  deposit: { color: "green" },
  expense: { color: "red" },
});
