import { ActivityIndicator, View } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        zIndex: 900,
        position: "absolute",
        backgroundColor: "gray",
        width: "100%",
        height: "110%",
        backgroundColor: "#00000054",
        opacity: 1,
      }}
    >
      <ActivityIndicator size={100} color="#7f7fd5" />
    </View>
  );
};

export default Loader;
