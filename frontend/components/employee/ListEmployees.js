import { View, Text, FlatList } from "react-native";
import React from "react";

const ListEmployees = ({ dataEmployees, input }) => {
  return (
    <View>
      <FlatList
        data={dataEmployees}
        renderItem={({ item }) => {
          if (item.employeeName.toLowerCase().includes(input.toLowerCase())) {
            return (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginVertical: 10,
                  gap: 10,
                  marginHorizontal: 10,
                  maxWidth: "60%",
                }}
              >
                <View
                  style={{
                    borderRadius: 8,
                    width: 50,
                    height: 50,
                    backgroundColor: "#4b6cb7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      margin: "auto",
                      textAlignVertical: "center",
                    }}
                  >
                    {item.employeeName.charAt(0)}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                  >
                    {item.employeeName}
                  </Text>
                  <Text style={{ marginTop: 1, color: "gray" }}>
                    {item.designation}
                  </Text>
                </View>
              </View>
            );
          }
        }}
      ></FlatList>
    </View>
  );
};

export default ListEmployees;
