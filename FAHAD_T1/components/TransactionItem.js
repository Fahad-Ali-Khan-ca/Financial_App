import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TransactionItem({ tx, onDelete, onPress }) {
  const isDeposit = tx.type === "Deposit";
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.leftSection}>
        <View style={[styles.indicator, isDeposit ? styles.depositBar : styles.expenseBar]} />
        <View style={styles.info}>
          <Text style={styles.name}>{tx.name}</Text>
          <Text style={styles.meta}>{tx.category} • {tx.date}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={[styles.amount, isDeposit ? styles.deposit : styles.expense]}>
          {isDeposit ? "+" : "-"}${tx.amount.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  indicator: {
    width: 4,
    height: 36,
    borderRadius: 2,
    marginRight: 10,
  },
  depositBar: { backgroundColor: "#2e7d32" },
  expenseBar: { backgroundColor: "#c62828" },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "600", marginBottom: 2 },
  meta: { fontSize: 12, color: "#888" },
  rightSection: { alignItems: "flex-end" },
  amount: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  deposit: { color: "#2e7d32" },
  expense: { color: "#c62828" },
  deleteBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  deleteText: {
    fontSize: 12,
    color: "#c62828",
  },
});
