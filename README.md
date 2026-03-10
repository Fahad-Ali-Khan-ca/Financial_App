# Finance Tracker

A personal finance management mobile application built with React Native and Expo. Track your income and expenses, view spending breakdowns by category, and manage your finances on the go.

## Features

- **Authentication** - Secure login screen with email/password validation
- **Transaction Management** - Add, edit, and delete income/expense transactions
- **Search & Filter** - Search transactions by name, category, or location with type filters (All/Deposits/Expenses)
- **Summary Dashboard** - Visual spending breakdown by category with progress bars, savings rate, and quick stats
- **Dark Mode** - Toggle between light and dark themes from the settings screen
- **Bottom Tab Navigation** - Easy navigation between Home, Summary, and Settings screens
- **Form Validation** - Input validation for amounts, dates (YYYY-MM-DD format), and required fields

## Screenshots

The app includes the following screens:
- Login Screen
- Transaction List (Home) with balance card, search bar, and filter tabs
- Transaction Detail view with edit option
- Add/Edit Transaction forms with type selector and category picker
- Summary screen with income vs expenses overview, category breakdown bars, and quick stats
- Settings screen with dark mode toggle and account info

## Tech Stack

- **Framework:** React Native with Expo SDK 53
- **Navigation:** React Navigation (Stack + Bottom Tabs)
- **State Management:** React Context API
- **Styling:** StyleSheet with dynamic theming

## Project Structure

```
FAHAD_T1/
├── App.js                          # Root component with navigation setup
├── context/
│   ├── AuthContext.js              # Authentication state management
│   ├── TransactionsContext.js      # Transaction CRUD operations
│   └── ThemeContext.js             # Dark/light theme management
├── screens/
│   ├── LoginScreen.js              # Login page
│   ├── TransactionListScreen.js    # Main transaction list with search/filter
│   ├── TransactionDetailScreen.js  # Transaction detail view
│   ├── NewTransactionScreen.js     # Add new transaction form
│   ├── EditTransactionScreen.js    # Edit existing transaction
│   ├── SummaryScreen.js            # Spending analytics dashboard
│   └── SettingsScreen.js           # App settings with dark mode
└── components/
    └── TransactionItem.js          # Reusable transaction list item
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing on device)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/Financial_App.git
cd Financial_App/FAHAD_T1
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Scan the QR code with Expo Go (Android) or Camera app (iOS) to run on your device.

### Running on Specific Platforms

```bash
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
```

## Usage

1. **Login** with the test credentials:
   - Email: `test@senecapolytechnic.ca`
   - Password: `test123`

2. **View Transactions** on the Home tab - see your balance, search, and filter transactions

3. **Add Transaction** using the + button - fill in name, amount, location, date, type, and category

4. **View Details** by tapping a transaction - see full details and edit from there

5. **Check Summary** tab for spending analytics with category breakdown

6. **Settings** tab to toggle dark mode and view account info

## Categories

Transactions can be categorized as:
- Utilities
- Transportation
- Groceries
- Shopping
- Entertainment
- Health
- Payroll

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| expo | ~53.0.12 | Development framework |
| react | 19.0.0 | UI library |
| react-native | 0.79.4 | Mobile framework |
| @react-navigation/native | ^7.1.14 | Navigation core |
| @react-navigation/stack | ^7.4.1 | Stack navigation |
| @react-navigation/bottom-tabs | ^7.4.0 | Tab navigation |
| @react-native-picker/picker | ^2.11.1 | Dropdown picker |
| react-native-gesture-handler | ~2.24.0 | Gesture support |
| react-native-reanimated | ~3.17.4 | Animations |

