import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#000" size="large" />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
