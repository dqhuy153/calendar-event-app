import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

function TaskDetailButton({
    onPress,
    backgroundColor,
    textColor,
    title,
    width = "30%",
}) {
    return (
        <View style={{ width: width }}>
            <TouchableOpacity onPress={onPress}>
                <View
                    style={[
                        styles.button,
                        { backgroundColor: backgroundColor },
                    ]}
                >
                    <Text style={[styles.textButton, { color: textColor }]}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    textButton: {
        fontSize: 16,
        fontWeight: "500",
        textTransform: "capitalize",
    },
});

export default TaskDetailButton;
