import React from "react";
import { View, StyleSheet, Text } from "react-native";

function H1({ children, style }) {
    return <Text style={[style, styles.container]}>{children}</Text>;
}

const styles = StyleSheet.create({
    container: {
        fontSize: 23,
        fontWeight: "bold",
    },
});

export default H1;
