import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function TransactionDetailScreen({ route, navigation }) {
  const { tx } = route.params;
  const { theme } = useTheme();
  const isDeposit = tx.type === "Deposit";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.name, { color: theme.text }]}>{tx.name}</Text>
        <Text style={[styles.amount, { color: isDeposit ? theme.positive : theme.negative }]}>
          {isDeposit ? "+" : "-"}${tx.amount.toFixed(2)}
        </Text>
        <View style={[styles.typeBadge, {
          backgroundColor: isDeposit ? (theme.dark ? "#1b5e20" : "#e8f5e9") : (theme.dark ? "#b71c1c" : "#ffebee")
        }]}>
          <Text style={[styles.typeText, { color: isDeposit ? theme.positive : theme.negative }]}>
            {tx.type}
          </Text>
        </View>
      </View>

      <View style={[styles.detailsCard, { backgroundColor: theme.card }]}>
        <View style={styles.detailRow}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Category</Text>
          <Text style={[styles.value, { color: theme.text }]}>{tx.category}</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <View style={styles.detailRow}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Location</Text>
          <Text style={[styles.value, { color: theme.text }]}>{tx.location}</Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <View style={styles.detailRow}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Date</Text>
          <Text style={[styles.value, { color: theme.text }]}>{tx.date}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.editBtn, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("Edit", { tx })}
      >
        <Text style={styles.editBtnText}>Edit Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
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
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: { fontSize: 13, fontWeight: "600" },
  detailsCard: {
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
  label: { fontSize: 15 },
  value: { fontSize: 15, fontWeight: "500" },
  divider: { height: 1 },
  editBtn: {
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
