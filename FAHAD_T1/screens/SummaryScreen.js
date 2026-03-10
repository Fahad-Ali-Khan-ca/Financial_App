import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTransactions } from "../context/TransactionsContext";

const categoryColors = {
  Utilities: "#ff9800",
  Transportation: "#2196f3",
  Groceries: "#4caf50",
  Shopping: "#9c27b0",
  Entertainment: "#e91e63",
  Health: "#00bcd4",
  Payroll: "#8bc34a",
};

export default function SummaryScreen() {
  const { transactions } = useTransactions();

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "Deposit")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // spending by category (only expenses)
    const categoryMap = {};
    transactions
      .filter((t) => t.type === "Expense")
      .forEach((t) => {
        if (!categoryMap[t.category]) {
          categoryMap[t.category] = 0;
        }
        categoryMap[t.category] += t.amount;
      });

    // sort by amount descending
    const categoryBreakdown = Object.entries(categoryMap)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);

    const maxCategoryAmount = categoryBreakdown.length > 0
      ? categoryBreakdown[0].amount
      : 0;

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      categoryBreakdown,
      maxCategoryAmount,
      transactionCount: transactions.length,
      depositCount: transactions.filter((t) => t.type === "Deposit").length,
      expenseCount: transactions.filter((t) => t.type === "Expense").length,
    };
  }, [transactions]);

  return (
    <ScrollView style={styles.container}>
      {/* overview cards */}
      <View style={styles.overviewRow}>
        <View style={[styles.overviewCard, { borderLeftColor: "#2e7d32" }]}>
          <Text style={styles.overviewLabel}>Total Income</Text>
          <Text style={[styles.overviewAmount, { color: "#2e7d32" }]}>
            ${stats.totalIncome.toFixed(2)}
          </Text>
          <Text style={styles.overviewCount}>{stats.depositCount} deposits</Text>
        </View>
        <View style={[styles.overviewCard, { borderLeftColor: "#c62828" }]}>
          <Text style={styles.overviewLabel}>Total Expenses</Text>
          <Text style={[styles.overviewAmount, { color: "#c62828" }]}>
            ${stats.totalExpenses.toFixed(2)}
          </Text>
          <Text style={styles.overviewCount}>{stats.expenseCount} expenses</Text>
        </View>
      </View>

      {/* savings rate */}
      <View style={styles.savingsCard}>
        <Text style={styles.savingsLabel}>Savings Rate</Text>
        <Text style={styles.savingsAmount}>
          {stats.totalIncome > 0
            ? ((stats.balance / stats.totalIncome) * 100).toFixed(1)
            : "0.0"}%
        </Text>
        <Text style={styles.savingsSubtext}>
          ${stats.balance.toFixed(2)} saved out of ${stats.totalIncome.toFixed(2)} income
        </Text>
      </View>

      {/* category breakdown */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Spending by Category</Text>
        {stats.categoryBreakdown.length === 0 ? (
          <Text style={styles.emptyText}>No expenses yet</Text>
        ) : (
          stats.categoryBreakdown.map((item) => (
            <View key={item.category} style={styles.categoryRow}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryLabelRow}>
                  <View
                    style={[
                      styles.categoryDot,
                      { backgroundColor: categoryColors[item.category] || "#999" },
                    ]}
                  />
                  <Text style={styles.categoryName}>{item.category}</Text>
                </View>
                <Text style={styles.categoryAmount}>${item.amount.toFixed(2)}</Text>
              </View>
              <View style={styles.barBackground}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${(item.amount / stats.maxCategoryAmount) * 100}%`,
                      backgroundColor: categoryColors[item.category] || "#999",
                    },
                  ]}
                />
              </View>
              <Text style={styles.categoryPercent}>
                {((item.amount / stats.totalExpenses) * 100).toFixed(1)}% of total
              </Text>
            </View>
          ))
        )}
      </View>

      {/* quick stats */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Transactions</Text>
          <Text style={styles.statValue}>{stats.transactionCount}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Average Expense</Text>
          <Text style={styles.statValue}>
            ${stats.expenseCount > 0
              ? (stats.totalExpenses / stats.expenseCount).toFixed(2)
              : "0.00"}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Largest Expense</Text>
          <Text style={styles.statValue}>
            ${transactions
              .filter((t) => t.type === "Expense")
              .reduce((max, t) => Math.max(max, t.amount), 0)
              .toFixed(2)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  overviewRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  overviewLabel: { fontSize: 12, color: "#888" },
  overviewAmount: { fontSize: 20, fontWeight: "bold", marginVertical: 4 },
  overviewCount: { fontSize: 11, color: "#aaa" },
  savingsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  savingsLabel: { fontSize: 13, color: "#888" },
  savingsAmount: { fontSize: 36, fontWeight: "bold", color: "#1976d2", marginVertical: 4 },
  savingsSubtext: { fontSize: 12, color: "#aaa" },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  emptyText: { color: "#999", textAlign: "center", padding: 16 },
  categoryRow: { marginBottom: 14 },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryLabelRow: { flexDirection: "row", alignItems: "center" },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  categoryName: { fontSize: 14, fontWeight: "500" },
  categoryAmount: { fontSize: 14, fontWeight: "600" },
  barBackground: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
  categoryPercent: {
    fontSize: 11,
    color: "#aaa",
    marginTop: 2,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  statLabel: { fontSize: 14, color: "#666" },
  statValue: { fontSize: 14, fontWeight: "600" },
});
