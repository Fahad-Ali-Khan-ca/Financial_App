import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TransactionDetailScreen({ route, navigation }) {
  const { tx } = route.params;
  const isDeposit = tx.type === "Deposit";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{tx.name}</Text>
        <Text style={[styles.amount, isDeposit ? styles.deposit : styles.expense]}>
          {isDeposit ? "+" : "-"}${tx.amount.toFixed(2)}
        </Text>
        <View style={[styles.typeBadge, isDeposit ? styles.depositBadge : styles.expenseBadge]}>
          <Text style={styles.typeText}>{tx.type}</Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{tx.category}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{tx.location}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{tx.date}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => navigation.navigate("Edit", { tx })}
      >
        <Text style={styles.editBtnText}>Edit Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  amount: { fontSize: 32, fontWeight: "bold", marginBottom: 12 },
  deposit: { color: "#2e7d32" },
  expense: { color: "#c62828" },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  depositBadge: { backgroundColor: "#e8f5e9" },
  expenseBadge: { backgroundColor: "#ffebee" },
  typeText: { fontSize: 13, fontWeight: "600" },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  label: { fontSize: 15, color: "#666" },
  value: { fontSize: 15, fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#eee" },
  editBtn: {
    backgroundColor: "#1976d2",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  editBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
