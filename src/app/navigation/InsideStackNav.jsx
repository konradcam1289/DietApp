import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from '../screens/List';
import Details from '../screens/Details';
import BMICalculatorScreen from '../screens/BMICalculatorScreen';
import DishDetails from '../screens/DishDetails';
import MealPlanner from '../screens/MealPlanner';
import DishSelector from '../screens/DishSelector';
import ShoppingList from '../screens/ShoppingList';
import MyDiet from '../screens/MyDiet';
import AddDish from '../screens/AddDish';
import Dishes from '../screens/Dishes';
import UserDishes from '../screens/UserDishes';
import ChosenMeals from '../screens/UserMealScreen';
import UserMealsScreen from '../screens/UserMealScreen';



const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
  return (
    <InsideStack.Navigator initialRouteName="Strona główna">
      <InsideStack.Screen name="Strona główna" component={List} options={{ headerShown: false }} />
      <InsideStack.Screen name="Details" component={Details}  />
      <InsideStack.Screen name="BMI Calculator" component={BMICalculatorScreen}  />
      <InsideStack.Screen name="DishDetails" component={DishDetails} />
      <InsideStack.Screen name="MealPlanner" component={MealPlanner} /> 
      <InsideStack.Screen name="DishSelector" component={DishSelector} />
      <InsideStack.Screen name="ShoppingList" component={ShoppingList} />
      <InsideStack.Screen name="MyDiet" component={MyDiet} />
      <InsideStack.Screen name="AddDish" component={AddDish} />
      <InsideStack.Screen name="Dishes" component={Dishes} />
      <InsideStack.Screen name="UserDishes" component={UserDishes} />
      <InsideStack.Screen name="ChosenMeals" component={ChosenMeals} />
      <InsideStack.Screen name="UserMealScreen" component={UserMealsScreen} />
    </InsideStack.Navigator>
  );
};

export default InsideLayout;
