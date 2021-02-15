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
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRef } from "react";
import randomColor from "randomcolor";
import { useFormikContext } from "formik";

import categories from "../values/categories";
import TaskDetailButton from "../components/buttons/TaskDetailButton";
import H1 from "../components/text/H1";
import colors from "../config/colors";
import SelectBoxTaskDetail from "../components/boxes/SelectBoxTaskDetail";
import BoxInfo from "../components/boxes/BoxInfo";
import CalendarListPicker from "../components/items/CalendarListPicker";
import ErrorMessage from "../components/text/ErrorMessage";

const placeholder = {
    label: "None",
    value: null,
    color: "#9EA0A4",
};

function TaskDetailScreen({
    onUnsavePress,
    onDeletePress,
    onMissPress,
    onCompletePress,
}) {
    const [modalDatePickerVisible, setModalDatePickerVisible] = useState(false);
    const [modalNewCategoryVisible, setModalNewCategoryVisible] = useState(
        false
    );

    const [newCategory, setNewCategory] = useState();
    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(
        false
    );
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(
        false
    );
    //const [task, setTask] = useState(taskName);
    const [typeOfTime, setTypeOfTime] = useState("startTime");
    const [change, setChange] = useState(false);

    const scrollView = useRef();

    const {
        errors,
        setFieldTouched,
        setFieldValue,
        touched,
        values,
        handleSubmit,
    } = useFormikContext();

    //Handle Time Picker
    const handleTimePicker = (date) => {
        console.log(moment(date).format());
        setEndDatePickerVisibility(false);
        setStartDatePickerVisibility(false);
        typeOfTime === "startTime"
            ? setFieldValue("startTime", moment(date).format())
            : setFieldValue("endTime", moment(date).format());
        setChange(true);
    };

    //Handle Date selected
    const handleDateSelect = (date) => {
        const dateSelected = values["startTime"]
            ? date.dateString + moment(values["startTime"]).format().substr(10)
            : moment(Date.now()).format("YYYY-MM-DD") === date.dateString
            ? Date.now()
            : date.dateString + "T05:00:00.000Z";
        setFieldValue("date", dateSelected);

        setFieldValue("startTime", values["startTime"] ? dateSelected : null);
        setFieldValue("endTime", null);
        setModalDatePickerVisible(false);
        setChange(true);
    };

    //handleCancelSetEndTime
    const handleCancelSetEndTime = () => {
        setFieldValue("endTime", null);
        setEndDatePickerVisibility(false);
        setChange(true);
    };

    //handle press new category button
    const handleNewCategoryPress = () => {
        Keyboard.dismiss();
        if (
            categories.findIndex(
                (i) => i.value.toLowerCase() === newCategory.toLowerCase()
            ) === -1
        ) {
            let randomcolor = randomColor();
            categories.push({
                label: newCategory,
                value: newCategory,
                colorIcon: randomcolor,
                totalTasks: 0,
                completeTasks: 0,
            });
            setFieldValue("category", newCategory);
            setFieldValue("categoryColor", randomcolor);
            setModalNewCategoryVisible(false);
            setChange(true);
        } else {
            Alert.alert("Error", "This category already exists");
        }
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
                <View style={{ width: "60%" }}>
                    <TextInput
                        style={{
                            color: colors.primary,

                            fontSize: 23,
                            fontWeight: "bold",
                        }}
                        multiline
                        scrollEnabled={false}
                        onBlur={() => {
                            setFieldTouched("task");
                        }}
                        onChangeText={(text) => {
                            setChange(true);
                            setFieldValue("task", text);
                        }}
                        value={values["task"]}
                    />
                    <ErrorMessage
                        error={errors["task"]}
                        visible={touched["task"]}
                    />
                </View>
                <Button
                    title="Save"
                    onPress={() => {
                        Alert.alert("Do you want to save the changes?", "", [
                            {
                                text: "Yes",
                                onPress: handleSubmit,
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
                    subTitle={moment(values["date"]).format("DD / MM / YYYY")}
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
                            selectedDay={moment(values["date"]).format(
                                "YYYY-MM-DD"
                            )}
                        />
                    </View>
                </Modal>

                <BoxInfo
                    title="Start Time"
                    subTitle={
                        values["startTime"]
                            ? moment(values["startTime"]).format("HH:mm")
                            : null
                    }
                    onPress={() => {
                        setStartDatePickerVisibility(true);
                        setTypeOfTime("startTime");
                    }}
                />

                <BoxInfo
                    title="End Time"
                    subTitle={
                        values["endTime"]
                            ? moment(values["endTime"]).format("DD/MM") ===
                              moment(values["startTime"]).format("DD/MM")
                                ? moment(values["endTime"]).format("HH:mm")
                                : moment(values["endTime"]).format(
                                      "(DD/ MM/ YYYY) HH:mm"
                                  )
                            : null
                    }
                    onPress={() => {
                        setEndDatePickerVisibility(true);
                        setTypeOfTime("endTime");
                    }}
                    style={{ marginBottom: 5 }}
                />
                <DateTimePickerModal
                    date={
                        values["startTime"]
                            ? moment(values["startTime"]).format(
                                  "YYYY - MM - DD"
                              ) ===
                              moment(values["date"]).format("YYYY - MM - DD")
                                ? new Date(values["startTime"])
                                : new Date(values["date"])
                            : new Date(values["date"])
                    }
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
                        values["endTime"]
                            ? new Date(values["endTime"])
                            : values["startTime"]
                            ? new Date(values["startTime"])
                            : new Date(values["date"])
                    }
                    date={
                        values["startTime"]
                            ? new Date(values["startTime"])
                            : new Date(values["date"])
                    }
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
                    onChangeText={(text) => {
                        setChange(true);
                        setFieldValue("note", text);
                    }}
                    multiline
                    onFocus={() =>
                        scrollView.current.scrollTo({
                            x: 0,
                            y: 180,
                            animation: true,
                        })
                    }
                    value={values["note"]}
                />
                <View style={styles.categoryPicker}>
                    <SelectBoxTaskDetail
                        placeholder={placeholder}
                        items={categories}
                        onNewCategoryPress={() =>
                            setModalNewCategoryVisible(true)
                        }
                        onOpen={() => {
                            values["category"]
                                ? categories[
                                      categories.findIndex(
                                          (i) =>
                                              i.value.toLowerCase() ===
                                              values["category"].toLowerCase()
                                      )
                                  ].totalTasks--
                                : categories[0].totalTasks--;
                        }}
                        onValueChange={(value, index) => {
                            setFieldValue("category", value);
                            index !== 0
                                ? setFieldValue(
                                      "categoryColor",
                                      categories[index - 1].colorIcon
                                  )
                                : setFieldValue("categoryColor", null);

                            setChange(true);
                        }}
                        onClose={() => {
                            values["category"]
                                ? categories[
                                      categories.findIndex(
                                          (i) =>
                                              i.value.toLowerCase() ===
                                              values["category"].toLowerCase()
                                      )
                                  ].totalTasks++
                                : categories[0].totalTasks++;
                        }}
                        key={(value) => value}
                        value={values["category"]}
                        color={values["categoryColor"]}
                        title="Category"
                    />
                </View>
                <Modal
                    avoidKeyboard
                    isVisible={modalNewCategoryVisible}
                    style={styles.modalContainer}
                    backdropOpacity={0.5}
                    onBackdropPress={() => setModalNewCategoryVisible(false)}
                    onBackButtonPress={() => setModalNewCategoryVisible(false)}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                >
                    <View style={[styles.modalContent, { height: 220 }]}>
                        <View style={styles.headerModal}>
                            <H1>Category</H1>
                            <TouchableOpacity
                                onPress={() =>
                                    setModalNewCategoryVisible(false)
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

            {!change ? (
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
            ) : (
                <View style={styles.footer}>
                    <TaskDetailButton
                        title="Delete"
                        backgroundColor="#eee"
                        textColor={colors.lessBlack}
                        onPress={() =>
                            Alert.alert("Save your edited task first!")
                        }
                    />
                    <TaskDetailButton
                        title="Miss"
                        backgroundColor="#eee"
                        textColor={colors.lessBlack}
                        onPress={() =>
                            Alert.alert("Save your edited task first!")
                        }
                    />
                    <TaskDetailButton
                        title="Complete"
                        backgroundColor="#eee"
                        textColor={colors.lessBlack}
                        onPress={() =>
                            Alert.alert("Save your edited task first!")
                        }
                    />
                </View>
            )}
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
