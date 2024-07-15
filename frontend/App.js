import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import EmployeesScreen from "./screens/EmployeesScreen";
import AddDetails from "./screens/AddDetails";
import { EmployeeProvider } from "./context/EmployeeProvider";
import MarkAttendance from "./screens/MarkAttendance";
import User from "./screens/User";
import Summary from "./screens/Summary";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <EmployeeProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Employess"
            component={EmployeesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddDetails"
            component={AddDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MarkAttendance"
            component={MarkAttendance}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="User"
            component={User}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Summary"
            component={Summary}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </EmployeeProvider>
    </NavigationContainer>
  );
}
