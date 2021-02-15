import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,
    ScrollView,
    Keyboard,
    Alert,
} from "react-native";
import {
    FontAwesome5,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import Modal from "react-native-modal";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRef } from "react";
import randomColor from "randomcolor";

import colors from "../../config/colors";
import H1 from "../text/H1";
import routes from "../../navigation/routes";
import useStateWithPromise from "../../hooks/useStateWithPromise";
import BoxInfo from "../boxes/BoxInfo";
import CalendarListPicker from "../items/CalendarListPicker";
import SelectBoxTaskDetail from "../boxes/SelectBoxTaskDetail";
import categories from "../../values/categories";

const placeholder = {
    label: "None",
    value: null,
    color: "#9EA0A4",
};

function AddNewTaskButton({ navigation }) {
    let taskDetail = {};

    const [modalVisible, setModalVisible] = useState(false);
    const [modalDatePickerVisible, setModalDatePickerVisible] = useState(false);
    const [modalNewCategoryVisible, setModalNewCategoryVisible] = useState(
        false
    );

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(
        false
    );
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(
        false
    );
    const [task, setTask] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState(Date.now());
    const [id, setId] = useState(3);
    const [category, setCategory] = useState();
    const [categoryColor, setCategoryColor] = useState(null);
    const [newCategory, setNewCategory] = useState();

    const [typeOfTime, setTypeOfTime] = useState("startTime");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [taskItem, setTaskItem] = useStateWithPromise(taskDetail);
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
        const dateSelected = startTime
            ? date.dateString + moment(startTime).format().substr(10)
            : moment(Date.now()).format("YYYY-MM-DD") === date.dateString
            ? Date.now()
            : date.dateString + "T05:00:00.000Z";
        setDate(dateSelected);

        setStartTime(startTime ? dateSelected : null);
        setEndTime(null);
        setModalDatePickerVisible(false);
        console.log(dateSelected);
    };

    //Handle Add press
    const handleAddPress = async () => {
        if (task) {
            setId(id + 1);
            let taskDetail = {
                date: startTime ? startTime : date,
                endTime: endTime,
                id: id,
                note: note,
                startTime: startTime,
                task: task,
                status: "waiting",
                repeat: "",
                reminder: "",
                subTasks: [],
                category: category ? category : "general",
                categoryColor: categoryColor ? categoryColor : colors.primary,
            };
            const result = await setTaskItem(taskDetail);
            navigation.jumpTo(routes.TASKS, result);

            category
                ? categories[
                      categories.findIndex(
                          (i) =>
                              i.value.toLowerCase() === category.toLowerCase()
                      )
                  ].totalTasks++
                : categories[0].totalTasks++;

            setModalVisible(false);
            setTask(null);
            setNote(null);
            setStartTime(null), setEndTime(null);
            setCategory(null);
        } else {
            Alert.alert("Error", "Task name is required", [{ text: "OK" }]);
        }
    };

    //handleCancelSetEndTime
    const handleCancelSetEndTime = () => {
        setEndTime(null);
        setEndDatePickerVisibility(false);
    };

    //handleCancelAddTask
    const handleCancelAddTask = () => {
        setModalVisible(false);
        setTask(null);
        setNote(null);
        setStartTime(null), setEndTime(null);
    };

    //handle new category press
    const handleNewCategoryPress = () => {
        Keyboard.dismiss();
        let randomcolor = randomColor();
        if (
            categories.findIndex(
                (i) => i.value.toLowerCase() === newCategory.toLowerCase()
            ) === -1
        ) {
            categories.push({
                label: newCategory,
                value: newCategory,
                colorIcon: randomcolor,
                totalTasks: 0,
                completeTasks: 0,
            });
            setCategory(newCategory);

            setCategoryColor(randomcolor);
            setModalNewCategoryVisible(false);
        } else {
            Alert.alert("Error", "This category already exists");
        }
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
                onBackdropPress={handleCancelAddTask}
                onBackButtonPress={handleCancelAddTask}
                style={styles.contentView}
                onSwipeComplete={handleCancelAddTask}
                swipeDirection="down"
                propagateSwipe
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={handleCancelAddTask}
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
                            onSwipeComplete={() =>
                                setModalDatePickerVisible(false)
                            }
                            swipeDirection="down"
                            propagateSwipe
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
                                startTime
                                    ? moment(startTime).format("HH:mm")
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
                                endTime
                                    ? moment(endTime).format("DD/MM") ===
                                      moment(startTime).format("DD/MM")
                                        ? moment(endTime).format("HH:mm")
                                        : moment(endTime).format(
                                              "(DD/ MM/ YYYY) HH:mm"
                                          )
                                    : null
                            }
                            onPress={() => {
                                setEndDatePickerVisibility(true);
                                setTypeOfTime("endTime");
                            }}
                            style={{ marginBottom: 15 }}
                        />
                        <DateTimePickerModal
                            date={
                                startTime
                                    ? moment(startTime).format(
                                          "YYYY - MM - DD"
                                      ) ===
                                      moment(date).format("YYYY - MM - DD")
                                        ? new Date(startTime)
                                        : new Date(date)
                                    : new Date(date)
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
                                startTime ? new Date(startTime) : new Date(date)
                            }
                            date={
                                endTime
                                    ? new Date(endTime)
                                    : startTime
                                    ? new Date(startTime)
                                    : new Date(date)
                            }
                            headerTextIOS="Pick date and time"
                            isVisible={isEndDatePickerVisible}
                            is24Hour
                            confirmTextIOS="Done"
                            cancelTextIOS="No End Time"
                            onConfirm={handleTimePicker}
                            onCancel={handleCancelSetEndTime}
                            mode="datetime"
                            onTouchCancel={() =>
                                setEndDatePickerVisibility(false)
                            }
                            textColor={colors.black}
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
                        />
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
                                onNewCategoryPress={() =>
                                    setModalNewCategoryVisible(true)
                                }
                            />
                        </View>
                        <Modal
                            avoidKeyboard
                            isVisible={modalNewCategoryVisible}
                            backdropOpacity={0.5}
                            onBackdropPress={() =>
                                setModalNewCategoryVisible(false)
                            }
                            onBackButtonPress={() =>
                                setModalNewCategoryVisible(false)
                            }
                            animationIn="zoomIn"
                            animationOut="zoomOut"
                        >
                            <View
                                style={[
                                    styles.modalCategoryContent,
                                    { height: 220 },
                                ]}
                            >
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
                                            placeholderTextColor={
                                                colors.placeholder
                                            }
                                            style={styles.newCategoryInput}
                                            onChangeText={(text) =>
                                                setNewCategory(text)
                                            }
                                        />
                                    </ScrollView>
                                </View>

                                <Button
                                    title="Done"
                                    onPress={handleNewCategoryPress}
                                />
                            </View>
                        </Modal>

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
    categoryPicker: {
        backgroundColor: colors.light,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: 2,
    },
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
    modalCategoryContent: {
        backgroundColor: "white",
        height: "64%",
        paddingVertical: 0,
        paddingTop: 20,
        borderRadius: 17,
        overflow: "hidden",
    },
    tabContainer: {
        width: 100,
        alignItems: "center",
    },
});

export default AddNewTaskButton;
