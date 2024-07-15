import { View, Text } from "react-native";
import React from "react";
import { Feather, Entypo } from "@expo/vector-icons";

const EmployeeHeader = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Feather name="bar-chart" size={24} color="black" />
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        Employee Managament System
      </Text>
      <Entypo name="lock" size={24} color="black" />
    </View>
  );
};

export default EmployeeHeader;
