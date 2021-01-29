import React from "react";
import { useState } from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Screen from "../components/Screen";
import routes from "../navigation/routes";

function AddTasksCreen({ navigation }) {
    return (
        <Screen>
            <TouchableOpacity>
                <Text>Close</Text>
            </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "blue",
    },
});

export default AddTasksCreen;
