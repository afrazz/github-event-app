import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface ICard {
  children: React.ReactNode;
  onPress: () => void;
}

const Card: React.FC<ICard> = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {children}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    backgroundColor: "white",
    padding: 12,
  },
});
