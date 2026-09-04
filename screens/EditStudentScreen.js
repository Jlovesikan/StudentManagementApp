import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";


export default function EditStudentScreen({route,navigation}){
    const {id}=route.params;

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [department,setDepartment]=useState("");
    const [course,setCourse]=useState("");
    const [age,setAge]=useState("");
    const [active,setActive]=useState("");

    const fetchStudents=async()=>{
        try {
          const studentRef=doc(db,"students",id);
          const studentSnap= await getDoc(studentRef);
          
              if (studentSnap.exists()) {
                const data = studentSnap.data();

                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setDepartment(data.department);
                setCourse(data.course);
                setAge(String(data.age));
            }
        } catch (error) {
           console.log("Error fetching student:", error); 
        }
    };

    const updateStudent=async()=>{
        try {
          const studentRef=doc(db,"students",id);
          await updateDoc(studentRef,{
                name: name,
                email: email,
                phone: phone,
                department: department,
                course: course,
                age: Number(age),
          });
          Alert.alert("Update Student Details Successfully..");
          navigation.goBack();  
        } catch (error) {
            console.log("Error updating student:", error);
        }
    }
    useEffect(()=>{
        fetchStudents()
    },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Student</Text>

      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Department"
        value={department}
        onChangeText={setDepartment}
      />

      <TextInput
        style={styles.input}
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button}
      onPress={updateStudent}
      >
        <Text style={styles.buttonText}>Update Student</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
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
    paddingVertical: 13,
    borderRadius: 8,
    marginTop: 5,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});

    
