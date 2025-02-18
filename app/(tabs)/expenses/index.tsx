import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

const expenses = [
  { id: 1, category: 'Home Rent', amount: 350.00, date: new Date(), icon: 'home' },
  { id: 2, category: 'Pet Groom', amount: 50.00, date: new Date(), icon: 'paw' },
  { id: 3, category: 'Recharge', amount: 100.00, date: new Date(), icon: 'phone-portrait' },
];

export default function ExpensesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <View style={styles.periodSelector}>
          <Text style={styles.periodText}>01 Jan 2021 - 01 Apr 2021</Text>
          <Ionicons name="calendar-outline" size={24} color="#1f2937" />
        </View>
      </View>

      <View style={styles.tabs}>
        <Pressable style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Income</Text>
        </Pressable>
        <Pressable style={styles.tab}>
          <Text style={styles.tabText}>Expenses</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.transactionsList}>
        {expenses.map((expense) => (
          <View key={expense.id} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              <Ionicons name={expense.icon} size={24} color="#6366f1" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionCategory}>{expense.category}</Text>
              <Text style={styles.transactionDate}>
                {format(expense.date, 'MMM d, yyyy')}
              </Text>
            </View>
            <Text style={styles.transactionAmount}>
              -${expense.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Pressable 
        style={styles.addButton}
        onPress={() => router.push('/expenses/add')}>
        <Ionicons name="add" size={32} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 12,
  },
  periodText: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  tabs: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
  },
  tabText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6366f1',
  },
  transactionsList: {
    flex: 1,
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  transactionDate: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});