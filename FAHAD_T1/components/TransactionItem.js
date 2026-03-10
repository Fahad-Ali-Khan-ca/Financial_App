import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TransactionItem({ tx, onDelete, onPress, theme }) {
  const isDeposit = tx.type === "Deposit";
  const colors = theme || { card: "#fff", text: "#222", textMuted: "#888", positive: "#2e7d32", negative: "#c62828" };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.leftSection}>
        <View style={[styles.indicator, { backgroundColor: isDeposit ? colors.positive : colors.negative }]} />
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]}>{tx.name}</Text>
          <Text style={[styles.meta, { color: colors.textMuted }]}>{tx.category} • {tx.date}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={[styles.amount, { color: isDeposit ? colors.positive : colors.negative }]}>
          {isDeposit ? "+" : "-"}${tx.amount.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Text style={[styles.deleteText, { color: colors.negative }]}>Delete</Text>
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
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: "600", marginBottom: 2 },
  meta: { fontSize: 12 },
  rightSection: { alignItems: "flex-end" },
  amount: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  deleteBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  deleteText: {
    fontSize: 12,
  },
});
