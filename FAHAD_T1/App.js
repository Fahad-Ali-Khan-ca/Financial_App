import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthProvider } from "./context/AuthContext";
import { TransactionsProvider } from "./context/TransactionsContext";

import LoginScreen from "./screens/LoginScreen";
import TransactionListScreen from "./screens/TransactionListScreen";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import NewTransactionScreen from "./screens/NewTransactionScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <TransactionsProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Transactions"
              component={TransactionListScreen}
              options={{ title: "Your Transactions" }}
            />
            <Stack.Screen
              name="Detail"
              component={TransactionDetailScreen}
              options={{ title: "Transaction Detail" }}
            />
            <Stack.Screen
              name="New"
              component={NewTransactionScreen}
              options={{ title: "Add Transaction" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TransactionsProvider>
    </AuthProvider>
  );
}
