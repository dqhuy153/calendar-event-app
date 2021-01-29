import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../config/colors";

function TaskCard({
    task,
    startTime,
    endTime,
    renderRightActions,
    renderLeftActions,
    onPress,
}) {
    return (
        <Swipeable
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
            overshootLeft={false}
            overshootRight={false}
            overshootFriction={8}
        >
            <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>{startTime}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.task}>{task}</Text>
                        <Text style={styles.rangeTime}>
                            {startTime} - {endTime}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.white,
        paddingLeft: 20,
    },
    detailContainer: {
        backgroundColor: colors.light,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingVertical: 15,
        width: "80%",
    },
    task: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 7,
    },
    rangeTime: {
        fontSize: 16,
    },
    time: {
        fontSize: 19,
        color: colors.secondary,
        fontWeight: "500",
    },
});

export default TaskCard;
