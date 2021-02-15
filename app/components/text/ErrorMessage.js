import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";

function ErrorMessage({ error, visible }) {
    if (!visible || !error) return null;

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "baseline",
                borderTopWidth: 1,
                paddingTop: 8,
                borderColor: "#DADADA",
                width: 180,
            }}
        >
            <Ionicons name="warning" size={19} color="#EF5046" />
            <Text style={styles.error}>{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    error: {
        color: "#EF5046",
        fontSize: 15,
        marginLeft: 4,
    },
});

export default ErrorMessage;
