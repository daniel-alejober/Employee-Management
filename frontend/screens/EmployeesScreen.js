import {
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import clientAxios from "../utils/clientAxios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import useEmployee from "../Hooks/useEmployee";
import ListEmployees from "../components/employee/ListEmployees";

const EmployeesScreen = () => {
  const { employees, setEmployees } = useEmployee();
  const navigation = useNavigation();
  const router = useRoute();
  const [input, setInput] = useState("");

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const { data } = await clientAxios.get("/api/v1/employees");
        setEmployees(data.employees);
      } catch (error) {
        console.log("error", error);
      }
    };
    getEmployees();
  }, [router.name]);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          gap: 5,
        }}
      >
        <Pressable onPress={() => navigation.navigate("Home")}>
          <Ionicons
            style={{ marginLeft: 10 }}
            name="arrow-back"
            size={24}
            color="black"
          />
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            height: 40,
            borderRadius: 4,
          }}
        >
          <AntDesign name="search1" size={20} color="black" />
          <TextInput
            value={input}
            onChange={(e) => setInput(e.nativeEvent.text)}
            placeholder="Search"
            style={{ width: "100%" }}
          />
        </View>
      </View>

      <Pressable
        onPress={() => navigation.navigate("AddDetails")}
        style={{
          backgroundColor: "#0072b1",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center", // Centra verticalmente los elementos
          padding: 10,
          borderRadius: 5,
          maxWidth: 150,
          margin: 5,
          gap: 10,
        }}
      >
        <FontAwesome name="plus-circle" size={24} color="white" />
        <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
          Add Employee
        </Text>
      </Pressable>

      {employees.length > 0 ? (
        <ListEmployees dataEmployees={employees} input={input} />
      ) : (
        <View style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "center", fontSize: 17 }}>No Data</Text>
          <Text style={{ textAlign: "center" }}>
            Press on the plus button and add your Employee
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default EmployeesScreen;
