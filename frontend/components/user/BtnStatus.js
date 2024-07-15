import { Text, Pressable } from "react-native";
import React from "react";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

const BtnStatus = ({ title, value, attendanceStatus, setAttendanceStatus }) => {
  return (
    <Pressable
      onPress={() => setAttendanceStatus(value)}
      style={{
        backgroundColor: "#c4e0e5",
        padding: 10,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
      }}
    >
      {attendanceStatus === value ? (
        <FontAwesome5 name="dot-circle" size={24} color="black" />
      ) : (
        <Entypo name="circle" size={24} color="black" />
      )}
      <Text>{title}</Text>
    </Pressable>
  );
};

export default BtnStatus;
