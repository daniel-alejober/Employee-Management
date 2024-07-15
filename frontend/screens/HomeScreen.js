import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import EmployeeHeader from "../components/home/EmployeeHeader";
import HeroHelpButtons from "../components/home/HeroHelpButtons";
import MainPressableItems from "../components/home/MainPressableItems";
import QuickActionPanel from "../components/home/QuickActionPanel";

const HomeScreen = () => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient
          colors={["#7f7fd5", "#e9e4f0"]}
          style={{ flex: 1, height: windowHeight }}
        >
          <View style={{ padding: 12 }}>
            <EmployeeHeader />
            <HeroHelpButtons />
            <MainPressableItems />
            <QuickActionPanel />
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
