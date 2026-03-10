import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthProvider } from "./context/AuthContext";
import { TransactionsProvider } from "./context/TransactionsContext";

import LoginScreen from "./screens/LoginScreen";
import TransactionListScreen from "./screens/TransactionListScreen";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import NewTransactionScreen from "./screens/NewTransactionScreen";
import EditTransactionScreen from "./screens/EditTransactionScreen";
import SummaryScreen from "./screens/SummaryScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// bottom tabs for main screens after login
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1976d2",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          paddingBottom: 4,
          height: 56,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="TransactionsList"
        component={TransactionListScreen}
        options={{
          title: "Transactions",
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          title: "Summary",
          tabBarLabel: "Summary",
        }}
      />
    </Tab.Navigator>
  );
}

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
              component={HomeTabs}
              options={{ headerShown: false }}
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
            <Stack.Screen
              name="Edit"
              component={EditTransactionScreen}
              options={{ title: "Edit Transaction" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TransactionsProvider>
    </AuthProvider>
  );
}
