import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, RootStackParamList } from '../App';

interface TotalCostScreenProps extends NativeStackScreenProps<RootStackParamList, 'TotalCost'> {
  menuItems: MenuItem[];
}

const TotalCostScreen: React.FC<TotalCostScreenProps> = ({ menuItems }) => {
  // Calculate total cost by course
  const totals = menuItems.reduce(
    (acc, item) => {
      if (item.course === 'Starter') acc.Starter += item.price;
      if (item.course === 'Main') acc.Main += item.price;
      if (item.course === 'Dessert') acc.Dessert += item.price;
      return acc;
    },
    { Starter: 0, Main: 0, Dessert: 0 }
  );

  const grandTotal = totals.Starter + totals.Main + totals.Dessert;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total Cost Summary</Text>

      <View style={styles.card}>
        <Text style={styles.course}>Starters Total:</Text>
        <Text style={styles.amount}>R{totals.Starter.toFixed(2)}</Text>
      </View>

      <View style={[styles.card, styles.altCard]}>
        <Text style={styles.course}>Mains Total:</Text>
        <Text style={styles.amount}>R{totals.Main.toFixed(2)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.course}>Desserts Total:</Text>
        <Text style={styles.amount}>R{totals.Dessert.toFixed(2)}</Text>
      </View>

      <View style={styles.grandTotalCard}>
        <Text style={styles.grandText}>Grand Total</Text>
        <Text style={styles.grandAmount}>R{grandTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8FFF4', // mint green background
    padding: 22,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#004D40',
    borderBottomWidth: 2,
    borderBottomColor: '#FFB6C1', // pink underline
    paddingBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFCCE5', // light pink border
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#A8E6CF',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  altCard: {
    backgroundColor: '#FFFBFC', // faint pinkish white for alternating card
  },
  course: {
    fontSize: 18,
    color: '#00695C',
    fontWeight: '600',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C2185B', // soft pink accent
  },
  grandTotalCard: {
    marginTop: 25,
    backgroundColor: '#A8E6CF', // mint highlight
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#FFB6C1',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  grandText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004D40',
  },
  grandAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C2185B',
  },
});

export default TotalCostScreen;
