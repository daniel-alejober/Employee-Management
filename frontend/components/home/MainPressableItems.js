import { View, Text, Pressable } from "react-native";
import React from "react";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MainPressableItems = () => {
  const navigation = useNavigation();
  const pressableItems = [
    {
      id: 1,
      title: "Attendance Report",
      icon: <Ionicons name="newspaper-outline" size={24} color="black" />,
      function: null,
    },
    {
      id: 2,
      title: "Summary Report",
      icon: <Octicons name="repo-pull" size={24} color="black" />,
      function: () => navigation.navigate("Summary"),
    },
    {
      id: 3,
      title: "All Generate Reports",
      icon: <Octicons name="report" size={24} color="black" />,
      function: null,
    },
    {
      id: 4,
      title: "Overtime Employees",
      icon: <Ionicons name="people" size={24} color="black" />,
      function: null,
    },
  ];
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 7,
      }}
    >
      {pressableItems.map((item) => (
        <Pressable
          onPress={item.function}
          key={item.id}
          style={{
            backgroundColor: "#be93c5",
            borderRadius: 6,
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              padding: 7,
              width: 45,
              height: 45,
              borderRadius: 7,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </View>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "600",
              flex: 1,
            }}
          >
            {item.title}
          </Text>
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
            <Entypo name="chevron-right" size={24} color="black" />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default MainPressableItems;
