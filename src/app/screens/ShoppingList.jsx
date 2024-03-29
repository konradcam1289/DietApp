import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../Config/FirebaseConfig';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ShoppingList = () => {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editedText, setEditedText] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;
  const shoppingListRef = collection(FIRESTORE_DB, 'shoppingList');

  useEffect(() => {
    if (user) {
      const q = query(shoppingListRef, where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const itemsFromFirestore = [];
        querySnapshot.forEach((doc) => {
          itemsFromFirestore.push({ ...doc.data(), id: doc.id });
        });
        setItems(itemsFromFirestore);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const addItemToFirestore = async () => {
    if (newItem.trim() !== '') {
      await addDoc(shoppingListRef, { name: newItem, purchased: false, userId: user.uid });
      setNewItem('');
    }
  };

  const toggleItemInFirestore = async (item) => {
    const itemRef = doc(FIRESTORE_DB, 'shoppingList', item.id);
    await updateDoc(itemRef, { purchased: !item.purchased });
  };

  const removeItemFromFirestore = async (id) => {
    const itemRef = doc(FIRESTORE_DB, 'shoppingList', id);
    await deleteDoc(itemRef);
  };

  const updateItemInFirestore = async (item) => {
    const itemRef = doc(FIRESTORE_DB, 'shoppingList', item.id);
    await updateDoc(itemRef, { name: editedText });
    setEditItem(null);
    setEditedText('');
  };

  const startEditItem = (item) => {
    setEditItem(item.id);
    setEditedText(item.name);
  };

  const handleEditItem = () => {
    const itemToUpdate = items.find(item => item.id === editItem);
    if (itemToUpdate) {
      updateItemInFirestore({ ...itemToUpdate, name: editedText });
    }
  };

  const renderItem = ({ item }) => {
    if (editItem === item.id) {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.input}
            onChangeText={setEditedText}
            value={editedText}
          />
          <TouchableOpacity style={styles.button} onPress={handleEditItem}>
            <Text style={styles.buttonText}>Zapisz</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.item} onPress={() => toggleItemInFirestore(item)}>
        <Text style={item.purchased ? styles.purchasedItem : styles.itemText}>{item.name}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => startEditItem(item)}>
            <Text style={styles.buttonText}>Edytuj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => removeItemFromFirestore(item.id)}>
            <Text style={styles.buttonText}>Usuń</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setNewItem}
        value={newItem}
        placeholder="Dodaj produkt..."
        placeholderTextColor="#333"
      />
      <TouchableOpacity style={styles.addButton} onPress={addItemToFirestore}>
        <Text style={styles.buttonText}>Dodaj</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#F0F0F0',
  },
  input: {
    width: '80%',
    borderColor: '#A8D5BA',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    color: '#333',
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 3,
  },
  itemText: {
    color: '#333',
  },
  purchasedItem: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#4C9A70',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#4C9A70',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    width: '50%',
    alignItems: 'center',
  },
});

export default ShoppingList;
