import React from "react";
import { View, StyleSheet, Text } from "react-native";

function TextInAddNew({ children }) {
    return <Text style={styles.container}>{children}</Text>;
}

const styles = StyleSheet.create({
    container: {
        fontSize: 17,
    },
});

export default TextInAddNew;
