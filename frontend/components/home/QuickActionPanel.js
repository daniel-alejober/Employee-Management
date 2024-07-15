import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const QuickActionPanel = () => {
  const quickItems1 = [
    {
      id: 1,
      title: "Attendance Criteria",
      icon: (
        <MaterialCommunityIcons
          name="guy-fawkes-mask"
          size={24}
          color="black"
        />
      ),
      bg: "#f79d00",
    },
    {
      id: 2,
      title: "Attendance Criteria",
      icon: <Feather name="bar-chart" size={24} color="black" />,
      bg: "#abcaba",
    },
    {
      id: 3,
      title: "Cost Savings",
      icon: <Feather name="bar-chart" size={24} color="black" />,
      bg: "#d3cce3",
    },
    {
      id: 4,
      title: "Employee Performance",
      icon: <Feather name="bar-chart" size={24} color="black" />,
      bg: "#bdc3c7",
    },
  ];

  return (
    <View
      style={{
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "stretch",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      {quickItems1.map((item) => (
        <View
          key={item.id}
          style={{
            backgroundColor: item.bg,
            borderRadius: 6,
            padding: 12,
            alignItems: "center",
            justifyContent: "center",
            width: "48%",
          }}
        >
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 7,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </View>
          <Text style={{ marginTop: 7 }}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default QuickActionPanel;
