import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeroHelpButtons = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Pressable
        onPress={() => navigation.navigate("Employess")}
        style={{
          backgroundColor: "#d3cce3",
          padding: 12,
          borderRadius: 6,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="people-sharp" size={24} color="black" />
        </View>
        <Text style={{ marginTop: 7, fontWeight: "600" }}>Employee List</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("MarkAttendance")}
        style={{
          backgroundColor: "#d3cce3",
          padding: 12,
          borderRadius: 6,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="people-sharp" size={24} color="black" />
        </View>
        <Text style={{ marginTop: 7, fontWeight: "600" }}>Mark Attendance</Text>
      </Pressable>
    </View>
  );
};

export default HeroHelpButtons;
