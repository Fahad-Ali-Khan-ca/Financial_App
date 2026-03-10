import React, { useLayoutEffect, useState, useMemo } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import {
    useTransactions,
} from "../context/TransactionsContext";
import { useTheme } from "../context/ThemeContext";
import TransactionItem from "../components/TransactionItem";

export default function TransactionListScreen({ navigation }) {
    const { signOut } = useAuth();
    const { transactions, deleteTransaction } = useTransactions();
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const parentNav = navigation.getParent();

    // header logout button
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title="Logout" onPress={() => {
                signOut();
                if (parentNav) parentNav.replace("Login");
                else navigation.replace("Login");
            }}
            />,
            headerLeft: () => null,
        });
    }, [navigation, parentNav]);

    // filter and search logic
    const filteredTransactions = useMemo(() => {
        let result = transactions;

        if (activeFilter === "Deposits") {
            result = result.filter((t) => t.type === "Deposit");
        } else if (activeFilter === "Expenses") {
            result = result.filter((t) => t.type === "Expense");
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (t) =>
                    t.name.toLowerCase().includes(query) ||
                    t.category.toLowerCase().includes(query) ||
                    t.location.toLowerCase().includes(query)
            );
        }

        return result;
    }, [transactions, activeFilter, searchQuery]);

    const totalDeposits = transactions
        .filter((t) => t.type === "Deposit")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalDeposits - totalExpenses;

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.balanceCard, { backgroundColor: theme.card }]}>
                <Text style={[styles.balanceLabel, { color: theme.textSecondary }]}>Current Balance</Text>
                <Text style={[styles.balanceAmount, { color: balance >= 0 ? theme.positive : theme.negative }]}>
                    ${balance.toFixed(2)}
                </Text>
                <View style={[styles.balanceRow, { borderTopColor: theme.border }]}>
                    <View style={styles.balanceItem}>
                        <Text style={[styles.balanceSubLabel, { color: theme.textMuted }]}>Income</Text>
                        <Text style={[styles.balanceSubValue, { color: theme.positive }]}>
                            +${totalDeposits.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.balanceItem}>
                        <Text style={[styles.balanceSubLabel, { color: theme.textMuted }]}>Expenses</Text>
                        <Text style={[styles.balanceSubValue, { color: theme.negative }]}>
                            -${totalExpenses.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>

            <TextInput
                style={[styles.searchInput, {
                    backgroundColor: theme.inputBg,
                    borderColor: theme.inputBorder,
                    color: theme.text,
                }]}
                placeholder="Search transactions..."
                placeholderTextColor={theme.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
            />

            <View style={styles.filterRow}>
                {["All", "Deposits", "Expenses"].map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        style={[
                            styles.filterBtn,
                            { backgroundColor: theme.filterBg },
                            activeFilter === filter && { backgroundColor: theme.primary },
                        ]}
                        onPress={() => setActiveFilter(filter)}
                    >
                        <Text
                            style={[
                                styles.filterBtnText,
                                { color: theme.textSecondary },
                                activeFilter === filter && styles.filterBtnTextActive,
                            ]}
                        >
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={[styles.resultCount, { color: theme.textMuted }]}>
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
            </Text>

            <FlatList
                data={filteredTransactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TransactionItem
                        tx={item}
                        theme={theme}
                        onDelete={() =>
                            Alert.alert(
                                "Delete?",
                                `Remove "${item.name}"?`,
                                [
                                    { text: "Cancel", style: "cancel" },
                                    {
                                        text: "Yes",
                                        onPress: () => deleteTransaction(item.id),
                                    },
                                ],
                                { cancelable: true }
                            )
                        }
                        onPress={() => (parentNav || navigation).navigate("Detail", { tx: item })}
                    />
                )}
                ListEmptyComponent={
                    <Text style={[styles.emptyText, { color: theme.textMuted }]}>No transactions found.</Text>
                }
            />
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: theme.primary }]}
                onPress={() => (parentNav || navigation).navigate("New")}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    balanceCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    balanceLabel: {
        fontSize: 14,
        textAlign: "center",
    },
    balanceAmount: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 4,
    },
    balanceRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
    },
    balanceItem: { alignItems: "center" },
    balanceSubLabel: { fontSize: 12 },
    balanceSubValue: { fontSize: 16, fontWeight: "600" },
    searchInput: {
        borderRadius: 8,
        padding: 10,
        fontSize: 15,
        borderWidth: 1,
        marginBottom: 10,
    },
    filterRow: {
        flexDirection: "row",
        marginBottom: 8,
        gap: 8,
    },
    filterBtn: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 16,
    },
    filterBtnText: {
        fontSize: 13,
    },
    filterBtnTextActive: {
        color: "#fff",
        fontWeight: "bold",
    },
    resultCount: {
        fontSize: 12,
        marginBottom: 6,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 32,
        fontSize: 15,
    },
    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    fabText: {
        color: "#fff",
        fontSize: 28,
        lineHeight: 30,
    },
});
