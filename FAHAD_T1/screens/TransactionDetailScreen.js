import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TransactionDetailScreen({ route }) {
  const { tx } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{tx.name}</Text>

      <Text style={styles.label}>Amount:</Text>
      <Text style={styles.value}>${tx.amount.toFixed(2)}</Text>

      <Text style={styles.label}>Type:</Text>
      <Text style={styles.value}>{tx.type}</Text>

      <Text style={styles.label}>Category:</Text>
      <Text style={styles.value}>{tx.category}</Text>

      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>{tx.location}</Text>

      <Text style={styles.label}>Date:</Text>
      <Text style={styles.value}>{tx.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: "bold", marginTop: 12 },
  value: { fontSize: 16, marginTop: 4 },
});
