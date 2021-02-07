import React from "react";
import { View, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Feather } from "@expo/vector-icons";

function SelectBoxTaskDetail({
    placeholder,
    items,
    onValueChange,
    value,
    color,
    title,
}) {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 17 }}>{title}</Text>

            <RNPickerSelect
                placeholder={placeholder}
                items={items}
                onValueChange={onValueChange}
                style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                        top: 8,
                        right: 12,
                    },
                }}
                value={value}
                useNativeAndroidPickerStyle={false}
                textInputProps={{ underlineColor: "yellow" }}
                Icon={() => {
                    return color ? (
                        <View
                            style={{
                                width: 15,
                                height: 15,
                                borderRadius: 7.5,
                                backgroundColor: color,
                                top: 5,
                            }}
                        ></View>
                    ) : (
                        <Feather name="chevron-down" size={24} color="black" />
                    );
                }}
                fixAndroidTouchableBug
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 11,
        paddingHorizontal: 10,
        width: 140,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "purple",
        borderRadius: 8,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default SelectBoxTaskDetail;
