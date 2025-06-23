import React, { createContext, useState, useContext } from "react";

const TransactionsContext = createContext();

const initialTransactions = [
  {
    id: "1",
    name: "Paychecque",
    amount: 2000,
    location: "Google INC",
    date: "2025-06-01",
    type: "Deposit",
    category: "Payroll",
  },
  {
    id: "2",
    name: "Food Basic",
    amount: 150,
    location: "Metro",
    date: "2025-06-03",
    type: "Expense",
    category: "Groceries",
  },
  {
    id: "3",
    name: "Presto",
    amount: 75,
    location: "Transit",
    date: "2025-06-05",
    type: "Expense",
    category: "Transportation",
  },
  {
    id: "4",
    name: "Lexicon Energy",
    amount: 120,
    location: "Hydro One",
    date: "2025-06-07",
    type: "Expense",
    category: "Utilities",
  },
  {
    id: "5",
    name: "Cineplex",
    amount: 45,
    location: "Cineple Ajax",
    date: "2025-06-10",
    type: "Expense",
    category: "Entertainment",
  },
];

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState(initialTransactions);

  const addTransaction = (tx) => {
    setTransactions((prev) => [
      ...prev,
      { ...tx, id: Date.now().toString() },
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}