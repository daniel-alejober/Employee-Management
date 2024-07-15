import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import moment from "moment-timezone";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import BtnStatus from "../components/user/BtnStatus";
import clientAxios from "../utils/clientAxios";
import ShowToasts from "../utils/ShowToasts";

const User = () => {
  const route = useRoute();
  const { id, name, salary, designation } = route.params;
  const [currentDate, setCurrentDate] = useState(
    moment().tz("America/Mexico_City")
  );
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  });

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

  const submitAttendance = async () => {
    setDataAlert({
      type: "",
      message: "",
    });
    try {
      const attendanceData = {
        employeeId: id,
        employeeName: name,
        date: currentDate.toDate(),
        status: attendanceStatus,
      };
      const { data } = await clientAxios.post(
        "/api/v1/attendance",
        attendanceData
      );

      if (data._id) {
        setAttendanceStatus(data.status);
        setDataAlert({
          type: "success",
          message: "The information was saved correctly.",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {dataAlert.type !== "" && <ShowToasts dataAlert={dataAlert} />}
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
        <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={24} color="black" />
      </View>
      <Pressable
        style={{
          marginVertical: 10,
          marginHorizontal: 13,
          flexDirection: "row",
          gap: 10,
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
            {name.charAt(0)}
          </Text>
        </View>
        <View>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
            {name}
          </Text>
          <Text style={{ marginTop: 1, color: "gray" }}>
            {designation}- {id}
          </Text>
        </View>
      </Pressable>
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 12 }}>
        Basic Pay : {salary}
      </Text>
      <View style={{ marginHorizontal: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginTop: 7,
            letterSpacing: 3,
          }}
        >
          ATTENDANCE
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginVertical: 10,
          }}
        >
          <BtnStatus
            title="Present"
            value="present"
            attendanceStatus={attendanceStatus}
            setAttendanceStatus={setAttendanceStatus}
          />
          <BtnStatus
            title="Absent"
            value="absent"
            attendanceStatus={attendanceStatus}
            setAttendanceStatus={setAttendanceStatus}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginVertical: 10,
          }}
        >
          <BtnStatus
            title="Half Day"
            value="halfday"
            attendanceStatus={attendanceStatus}
            setAttendanceStatus={setAttendanceStatus}
          />
          <BtnStatus
            title="Holiday"
            value="holiday"
            attendanceStatus={attendanceStatus}
            setAttendanceStatus={setAttendanceStatus}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#e0e0e0",
              padding: 10,
              flex: 1,
            }}
            placeholderTextColor="black"
            placeholder="Advance / Loans"
          />
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#e0e0e0",
              padding: 10,
              flex: 1,
            }}
            placeholderTextColor="black"
            placeholder="Extra Bonus"
          />
        </View>
        <Pressable
          onPress={submitAttendance}
          style={{
            padding: 15,
            backgroundColor: "#00c6ff",
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 6,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Submit Attendance
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default User;
