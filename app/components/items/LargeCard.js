import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ProgressCircle from "react-native-progress-circle";

import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";

function LargeCard({ completeTasks, percent, totalTasks, style }) {
    return (
        <View style={[defaultStyles.cardShadow, styles.container, style]}>
            <View style={styles.leftSide}>
                <ProgressCircle
                    percent={percent}
                    radius={40}
                    borderWidth={8}
                    color={colors.secondary}
                    shadowColor="#e4e4e4"
                    bgColor="#fff"
                >
                    <Text style={styles.percentText}>{percent}%</Text>
                </ProgressCircle>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Tasks</Text>
                    <Text style={styles.title}>completed</Text>
                    <Text style={styles.subtitle}>
                        {completeTasks}/{totalTasks} completed
                    </Text>
                </View>
            </View>
            <View style={styles.rightSide}>
                <View style={styles.line} />
                <Text style={styles.textSide}>Weekly report</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 30,
        flexDirection: "row",
        height: 180,
        width: "98%",
        alignSelf: "center",
    },
    leftSide: {
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 25,
        zIndex: 1,
        width: "80%",
    },
    textContainer: {
        marginLeft: 16,
    },
    title: {
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subtitle: {
        marginTop: 3,
        fontSize: 17,
    },
    rightSide: {
        alignItems: "center",
        backgroundColor: colors.primary,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: "row",
        justifyContent: "flex-end",
        height: 180,
        position: "absolute",
        width: "30%",
        right: 0,
    },
    line: {
        backgroundColor: colors.white,
        height: 55,
        right: 55,
        position: "absolute",
        width: 1,
    },
    textSide: {
        color: colors.white,
        transform: [{ rotate: "90deg" }, { translateY: -10 }],
    },
});

export default LargeCard;
