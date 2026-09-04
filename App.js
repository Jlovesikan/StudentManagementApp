import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import StudentsScreen from "./screens/StudentsScreen";
import AddStudentScreen from "./screens/AddStudentScreen";
import EditStudentScreen from "./screens/EditStudentScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Student Management" }}
        />

        <Stack.Screen
          name="Students"
          component={StudentsScreen}
          options={{ title: "Students" }}
        />

        <Stack.Screen
          name="AddStudent"
          component={AddStudentScreen}
          options={{ title: "Add Student" }}
        />
        <Stack.Screen
          name="EditStudent"
          component={EditStudentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}