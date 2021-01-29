import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import colors from "../config/colors";
import defaultStyles from "../config/defaultStyles";
import AddButton from "./buttons/AddButton";

function MediumCard({
    color,
    completeTasks,
    onPress,
    onPressAdd,
    percent,
    totalTasks,
    title,
    style,
}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[defaultStyles.cardShadow, styles.container, style]}>
                <ProgressCircle
                    percent={percent}
                    radius={30}
                    borderWidth={8}
                    color={color}
                    shadowColor="#e4e4e4"
                    bgColor="#fff"
                >
                    <Text style={styles.percentText}>{percent}%</Text>
                </ProgressCircle>
                <View style={[styles.circle, { backgroundColor: color }]} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <AddButton
                        fontSize={10}
                        margin={5}
                        title="Add"
                        onPress={onPressAdd}
                    />
                </View>
                <Text style={styles.subtitle}>
                    {completeTasks}/{totalTasks} completed
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 15,
        width: "48%",
        marginBottom: 17,
    },
    circle: {
        borderRadius: 5,
        height: 10,
        position: "absolute",
        top: 15,
        right: 15,
        width: 10,
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: 10,
    },
    title: {
        textTransform: "capitalize",
        fontWeight: "500",
        fontSize: 17,
        width: "60%",
    },
});

export default MediumCard;
