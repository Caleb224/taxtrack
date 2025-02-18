import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 1, name: 'Food & Drinks', amount: 850, percentage: 25, icon: 'fast-food' },
  { id: 2, name: 'Shopping', amount: 650, percentage: 20, icon: 'cart' },
  { id: 3, name: 'Housing', amount: 1200, percentage: 35, icon: 'home' },
  { id: 4, name: 'Entertainment', amount: 400, percentage: 12, icon: 'film' },
  { id: 5, name: 'Transport', amount: 280, percentage: 8, icon: 'car' },
];

export default function ReportsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expense Analysis</Text>
        <Text style={styles.subtitle}>March 2024</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Expenses</Text>
        <Text style={styles.totalAmount}>$3,380.00</Text>
        <View style={styles.trend}>
          <Ionicons name="arrow-up" size={16} color="#ef4444" />
          <Text style={styles.trendText}>12% from last month</Text>
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Spending by Category</Text>
        
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryItem}>
            <View style={styles.categoryIcon}>
              <Ionicons name={category.icon} size={24} color="#6366f1" />
            </View>
            <View style={styles.categoryInfo}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryAmount}>${category.amount}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar,
                    { width: `${category.percentage}%` }
                  ]} 
                />
              </View>
              <Text style={styles.categoryPercentage}>{category.percentage}%</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  totalCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#6366f1',
    borderRadius: 16,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  totalLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginVertical: 8,
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  categoriesSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
  categoryPercentage: {
    fontSize: 14,
    color: '#64748b',
  },
});