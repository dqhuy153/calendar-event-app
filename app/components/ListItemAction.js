import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function ListItemAction({
    onPress,
    iconName,
    size = 30,
    iconColor = "#fff",
    backgroundColor = colors.primary,
}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View
                style={[styles.container, { backgroundColor: backgroundColor }]}
            >
                <MaterialIcons name={iconName} size={size} color={iconColor} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 70,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default ListItemAction;
