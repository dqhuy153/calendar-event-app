import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import colors from "../../config/colors";

function AddButton({
    color = colors.secondary,
    iconSize,
    onPress,
    margin,
    title,
    fontSize,
}) {
    return (
        <TouchableOpacity style={styles.addBtn} onPress={onPress}>
            <AntDesign name="pluscircleo" size={iconSize} color={color} />
            <Text style={{ fontSize: fontSize, marginLeft: margin }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addBtn: {
        alignItems: "center",
        flexDirection: "row",
    },
});

export default AddButton;
