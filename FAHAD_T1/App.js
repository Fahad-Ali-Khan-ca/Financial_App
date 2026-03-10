import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthProvider } from "./context/AuthContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

import LoginScreen from "./screens/LoginScreen";
import TransactionListScreen from "./screens/TransactionListScreen";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";
import NewTransactionScreen from "./screens/NewTransactionScreen";
import EditTransactionScreen from "./screens/EditTransactionScreen";
import SummaryScreen from "./screens/SummaryScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// bottom tabs for main app
function HomeTabs() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          paddingBottom: 4,
          height: 56,
          backgroundColor: theme.tabBar,
          borderTopColor: theme.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
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
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { theme } = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: theme.card },
          headerTintColor: theme.text,
        }}
      >
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
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TransactionsProvider>
          <AppNavigator />
        </TransactionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
