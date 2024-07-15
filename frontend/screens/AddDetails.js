import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import ShowToasts from "../utils/ShowToasts";
import clientAxios from "../utils/clientAxios";
import Loader from "../utils/Loader";
import { useNavigation } from "@react-navigation/native";
import useEmployee from "../Hooks/useEmployee";

const AddDetails = () => {
  const { loading, setLoading, setEmployees } = useEmployee();
  const navigation = useNavigation();
  const today = new Date();
  const initialDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );

  const [dataForm, setDataForm] = useState({
    country: "",
    employeeName: "",
    employeeId: "",
    designation: "",
    phoneNumber: "",
    dateOfBirth: initialDate,
    joiningDate: initialDate,
    salary: "",
    address: "",
  });
  const [dataAlert, setDataAlert] = useState({
    type: "",
    message: "",
  });

  const onChangeForm = (input, name) => {
    const { text } = input;

    setDataForm({
      ...dataForm,
      [name]: text,
    });
  };

  const handleDate = (date, name) => {
    setDataForm({
      ...dataForm,
      [name]: date,
    });
  };

  const registerEmployee = async () => {
    setLoading(true);
    try {
      const { data, status } = await clientAxios.post(
        "/api/v1/employees/addemployee",
        dataForm
      );

      if (status === 200) {
        setLoading(false);
        setDataAlert({
          type: "success",
          message: "The information was saved correctly.",
        });
        setEmployees((prevEmployees) => [...prevEmployees, data.employee]);
        navigation.navigate("Employess");
      }
    } catch (error) {
      setLoading(false);
      setDataAlert({
        type: "error",
        message: "There was an error saving employee information.",
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", position: "relative" }}>
      {dataAlert.type !== "" && <ShowToasts dataAlert={dataAlert} />}

      {loading && <Loader />}
      <ScrollView style={{ padding: 10, marginBottom: 15 }}>
        <View>
          <Text
            style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
          >
            Add a New Employee
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Country</Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Country"
            placeholderTextColor={"black"}
            value={dataForm.country}
            onChange={(e) => onChangeForm(e.nativeEvent, "country")}
          />
          <Text
            style={{ fontSize: 17, fontWeight: "bold", marginVertical: 10 }}
          >
            Full Name (First and last Name)
          </Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Enter your name"
            placeholderTextColor={"black"}
            value={dataForm.employeeName}
            onChange={(e) => onChangeForm(e.nativeEvent, "employeeName")}
          />
          {/* <Text
            style={{ fontSize: 17, fontWeight: "bold", marginVertical: 10 }}
          >
            Employee ID
          </Text>
          <TextInput
            inputMode="numeric"
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Employee ID"
            placeholderTextColor={"black"}
            value={dataForm.employeeId}
            onChange={(e) => onChangeForm(e.nativeEvent, "employeeId")}
          /> */}
          <Text
            style={{ fontSize: 17, fontWeight: "bold", marginVertical: 10 }}
          >
            Designation
          </Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Designation"
            placeholderTextColor={"black"}
            value={dataForm.designation}
            onChange={(e) => onChangeForm(e.nativeEvent, "designation")}
          />
          <Text
            style={{ fontSize: 17, fontWeight: "bold", marginVertical: 10 }}
          >
            Mobile Number
          </Text>
          <TextInput
            inputMode="tel"
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Mobile Number"
            placeholderTextColor={"black"}
            value={dataForm.phoneNumber}
            onChange={(e) => onChangeForm(e.nativeEvent, "phoneNumber")}
          />
          <Text
            style={{ fontSize: 17, fontWeight: "bold", marginVertical: 10 }}
          >
            Date of Birth
          </Text>

          <DatePicker
            mode="calendar"
            maximumDate={initialDate}
            selected={dataForm.dateOfBirth}
            onDateChange={(date) => handleDate(date, "dateOfBirth")}
          />

          <Text
            style={{ fontSize: 17, fontWeight: "bold", marginVertical: 10 }}
          >
            Joining Date
          </Text>

          <DatePicker
            mode="calendar"
            maximumDate={initialDate}
            selected={dataForm.joiningDate}
            onDateChange={(date) => handleDate(date, "joiningDate")}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text>Active Employee</Text>
            <Text>True</Text>
          </View>
          <Text
            style={{ fontSize: 17, fontWeight: "bold", marginVertical: 10 }}
          >
            Salary
          </Text>
          <TextInput
            inputMode="decimal"
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Enter Salary"
            placeholderTextColor={"black"}
            value={dataForm.salary}
            onChange={(e) => onChangeForm(e.nativeEvent, "salary")}
          />
          <Text
            style={{ fontSize: 17, fontWeight: "bold", marginVertical: 10 }}
          >
            Address
          </Text>
          <TextInput
            style={{
              padding: 10,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              marginTop: 5,
              borderRadius: 5,
            }}
            placeholder="Enter Address"
            placeholderTextColor={"black"}
            value={dataForm.address}
            onChange={(e) => onChangeForm(e.nativeEvent, "address")}
          />
        </View>
        <Pressable
          onPress={registerEmployee}
          style={{
            backgroundColor: "#abcaba",
            marginVertical: 15,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Add Employee
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddDetails;
