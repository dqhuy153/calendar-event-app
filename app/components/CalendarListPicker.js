import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CalendarList } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";

import defaultStyles from "../config/defaultStyles";
import H1 from "./text/H1";
import colors from "../config/colors";

function CalendarListPicker({ onClosePress, onDayPress, style }) {
    return (
        <>
            <View style={styles.headerModal}>
                <H1>Calendar</H1>
                <TouchableOpacity
                    onPress={onClosePress}
                    style={styles.closeModal}
                >
                    <MaterialIcons
                        name="close"
                        size={20}
                        color={colors.medium}
                    />
                </TouchableOpacity>
            </View>
            <View style={[style, styles.calendarListContainer]}>
                <CalendarList
                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                    /*onVisibleMonthsChange={(months) => {
                            console.log("now these months are visible", months);
                        }}*/
                    onDayPress={onDayPress}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={50}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={50}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={true}
                    //...calendarParams
                    style={{
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                    }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    headerModal: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 30,
        paddingTop: 0,
    },
    calendarListContainer: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        shadowRadius: 15,
    },
});

export default CalendarListPicker;
