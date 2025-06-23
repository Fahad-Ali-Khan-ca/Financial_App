import React, { useLayoutEffect } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import {
    useTransactions,
} from "../context/TransactionsContext";
import TransactionItem from "../components/TransactionItem";

export default function TransactionListScreen({ navigation }) {
    const { signOut } = useAuth();
    const { transactions, deleteTransaction } = useTransactions();

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

    const total =
        transactions
            .filter((t) => t.type === "Deposit")
            .reduce((sum, t) => sum + t.amount, 0) -
        transactions
            .filter((t) => t.type === "Expense")
            .reduce((sum, t) => sum + t.amount, 0);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.totalLabel}>Balance:</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
            <FlatList
                data={transactions}
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
            />
            <View style={styles.addButton}>
                <Button title="＋ New" onPress={() => navigation.navigate("New")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    totalLabel: { fontSize: 18, fontWeight: "bold" },
    totalValue: { fontSize: 18 },
    addButton: { position: "absolute", bottom: 16, right: 16 },
});
