import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, RootStackParamList } from '../App';
interface FilterScreenProps extends NativeStackScreenProps<RootStackParamList, 'Filter'> {
  menuItems: MenuItem[];
}

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation, menuItems }) => {
  const [selectedCourse, setSelectedCourse] = useState('Starter');

  const courses = ['Starter', 'Main', 'Dessert'];

  const filteredItems = menuItems.filter(item => item.course === selectedCourse);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter by Course</Text>
      <Picker
        selectedValue={selectedCourse}
        onValueChange={setSelectedCourse}
        style={styles.picker}
      >
        {courses.map(c => (<Picker.Item label={c} value={c} key={c} />))}
      </Picker>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>Price: R{item.price}</Text>
          </View>

          
        )}
      />

      <TouchableOpacity 
        style={styles.buttonTotal}
        onPress={() => navigation.navigate ('TotalCost')}
      >
        <Text style={styles.buttonText}>View Total Cost Summary</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 22,
    marginBottom: 41,
    backgroundColor: '#E8FFF4', // mint green background
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#004D40',
    borderBottomWidth: 2,
    borderBottomColor: '#FFB6C1', // soft pink underline
    paddingBottom: 6,
  },
  picker: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A8E6CF', // mint border
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 16,
    color: '#00695C',
  },
  item: {
    marginVertical: 10,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#FFCCE5', // light pink border
    borderWidth: 1,
    shadowColor: '#A8E6CF',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#004D40',
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    color: '#00695C',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    color: '#C2185B', // soft pink accent for price
    fontWeight: '600',
  },
  buttonTotal: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#C2185B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});

export default FilterScreen;
