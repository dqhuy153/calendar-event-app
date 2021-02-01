import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,
    Text,
    ScrollView,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "react-native-modal";
import { createStackNavigator } from "@react-navigation/stack";
import moment, { utc } from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRef } from "react";

import colors from "../../config/colors";
import H1 from "../text/H1";
import routes from "../../navigation/routes";
import useStateWithPromise from "../hooks/useStateWithPromise";
import BoxInfo from "../BoxInfo";
import CalendarListPicker from "../CalendarListPicker";

function AddNewTaskButton({ navigation }) {
    let taskDetail = {};

    const [modalVisible, setModalVisible] = useState(false);
    const [modalDatePickerVisible, setModalDatePickerVisible] = useState(false);

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(
        false
    );
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(
        false
    );
    const [task, setTask] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState(Date.now());
    const [id, setId] = useState(6);

    const [typeOfTime, setTypeOfTime] = useState("startTime");
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const [taskItem, setTaskItem] = useStateWithPromise(taskDetail);
    const scrollView = useRef();

    //Handle Time Picker
    const handleTimePicker = (date) => {
        console.log(moment(date).utc());
        typeOfTime === "startTime"
            ? setStartTime(moment(date).format())
            : setEndTime(moment(date).format());

        console.log(new Date(Date.now()) instanceof Date);
        setEndDatePickerVisibility(false);
        setStartDatePickerVisibility(false);
    };

    //Handle Date selected
    const handleDateSelect = (date) => {
        const dateSelected =
            moment(Date.now()).format("YYYY-MM-DD") === date.dateString
                ? Date.now()
                : date.dateString + "T05:00:00.000Z";
        setDate(dateSelected);

        setModalDatePickerVisible(false);
        console.log(dateSelected);
    };

    //Handle Add press
    const handleAddPress = async () => {
        setId(id + 1);
        let taskDetail = {
            date: startTime,
            endTime: endTime,
            id: id,
            note: note,
            startTime: startTime,
            task: task,
        };
        const result = await setTaskItem(taskDetail);
        navigation.jumpTo(routes.TASKS, result);
        setModalVisible(false);
    };

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.tabContainer}>
                    <View style={[styles.iconContainer]}>
                        <FontAwesome5
                            name="plus"
                            size={20}
                            color={colors.white}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <Modal
                avoidKeyboard
                backdropOpacity={0.3}
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                style={styles.contentView}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{ width: 45 }}
                        >
                            <MaterialCommunityIcons
                                name="close"
                                size={22}
                                color="black"
                            />
                        </TouchableOpacity>
                        <H1 style={{ color: colors.primary }}>New Task</H1>
                        {/*<TouchableOpacity onPress={handleAddPress}>
                            <AntDesign name="plus" size={22} color="black" />
                         </TouchableOpacity>*/}
                        <Button title="Add" onPress={handleAddPress} />
                    </View>
                    <TextInput
                        placeholder="Task Name..."
                        style={styles.newTaskInput}
                        onChangeText={(text) => setTask(text)}
                    />
                    <ScrollView ref={scrollView} keyboardDismissMode="on-drag">
                        <BoxInfo
                            title="Due Date"
                            subTitle={moment(date).format("DD / MM / YYYY")}
                            onPress={() => setModalDatePickerVisible(true)}
                        />
                        <Modal
                            isVisible={modalDatePickerVisible}
                            style={styles.modalContainer}
                            avoidKeyboard
                            backdropOpacity={0.3}
                            onBackdropPress={() =>
                                setModalDatePickerVisible(false)
                            }
                            onBackButtonPress={() =>
                                setModalDatePickerVisible(false)
                            }
                        >
                            <View style={styles.modalContent}>
                                <CalendarListPicker
                                    onClosePress={() =>
                                        setModalDatePickerVisible(false)
                                    }
                                    onDayPress={handleDateSelect}
                                />
                            </View>
                        </Modal>

                        <BoxInfo
                            title="Start Time"
                            subTitle={startTime}
                            onPress={() => {
                                setStartDatePickerVisibility(true);
                                setTypeOfTime("startTime");
                            }}
                        />
                        <BoxInfo
                            title="End Time"
                            subTitle={endTime}
                            onPress={() => {
                                setEndDatePickerVisibility(true);
                                setTypeOfTime("endTime");
                            }}
                            style={{ marginBottom: 15 }}
                        />
                        <DateTimePickerModal
                            date={new Date(date)}
                            isVisible={isStartDatePickerVisible}
                            mode="time"
                            onConfirm={handleTimePicker}
                            onCancel={() => {
                                setStartDatePickerVisibility(false);
                            }}
                            headerTextIOS="Pick time"
                            is24Hour
                        />
                        <DateTimePickerModal
                            minimumDate={new Date(startTime)}
                            date={new Date(startTime)}
                            headerTextIOS="Pick date and time"
                            isVisible={isEndDatePickerVisible}
                            is24Hour
                            onConfirm={handleTimePicker}
                            onCancel={() => setEndDatePickerVisibility(false)}
                            mode="datetime"
                        />

                        <BoxInfo
                            title="Repeat"
                            subTitle="Never"
                            onPress={handleDateSelect}
                        />
                        <BoxInfo
                            title="Reminder"
                            subTitle="None"
                            onPress={handleDateSelect}
                            style={{ marginBottom: 15 }}
                        />
                        <BoxInfo
                            title="Sub Tasks"
                            subTitle="0 Added"
                            onPress={handleDateSelect}
                        />
                        <BoxInfo
                            title="Categories"
                            subTitle="None"
                            onPress={handleDateSelect}
                        />
                        <TextInput
                            placeholder="Note..."
                            style={styles.newNoteInput}
                            onChangeText={(text) => setNote(text)}
                            multiline
                            onFocus={() => scrollView.current.scrollToEnd()}
                        />
                    </ScrollView>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "white",
        height: "88%",
        paddingVertical: 0,
        paddingTop: 20,
        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
    },

    contentView: {
        justifyContent: "flex-end",
        margin: 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    headerModal: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 30,
        paddingTop: 0,
    },
    iconContainer: {
        alignItems: "center",
        backgroundColor: colors.primary,
        borderRadius: 22.5,
        bottom: 5,
        height: 45,
        justifyContent: "center",
        width: 45,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowColor: colors.medium,
        shadowOpacity: 0.6,
        elevation: 10,
    },
    newNoteInput: {
        width: "100%",
        backgroundColor: colors.light,
        height: 59,
        marginTop: 20,
        padding: 20,
        marginBottom: 100,
        fontSize: 19,
        fontWeight: "500",
        minHeight: 150,
        paddingTop: 20,
    },
    newTaskInput: {
        width: "100%",
        backgroundColor: colors.light,
        height: 59,
        marginTop: 20,
        padding: 20,
        marginBottom: 17,
        fontSize: 19,
        fontWeight: "500",
        minHeight: 70,
    },
    modalContainer: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "white",
        height: "78%",
        paddingVertical: 0,
        paddingTop: 20,
        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
    },
    tabContainer: {
        width: 100,
        alignItems: "center",
    },
});

export default AddNewTaskButton;
