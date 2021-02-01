import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

import colors from "../config/colors";
import TextInAddNew from "./text/TextInAddNew";

function BoxInfo({ onPress, title, subTitle, style }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.box, style]}>
                <TextInAddNew>{title}</TextInAddNew>
                <View style={styles.boxRightSide}>
                    <Text style={styles.text}>{subTitle}</Text>
                    <Entypo
                        name="chevron-small-right"
                        size={22}
                        color={colors.lessBlack}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    box: {
        padding: 20,
        paddingRight: 10,
        backgroundColor: colors.light,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
    },
    boxRightSide: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: colors.lessBlack,
        marginRight: 5,
    },
});

export default BoxInfo;
