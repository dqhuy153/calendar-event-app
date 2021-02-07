import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Keyboard,
    Button,
    Alert,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRef } from "react";
import randomColor from "randomcolor";

import categories from "../values/categories";
import TaskDetailButton from "../components/buttons/TaskDetailButton";
import H1 from "../components/text/H1";
import colors from "../config/colors";
import SelectBoxTaskDetail from "../components/SelectBoxTaskDetail";
import BoxInfo from "../components/BoxInfo";
import CalendarListPicker from "../components/CalendarListPicker";

const placeholder = {
    label: "None",
    value: null,
    color: "#9EA0A4",
};

function TaskDetailScreen({
    onUnsavePress,
    onSavePress,
    dayTask,
    startTimeTask,
    endTimeTask,
    noteTask,
    taskName,
    categoryTask,
    categoryColorTask,
    onDeletePress,
    onMissPress,
    onCompletePress,
}) {
    const [modalDatePickerVisible, setModalDatePickerVisible] = useState(false);
    const [modelNewCategoryVisible, setModelNewCategoryVisible] = useState(
        false
    );

    const [category, setCategory] = useState(categoryTask);
    const [categoryColor, setCategoryColor] = useState(categoryColorTask);
    const [newCategory, setNewCategory] = useState();
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

    const handleNewCategoryPress = () => {
        Keyboard.dismiss();
        let randomcolor = randomColor();
        categories.push({
            label: newCategory,
            value: newCategory,
            colorIcon: randomcolor,
        });
        setCategory(newCategory);
        setCategoryColor(randomcolor);
        setModelNewCategoryVisible(false);
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 2,
                    alignItems: "center",
                    marginBottom: 15,
                }}
            >
                <TextInput
                    style={{
                        color: colors.primary,
                        width: "60%",
                        fontSize: 23,
                        fontWeight: "bold",
                    }}
                    multiline
                    onChangeText={(text) => setTask(text)}
                    scrollEnabled={false}
                >
                    {task}
                </TextInput>
                <Button
                    title="Save"
                    onPress={() => {
                        Alert.alert("Do you want to save the changes?", "", [
                            {
                                text: "Yes",
                                onPress: onSavePress,
                            },
                            {
                                text: "Keep editing",
                            },
                            {
                                text: "No",
                                onPress: onUnsavePress,
                            },
                        ]);
                    }}
                />
            </View>

            <ScrollView
                ref={scrollView}
                keyboardDismissMode="on-drag"
                style={styles.scrollViewHeight}
            >
                <BoxInfo
                    title="Due Date"
                    subTitle={moment(date).format("DD / MM / YYYY")}
                    onPress={() => setModalDatePickerVisible(true)}
                    style={{
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }}
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
                            y: 180,
                            animation: true,
                        })
                    }
                    value={note}
                />
                <View style={styles.categoryPicker}>
                    <SelectBoxTaskDetail
                        placeholder={placeholder}
                        items={categories}
                        onNewCategoryPress={() =>
                            setModelNewCategoryVisible(true)
                        }
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
                <Modal
                    avoidKeyboard
                    isVisible={modelNewCategoryVisible}
                    style={styles.modalContainer}
                    backdropOpacity={0.5}
                    onBackdropPress={() => setModelNewCategoryVisible(false)}
                    onBackButtonPress={() => setModelNewCategoryVisible(false)}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                >
                    <View style={[styles.modalContent, { height: 220 }]}>
                        <View style={styles.headerModal}>
                            <H1>Category</H1>
                            <TouchableOpacity
                                onPress={() =>
                                    setModelNewCategoryVisible(false)
                                }
                                style={styles.closeModal}
                            >
                                <MaterialIcons
                                    name="close"
                                    size={20}
                                    color={colors.medium}
                                />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <ScrollView keyboardShouldPersistTaps="handled">
                                <TextInput
                                    autoFocus
                                    placeholder="New category..."
                                    placeholderTextColor={colors.placeholder}
                                    style={styles.newCategoryInput}
                                    onChangeText={(text) =>
                                        setNewCategory(text)
                                    }
                                />
                            </ScrollView>
                        </View>

                        <Button title="Done" onPress={handleNewCategoryPress} />
                    </View>
                </Modal>

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
                    onPress={onDeletePress}
                />
                <TaskDetailButton
                    title="Miss"
                    backgroundColor="#FEF7DD"
                    textColor="#FD6B17"
                    onPress={onMissPress}
                />
                <TaskDetailButton
                    title="Complete"
                    backgroundColor="#D7FED8"
                    textColor="#0D7F0F"
                    onPress={onCompletePress}
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
    headerModal: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingBottom: 20,
        paddingTop: 0,
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
    newCategoryInput: {
        width: "100%",
        backgroundColor: colors.light,
        height: 59,
        paddingLeft: 30,
        marginTop: 10,
        marginBottom: 27,
        fontSize: 19,
        fontWeight: "500",
        minHeight: 70,
    },
    modalContainer: {},
    modalContent: {
        backgroundColor: "white",
        height: "64%",
        paddingVertical: 0,
        paddingTop: 20,
        borderRadius: 17,
        overflow: "hidden",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
    },
    scrollViewHeight: {
        height: "77%",
    },
});

export default TaskDetailScreen;
