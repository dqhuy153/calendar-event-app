import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../../config/colors";

function TaskCardProgress({
    task,
    startTime,
    categoryColor,
    endTime,
    renderRightActions,
    renderLeftActions,
    onPress,
}) {
    return (
        <Swipeable
            renderRightActions={renderRightActions ? renderRightActions : null}
            renderLeftActions={renderLeftActions ? renderLeftActions : null}
            overshootLeft={false}
            overshootRight={false}
            overshootFriction={8}
        >
            <TouchableHighlight underlayColor="#e222" onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.time}>{startTime}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={{ width: "85%" }}>
                            <Text style={styles.task}>{task}</Text>
                            {endTime && (
                                <Text style={styles.rangeTime}>
                                    {startTime} - {endTime}
                                </Text>
                            )}
                        </View>
                        <View
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: categoryColor,
                            }}
                        ></View>
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
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.light,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        alignItems: "center",
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

export default TaskCardProgress;
