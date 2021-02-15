import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import colors from "../../config/colors";

function Screen({ children, style }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.view, style]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.white,
    },
    view: {
        flex: 1,
        marginTop: 20,
    },
});

export default Screen;
