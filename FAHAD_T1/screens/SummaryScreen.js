import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTransactions } from "../context/TransactionsContext";
import { useTheme } from "../context/ThemeContext";

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
  const { theme } = useTheme();

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "Deposit")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // spending by category
    const categoryMap = {};
    transactions
      .filter((t) => t.type === "Expense")
      .forEach((t) => {
        if (!categoryMap[t.category]) {
          categoryMap[t.category] = 0;
        }
        categoryMap[t.category] += t.amount;
      });

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
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* overview cards */}
      <View style={styles.overviewRow}>
        <View style={[styles.overviewCard, { backgroundColor: theme.card, borderLeftColor: theme.positive }]}>
          <Text style={[styles.overviewLabel, { color: theme.textMuted }]}>Total Income</Text>
          <Text style={[styles.overviewAmount, { color: theme.positive }]}>
            ${stats.totalIncome.toFixed(2)}
          </Text>
          <Text style={[styles.overviewCount, { color: theme.textMuted }]}>{stats.depositCount} deposits</Text>
        </View>
        <View style={[styles.overviewCard, { backgroundColor: theme.card, borderLeftColor: theme.negative }]}>
          <Text style={[styles.overviewLabel, { color: theme.textMuted }]}>Total Expenses</Text>
          <Text style={[styles.overviewAmount, { color: theme.negative }]}>
            ${stats.totalExpenses.toFixed(2)}
          </Text>
          <Text style={[styles.overviewCount, { color: theme.textMuted }]}>{stats.expenseCount} expenses</Text>
        </View>
      </View>

      {/* savings rate */}
      <View style={[styles.savingsCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.savingsLabel, { color: theme.textMuted }]}>Savings Rate</Text>
        <Text style={[styles.savingsAmount, { color: theme.primary }]}>
          {stats.totalIncome > 0
            ? ((stats.balance / stats.totalIncome) * 100).toFixed(1)
            : "0.0"}%
        </Text>
        <Text style={[styles.savingsSubtext, { color: theme.textMuted }]}>
          ${stats.balance.toFixed(2)} saved out of ${stats.totalIncome.toFixed(2)} income
        </Text>
      </View>

      {/* category breakdown */}
      <View style={[styles.sectionCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Spending by Category</Text>
        {stats.categoryBreakdown.length === 0 ? (
          <Text style={[styles.emptyText, { color: theme.textMuted }]}>No expenses yet</Text>
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
                  <Text style={[styles.categoryName, { color: theme.text }]}>{item.category}</Text>
                </View>
                <Text style={[styles.categoryAmount, { color: theme.text }]}>${item.amount.toFixed(2)}</Text>
              </View>
              <View style={[styles.barBackground, { backgroundColor: theme.border }]}>
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
              <Text style={[styles.categoryPercent, { color: theme.textMuted }]}>
                {((item.amount / stats.totalExpenses) * 100).toFixed(1)}% of total
              </Text>
            </View>
          ))
        )}
      </View>

      {/* quick stats */}
      <View style={[styles.sectionCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Stats</Text>
        <View style={[styles.statRow, { borderBottomColor: theme.border }]}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Total Transactions</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>{stats.transactionCount}</Text>
        </View>
        <View style={[styles.statRow, { borderBottomColor: theme.border }]}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Average Expense</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
            ${stats.expenseCount > 0
              ? (stats.totalExpenses / stats.expenseCount).toFixed(2)
              : "0.00"}
          </Text>
        </View>
        <View style={[styles.statRow, { borderBottomColor: theme.border }]}>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Largest Expense</Text>
          <Text style={[styles.statValue, { color: theme.text }]}>
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
  container: { flex: 1, padding: 16 },
  overviewRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  overviewCard: {
    flex: 1,
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  overviewLabel: { fontSize: 12 },
  overviewAmount: { fontSize: 20, fontWeight: "bold", marginVertical: 4 },
  overviewCount: { fontSize: 11 },
  savingsCard: {
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
  savingsLabel: { fontSize: 13 },
  savingsAmount: { fontSize: 36, fontWeight: "bold", marginVertical: 4 },
  savingsSubtext: { fontSize: 12 },
  sectionCard: {
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
  emptyText: { textAlign: "center", padding: 16 },
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
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
  categoryPercent: {
    fontSize: 11,
    marginTop: 2,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  statLabel: { fontSize: 14 },
  statValue: { fontSize: 14, fontWeight: "600" },
});
