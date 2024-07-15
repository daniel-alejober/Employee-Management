import { View, Pressable, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import clientAxios from "../utils/clientAxios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MarkAttendance = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(moment());
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const goToNextDay = () => {
    const nextDay = moment(currentDate).add(1, "days");
    setCurrentDate(nextDay);
  };

  const goToPrevDay = () => {
    const prevDay = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDay);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  const getAttendanceData = async () => {
    try {
      const { data } = await clientAxios.get("/api/v1/attendance", {
        params: {
          date: currentDate.format("MMMM D, YYYY"),
        },
      });
      setAttendance(data);
    } catch (error) {
      console.log("error", error);
    }
  };

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
  }, []);

  useEffect(() => {
    getAttendanceData();
  }, [currentDate]);

  const employeesWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee._id
    );

    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "",
    };
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginLeft: "auto",
              marginRight: "auto",
              marginVertical: 20,
            }}
          >
            <AntDesign
              onPress={goToPrevDay}
              name="left"
              size={24}
              color="black"
            />
            <Text>{formatDate(currentDate)}</Text>
            <AntDesign
              onPress={goToNextDay}
              name="right"
              size={24}
              color="black"
            />
          </View>

          <View style={{ marginHorizontal: 12 }}>
            {employeesWithAttendance.map((employee) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("User", {
                    name: employee.employeeName,
                    id: employee._id,
                    salary: employee.salary,
                    designation: employee.designation,
                  })
                }
                key={employee._id}
                style={{ marginTop: 10, gap: 10, flexDirection: "row" }}
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
                    {employee.employeeName.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {employee.employeeName}
                  </Text>
                  <Text style={{ marginTop: 1, color: "gray" }}>
                    {employee.designation}
                  </Text>
                </View>
                {employee.status && (
                  <View
                    style={{
                      borderRadius: 8,
                      width: 50,
                      height: 50,
                      backgroundColor: "#ff69b4",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {employee.status.charAt(0)}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MarkAttendance;
