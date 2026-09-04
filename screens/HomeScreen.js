import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Student Management</Text>

      <Text style={styles.subtitle}>
        Manage your students easily
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Students")}
      >
        <Text style={styles.buttonText}>View Students</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddStudent")}
      >
        <Text style={styles.buttonText}>Add Student</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 50,
    marginVertical: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    // fontWeight: "500",
    textAlign: "center",
  },
});