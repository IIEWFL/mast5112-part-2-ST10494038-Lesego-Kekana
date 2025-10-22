import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, RootStackParamList } from '../App';

interface AddMenuScreenProps extends NativeStackScreenProps<RootStackParamList, 'AddMenu'> {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const AddMenuScreen: React.FC<AddMenuScreenProps> = ({ navigation, menuItems, setMenuItems }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');

  const courses = ['Starter', 'Main', 'Dessert'];

  const addMenuItem = () => {
    if (!name || !description || !price) {
      Alert.alert('Please fill in all fields.');
      return;
    }
    const newItem: MenuItem = {
      id: Date.now(),
      name,
      description,
      course,
      price: parseFloat(price),
    };
    setMenuItems([...menuItems, newItem]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Menu Item</Text>
      <TextInput
        placeholder="Dish Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Select Course:</Text>
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.picker}
      >
        {courses.map(c => (<Picker.Item label={c} value={c} key={c} />))}
      </Picker>
      <TextInput
        placeholder="Price"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Dish" onPress={addMenuItem} color="#00796B" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#E8FFF4', // soft mint green background
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#00695C',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#A8E6CF', // mint border
    backgroundColor: '#FFFFFF',
    padding: 11,
    marginBottom: 11,
    borderRadius: 10,
    shadowColor: '#A8E6CF',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#FFCCE5', // light pink border
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonContainer: {
    backgroundColor: '#FFEBEE', // soft pink accent area
    borderRadius: 12,
    marginTop: 10,
    paddingVertical: 5,
    shadowColor: '#FFB6C1',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default AddMenuScreen;
