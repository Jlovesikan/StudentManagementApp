import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useCallback,  useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,FlatList, Alert,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebase/config";
import { useFocusEffect } from "@react-navigation/native";


export default function StudentsScreen({ navigation }) {
  const [students,setStudents]=useState([]);
  
  const fetchStudents=async()=>{
    try {
      const querySnapshot=await getDocs(
        collection(db,"students")
      );

      const studentsList=querySnapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }));
      setStudents(studentsList);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };
 useFocusEffect(
  useCallback(() => {
    fetchStudents();
  }, [])
);

  const deleteStudents=async(id)=>{
    try {
      await deleteDoc(doc(db,"students",id));

      setStudents(
        students.filter((student)=>student.id !== id)
      );

      Alert.alert("Student Details Deleted Successfully");
      
    } catch (error) {
      console.log("Error Deleting Students:",error);
    }
  };
  
  const renderStudents=({item})=>{
    return(
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.text}>
          Email: {item.email}
        </Text>

        <Text style={styles.text}>
          Phone: {item.phone}
        </Text>

        <Text style={styles.text}>
          Department: {item.department}
        </Text>

        <Text style={styles.text}>
          Course: {item.course}
        </Text>

        <Text style={styles.text}>
          Age: {item.age}
        </Text>
      <View style={styles.bottomRow}>
         <Text style={styles.status}>{item.status}</Text>

          <View style={styles.actionIcons}>
          
          <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("EditStudent", { id: item.id })}
          >
          <Ionicons name="create-outline" size={22} color="blue" />
          </TouchableOpacity>

     
          <TouchableOpacity
          style={styles.iconButton}
          onPress={() => deleteStudents(item.id)}
          >
          <Ionicons name="trash-outline" size={22} color="red" />
          </TouchableOpacity>
          </View>
      </View>
  </View>
    );
  }
 return (
    <View style={styles.container}>

      <Text style={styles.title}>Students List</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddStudent")}
      >
        <Text style={styles.buttonText}>
          + Add Student
        </Text>
      </TouchableOpacity>

      {students.length === 0 ? (
        <Text style={styles.emptyText}>
          No students found
        </Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={renderStudents}
        />
      )}

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
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
  },

  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 30,
  },

  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  name: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 8,
  },

  text: {
    fontSize: 15,
    marginBottom: 4,
  },

bottomRow: {
  marginTop: 8,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

actionIcons: {
  flexDirection: "row",
  gap: 15,
},

iconButton: {
  padding: 5,
},

  status: {
    fontSize:14,
    letterSpacing:1.5,
    fontWeight: "bold",
    color:"#51ff0c",
  },
});