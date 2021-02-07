import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRef } from "react";

import TaskDetailButton from "../components/buttons/TaskDetailButton";
import H1 from "../components/text/H1";
import colors from "../config/colors";
import SelectBoxTaskDetail from "../components/SelectBoxTaskDetail";
import BoxInfo from "../components/BoxInfo";
import CalendarListPicker from "../components/CalendarListPicker";

const categories = [
    {
        label: "Education",
        value: "education",
        colorIcon: colors.primary,
    },
    {
        label: "Personal",
        value: "personal",
        colorIcon: "lightgreen",
    },
    {
        label: "Work",
        value: "work",
        colorIcon: "gold",
    },
    {
        label: "Health",
        value: "health",
        colorIcon: "tomato",
    },
];
const placeholder = {
    label: "None",
    value: null,
    color: "#9EA0A4",
};

function TaskDetailScreen({
    onCancelPress,
    dayTask,
    startTimeTask,
    endTimeTask,
    noteTask,
    taskName,
    categoryTask,
    categoryColorTask,
}) {
    const [category, setCategory] = useState(categoryTask);
    const [categoryColor, setCategoryColor] = useState(categoryColorTask);
    const [modalDatePickerVisible, setModalDatePickerVisible] = useState(false);
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(
        false
    );
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(
        false
    );
    const [task, setTask] = useState(taskName);
    const [note, setNote] = useState(noteTask);
    const [date, setDate] = useState(dayTask);
    const [id, setId] = useState(3);

    const [typeOfTime, setTypeOfTime] = useState("startTime");
    const [startTime, setStartTime] = useState(startTimeTask);
    const [endTime, setEndTime] = useState(endTimeTask);

    const scrollView = useRef();

    //Handle Time Picker
    const handleTimePicker = (date) => {
        console.log(moment(date).format());
        setEndDatePickerVisibility(false);
        setStartDatePickerVisibility(false);
        typeOfTime === "startTime"
            ? setStartTime(moment(date).format())
            : setEndTime(moment(date).format());
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

    //handleCancelSetEndTime
    const handleCancelSetEndTime = () => {
        setEndTime(null);
        setEndDatePickerVisibility(false);
    };

    const handleCompletePress = () => {};

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 2,
                }}
            >
                <H1 style={{ color: colors.primary, marginBottom: 20 }}>
                    {taskName}
                </H1>
                <TouchableOpacity
                    onPress={onCancelPress}
                    style={{
                        width: 25,
                    }}
                >
                    <MaterialCommunityIcons
                        name="close"
                        size={22}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                ref={scrollView}
                keyboardDismissMode="on-drag"
                style={{ height: "72.5%" }}
            >
                <View style={styles.categoryPicker}>
                    <SelectBoxTaskDetail
                        placeholder={placeholder}
                        items={categories}
                        onValueChange={(value, index) => {
                            setCategory(value);
                            index !== 0
                                ? setCategoryColor(
                                      categories[index - 1].colorIcon
                                  )
                                : setCategoryColor(null);
                        }}
                        key={(value) => value}
                        value={category}
                        color={categoryColor}
                        title="Category"
                    />
                </View>
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
                    onBackdropPress={() => setModalDatePickerVisible(false)}
                    onBackButtonPress={() => setModalDatePickerVisible(false)}
                    propagateSwipe
                    animationIn="zoomIn"
                    animationOut="zoomOut"
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
                    subTitle={
                        startTime ? moment(startTime).format("HH:mm") : null
                    }
                    onPress={() => {
                        setStartDatePickerVisibility(true);
                        setTypeOfTime("startTime");
                    }}
                />

                <BoxInfo
                    title="End Time"
                    subTitle={
                        endTime
                            ? moment(endTime).format("DD/MM") ===
                              moment(startTime).format("DD/MM")
                                ? moment(endTime).format("HH:mm")
                                : moment(endTime).format("(DD/ MM/ YYYY) HH:mm")
                            : null
                    }
                    onPress={() => {
                        setEndDatePickerVisibility(true);
                        setTypeOfTime("endTime");
                    }}
                    style={{ marginBottom: 5 }}
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
                    confirmTextIOS="Done"
                    textColor={colors.black}
                    style={{ color: colors.black }}
                />
                <DateTimePickerModal
                    minimumDate={
                        startTime ? new Date(startTime) : new Date(date)
                    }
                    date={startTime ? new Date(startTime) : new Date(date)}
                    headerTextIOS="Pick date and time"
                    isVisible={isEndDatePickerVisible}
                    is24Hour
                    confirmTextIOS="Done"
                    cancelTextIOS="No End Time"
                    onConfirm={handleTimePicker}
                    onCancel={handleCancelSetEndTime}
                    mode="datetime"
                    onTouchCancel={() => setEndDatePickerVisibility(false)}
                    textColor={colors.black}
                />
                <TextInput
                    placeholder="Note..."
                    style={styles.newNoteInput}
                    onChangeText={(text) => setNote(text)}
                    multiline
                    onFocus={() =>
                        scrollView.current.scrollTo({
                            x: 0,
                            y: 220,
                            animation: true,
                        })
                    }
                    value={noteTask}
                />

                <BoxInfo
                    title="Repeat"
                    subTitle="Never"
                    onPress={() => {
                        alert("Not available");
                    }}
                />
                <BoxInfo
                    title="Reminder"
                    subTitle="None"
                    onPress={() => {
                        alert("Not available");
                    }}
                    style={{ marginBottom: 15 }}
                />
                <BoxInfo
                    title="Sub Tasks"
                    subTitle="0 Added"
                    onPress={() => {
                        alert("Not available");
                    }}
                    style={{ marginBottom: 100 }}
                />
            </ScrollView>

            <View style={styles.footer}>
                <TaskDetailButton
                    title="Delete"
                    backgroundColor="#FEECEB"
                    textColor="#EC3C31"
                />
                <TaskDetailButton
                    title="Miss"
                    backgroundColor="#FEF7DD"
                    textColor="#FD6B17"
                />
                <TaskDetailButton
                    title="Complete"
                    backgroundColor="#D7FED8"
                    textColor="#0D7F0F"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingHorizontal: 20, paddingVertical: 0 },
    header: {
        alignItems: "baseline",
        justifyContent: "space-between",
    },
    categoryPicker: {
        backgroundColor: colors.light,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: 2,
    },
    newNoteInput: {
        width: "100%",
        backgroundColor: colors.light,
        height: 59,

        padding: 20,
        marginBottom: 5,
        fontSize: 19,
        fontWeight: "500",
        minHeight: 150,
        paddingTop: 20,
    },
    modalContainer: {},
    modalContent: {
        backgroundColor: "white",
        height: "55%",
        paddingVertical: 0,
        paddingTop: 20,
        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
    },
});

export default TaskDetailScreen;
