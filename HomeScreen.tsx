import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, RootStackParamList } from '../App';

interface HomeScreenProps extends NativeStackScreenProps<RootStackParamList, 'Home'> {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, menuItems }) => {
  const totalItems = menuItems.length;

  const courseAveragePrice: Record<string, number> = {};
  const courseCounts: Record<string, number> = {};

  menuItems.forEach(item => {
    courseAveragePrice[item.course] = (courseAveragePrice[item.course] || 0) + item.price;
    courseCounts[item.course] = (courseCounts[item.course] || 0) + 1;
  });

  Object.keys(courseAveragePrice).forEach(course => {
    courseAveragePrice[course] = +(courseAveragePrice[course] / courseCounts[course]).toFixed(2);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Christofel's Menu</Text>
      <Text style={styles.subtitle}>Total Dishes: {totalItems}</Text>
      <Text style={styles.subtitle}>Average Price by Course:</Text>

      {Object.keys(courseAveragePrice).map(course => (
        <Text key={course} style={styles.courseText}>
          {course}: {courseAveragePrice[course]}
        </Text>
      ))}

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name} - {item.course}</Text>
            <Text>{item.description}</Text>
            <Text>Price: R{item.price}</Text>
          </View>
        )}
      />

      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddMenu')}
      >
        <Text style={styles.buttonText}>Add Menu Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Filter')}
      >
        <Text style={styles.buttonText}>Filter by Course</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 22,
    backgroundColor: '#E6FFF2', // soft mint green background
  },
 
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#004D40',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FFB6C1', // soft pink underline
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4,
    color: '#00695C',
  },
  item: {
    marginVertical: 11,
    padding: 11,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#FFCCE5', // soft pink border
    borderWidth: 1,
    shadowColor: '#A5D6A7',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#004D40',
  },
  courseText: {
    color: '#004D40',
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#00695C', 
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#FFB6C1',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: '#00695C', 
  },
  buttonText: {
    color: '#010605ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
