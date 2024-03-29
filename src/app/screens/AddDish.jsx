import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddDish = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [dishName, setDishName] = useState('');
  const [calories, setCalories] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleAddDish = async () => {
    if (!dishName.trim() || !calories.trim() || !ingredients.trim()) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola!');
      return;
    }

    try {
      const userId = FIREBASE_AUTH.currentUser?.uid;
      if (!userId) {
        Alert.alert('Błąd', 'Nie jesteś zalogowany!');
        return;
      }

      const dishData = {
        userId,
        name: dishName,
        calories: parseInt(calories, 10),
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        image: imageUri,
      };

      await addDoc(collection(FIRESTORE_DB, 'userDishes'), dishData);
      Alert.alert('Sukces', 'Potrawa dodana!');
      setDishName('');
      setCalories('');
      setIngredients('');
      setImageUri(null);
    } catch (error) {
      console.error('Error adding dish: ', error);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
      setCameraVisible(false);
    }
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
        <View style={styles.buttonContainer}>
          <Button title="Zrób Zdjęcie" onPress={takePhoto} color="#4C9A70" />
        </View>
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {cameraVisible ? (
        renderCamera()
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <Button title="Otwórz Aparat" onPress={() => setCameraVisible(true)} color="#4C9A70" />
          </View>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          <TextInput
            style={styles.input}
            value={dishName}
            onChangeText={setDishName}
            placeholder="Nazwa Potrawy"
          />
          <TextInput
            style={styles.input}
            value={calories}
            onChangeText={setCalories}
            placeholder="Kalorie"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={ingredients}
            onChangeText={setIngredients}
            placeholder="Składniki (oddziel przecinkami)"
            multiline
          />
          <View style={styles.buttonContainer}>
            <Button title="Dodaj Potrawę" onPress={handleAddDish} color="#4C9A70" />
          </View>
        </>
      )}
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  camera: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  input: {
    height: 50,
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#A8D5BA',
    borderRadius: 25,
    padding: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 18,
  },
  image: {
    width: '90%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '90%',
    marginVertical: 10,
  },
});


export default AddDish;
