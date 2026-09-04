import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {db} from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";


export default function AddStudentScreen({navigation}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async() => {
    if(!name||!email||!phone||!department||!course||!age){
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
     
    await addDoc(collection(db,"students"),{
      name:name,
      email:email,
      phone:phone,
      department:department,
      course:course,
      age:Number(age),
      status:"Active",
      createdAt:serverTimestamp(),
    }); 
    Alert.alert( "Success","Student Details Add SuccessFull...");
    navigation.navigate("Students");  
        
    } catch (error) {
      console.log("Error adding student:", error);
      Alert.alert("Error", "Failed to add student");
    }
   
  
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Student</Text>

      <TextInput
        style={styles.input}
        placeholder="Student Name"
        placeholderTextColor="#9c9a9a"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9c9a9a"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        placeholderTextColor="#9c9a9a"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Department"
        placeholderTextColor="#9c9a9a"
        value={department}
        onChangeText={setDepartment}
      />

      <TextInput
        style={styles.input}
        placeholder="Course"
        placeholderTextColor="#9c9a9a" 
        value={course}
        onChangeText={setCourse}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#9c9a9a" 
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Save Student</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  
    button: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    // fontWeight: "500",
    textAlign: "center",
  },
});