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
import TransactionItem from "../components/TransactionItem";

export default function TransactionListScreen({ navigation }) {
    const { signOut } = useAuth();
    const { transactions, deleteTransaction } = useTransactions();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    // header logout button
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title="Logout" onPress={() => {
                signOut();
                navigation.replace("Login");
            }}
            />,
            headerLeft: () => null,
        });
    }, [navigation]);

    // filter and search logic
    const filteredTransactions = useMemo(() => {
        let result = transactions;

        // apply type filter
        if (activeFilter === "Deposits") {
            result = result.filter((t) => t.type === "Deposit");
        } else if (activeFilter === "Expenses") {
            result = result.filter((t) => t.type === "Expense");
        }

        // apply search
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
        <View style={styles.container}>
            {/* balance section */}
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Current Balance</Text>
                <Text style={[styles.balanceAmount, balance >= 0 ? styles.positive : styles.negative]}>
                    ${balance.toFixed(2)}
                </Text>
                <View style={styles.balanceRow}>
                    <View style={styles.balanceItem}>
                        <Text style={styles.balanceSubLabel}>Income</Text>
                        <Text style={[styles.balanceSubValue, styles.positive]}>
                            +${totalDeposits.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.balanceItem}>
                        <Text style={styles.balanceSubLabel}>Expenses</Text>
                        <Text style={[styles.balanceSubValue, styles.negative]}>
                            -${totalExpenses.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>

            {/* search bar */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search transactions..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
            />

            {/* filter buttons */}
            <View style={styles.filterRow}>
                {["All", "Deposits", "Expenses"].map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        style={[
                            styles.filterBtn,
                            activeFilter === filter && styles.filterBtnActive,
                        ]}
                        onPress={() => setActiveFilter(filter)}
                    >
                        <Text
                            style={[
                                styles.filterBtnText,
                                activeFilter === filter && styles.filterBtnTextActive,
                            ]}
                        >
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* results count */}
            <Text style={styles.resultCount}>
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
            </Text>

            <FlatList
                data={filteredTransactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TransactionItem
                        tx={item}
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
                        onPress={() => navigation.navigate("Detail", { tx: item })}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No transactions found.</Text>
                }
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate("New")}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
    balanceCard: {
        backgroundColor: "#fff",
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
        color: "#666",
        textAlign: "center",
    },
    balanceAmount: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 4,
    },
    positive: { color: "#2e7d32" },
    negative: { color: "#c62828" },
    balanceRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    balanceItem: { alignItems: "center" },
    balanceSubLabel: { fontSize: 12, color: "#888" },
    balanceSubValue: { fontSize: 16, fontWeight: "600" },
    searchInput: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#ddd",
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
        backgroundColor: "#e0e0e0",
    },
    filterBtnActive: {
        backgroundColor: "#1976d2",
    },
    filterBtnText: {
        fontSize: 13,
        color: "#555",
    },
    filterBtnTextActive: {
        color: "#fff",
        fontWeight: "bold",
    },
    resultCount: {
        fontSize: 12,
        color: "#888",
        marginBottom: 6,
    },
    emptyText: {
        textAlign: "center",
        color: "#999",
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
        backgroundColor: "#1976d2",
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
