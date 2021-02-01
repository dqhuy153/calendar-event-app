import React from "react";
import { View, StyleSheet } from "react-native";
import H1 from "./text/H1";

function test(props) {
    return (
        <View style={styles.container}>
            <H1>This is a test component</H1>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default test;
