import React from "react";
import { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import ModalLb from "react-native-modal";
import * as Yup from "yup";

import Form from "../components/form/Form";
import CalendarListPicker from "../components/items/CalendarListPicker";
import H1 from "../components/text/H1";
import Screen from "../components/items/Screen";
import colors from "../config/colors";
import defaultStyles from "../config/defaultStyles";
import TaskCard from "../components/items/TaskCard";
import ListItemAction from "../components/items/ListItemAction";
import TaskDetailScreen from "./TaskDetailScreen";
import tasks from "../values/tasks";
import categories from "../values/categories";
import TaskCardProgress from "../components/items/TaskCardProgress";

//prevent warning
moment.createFromInputFallback = function (config) {
    config._d = new Date(config._i);
};

const validationSchema = Yup.object().shape({
    task: Yup.string().required().min(1).label("Task"),
    date: Yup.string().required().label("Date"),
    startTime: Yup.string().nullable().label("Start time"),
    endTime: Yup.string().nullable().label("End time"),
    note: Yup.string().nullable().label("Note"),
    category: Yup.string().nullable().label("Category"),
    categoryColor: Yup.string().nullable().label("Category color"),
});

const markedDatesArray = [
    {
        date: Date.now(),
        lines: [
            {
                color: colors.primary,
                selectedColor: colors.primary,
            },
        ],
    },
];

function MyTasksScreen({ route }) {
    const [taskList, setTaskList] = useState(tasks);
    const [calendarListModalVisible, setCalendarListModalVisible] = useState(
        false
    );
    const calendarStrip = useRef();
    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [taskDetailToDetailScreen, setTaskDetailToDetailScreen] = useState({
        id: "",
        task: "",
        startTime: "",
        endTime: "",
        date: "",
        note: "",
        status: "",
        repeat: "",
        reminder: "",
        subTasks: [],
        category: "",
        categoryColor: "",
    });

    //Select today when app launch first time
    useEffect(() => {
        onDateSelected(Date.now());
    }, []);

    //handle add new task
    const newTaskDetail = route.params;
    useEffect(() => {
        if (typeof newTaskDetail === "object") {
            tasks.push({
                id: newTaskDetail.id,
                task: newTaskDetail.task,
                startTime: newTaskDetail.startTime,
                endTime: newTaskDetail.endTime,
                date: newTaskDetail.date,
                note: newTaskDetail.note,
                status: newTaskDetail.status,
                repeat: "",
                reminder: "",
                subTasks: [],
                category: newTaskDetail.category,
                categoryColor: newTaskDetail.categoryColor,
            });
            tasks.sort(
                (a, b) =>
                    moment(a.startTime).format("YYYYMMDDHHmmss") -
                    moment(b.startTime).format("YYYYMMDDHHmmss")
            );

            onDateSelected(newTaskDetail.date);
            calendarStrip.current.setSelectedDate(newTaskDetail.date);
        }
        console.log(newTaskDetail);
    }, [newTaskDetail]);

    //Handle day selected in calendar trip
    const onDateSelected = (date) => {
        setSelectedDate(date);
        setTaskList(
            tasks.filter(
                (item) =>
                    moment(item.date).format("DD/MM/YYYY") ===
                        moment(date).format("DD/MM/YYYY") &&
                    item.status === "waiting"
            )
        );
    };

    //handle action when selected day in calendar list
    const handleCalendarListSelect = (date) => {
        const selectedDay =
            moment(Date.now()).format("YYYY-M-DD") ===
            date.year + "-" + date.month + "-" + date.day
                ? Date.now()
                : date.dateString + "T05:00:00.000Z"; //"2021-01-30T05:00:00.000Z";

        setSelectedDate(selectedDay);
        calendarStrip.current.setSelectedDate(selectedDay);
        setCalendarListModalVisible(false);
        console.log(selectedDay);
    };

    const handleDelete = (deleteTask) => {
        tasks.splice(tasks.indexOf(deleteTask), 1);
        setTaskList(taskList.filter((item) => item.id !== deleteTask.id));

        categories[
            categories.findIndex(
                (i) =>
                    i.value.toLowerCase() === deleteTask.category.toLowerCase()
            )
        ].totalTasks--;
    };

    //handle save press in detail task screen
    const handleSavePressInDetailTask = (item) => {
        console.log(item);

        tasks.splice(
            tasks.findIndex((task) => task.id === item.id),
            1,
            item
        );

        tasks.sort(
            (a, b) =>
                moment(a.startTime).format("YYYYMMDDHHmmss") -
                moment(b.startTime).format("YYYYMMDDHHmmss")
        );

        onDateSelected(item.date);
        calendarStrip.current.setSelectedDate(item.date);
        setTaskDetailModalVisible(false);
    };

    //handle miss task
    const handleMissTask = (task) => {
        task.status = "miss";
        setTaskDetailModalVisible(false);
        onDateSelected(task.date);
    };

    const handleCompleteTask = (task) => {
        task.status = "complete";
        categories[
            categories.findIndex(
                (i) => i.value.toLowerCase() === task.category.toLowerCase()
            )
        ].completeTasks++;

        setTaskDetailModalVisible(false);
        onDateSelected(task.date);
    };

    return (
        <Screen style={styles.container}>
            <View style={styles.headerContainer}>
                <CalendarStrip
                    calendarColor={colors.white}
                    calendarHeaderStyle={{
                        color: colors.black,
                        fontSize: 23,
                        alignSelf: "flex-start",
                        paddingBottom: 50,
                    }}
                    customDatesStyles={() => {
                        return {
                            dateContainerStyle: {
                                height: 53,
                                width: 52,
                                borderRadius: 10,
                                backgroundColor: colors.white,
                                paddingTop: 5,
                            },
                        };
                    }}
                    daySelectionAnimation={{
                        type: "background",
                        duration: 500,
                        highlightColor: colors.primary,
                    }}
                    dateNumberStyle={{ color: colors.medium, fontSize: 25 }}
                    dateNameStyle={{ color: colors.medium, fontSize: 12 }}
                    highlightDateNumberStyle={{
                        color: colors.white,
                        fontSize: 20,
                    }}
                    highlightDateNameStyle={{
                        color: colors.white,
                        fontSize: 11,
                    }}
                    highlightDateContainer={[
                        {
                            dateContainerStyle: {
                                height: 53,
                                width: 52,
                                borderRadius: 10,
                                backgroundColor: colors.white,
                                paddingTop: 5,
                            },
                        },
                    ]}
                    iconContainer={{ flex: 0.05 }}
                    innerStyle={{ flex: 0.6 }}
                    onDateSelected={onDateSelected}
                    onHeaderSelected={() =>
                        calendarStrip.current.setSelectedDate(Date.now())
                    }
                    startingDate={Date.now()}
                    numDaysInWeek={5}
                    markedDates={markedDatesArray}
                    ref={calendarStrip}
                    selectedDate={selectedDate}
                    scrollable
                    scrollToOnSetSelectedDate
                    style={styles.calendarContainer}
                    shouldAllowFontScaling
                />
                <TouchableOpacity
                    style={styles.calenderIcon}
                    onPress={() => setCalendarListModalVisible(true)}
                >
                    <FontAwesome name="calendar" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View style={[defaultStyles.cardShadow, styles.tasksContainer]}>
                <H1 style={styles.heading}>Daily Tasks</H1>
                <FlatList
                    data={taskList}
                    keyExtractor={(item) => item.id.toString()}
                    refreshing={refreshing}
                    onRefresh={() => onDateSelected(selectedDate)}
                    renderItem={({ item }) => (
                        <TaskCardProgress
                            task={item.task}
                            startTime={
                                item.startTime
                                    ? moment(item.startTime).format("HH:mm")
                                    : "All day"
                            }
                            endTime={
                                item.endTime
                                    ? moment(item.startTime).format(
                                          "YYYY-MM-DD"
                                      ) ===
                                      moment(item.endTime).format("YYYY-MM-DD")
                                        ? moment(item.endTime).format("HH:mm")
                                        : "(" +
                                          moment(item.endTime).format(
                                              "HH:mm DD/MM/YY"
                                          ) +
                                          ")"
                                    : null
                            }
                            categoryColor={item.categoryColor}
                            renderRightActions={() => (
                                <ListItemAction
                                    iconName="done"
                                    onPress={() => {
                                        handleCompleteTask(item);
                                    }}
                                />
                            )}
                            renderLeftActions={() => (
                                <ListItemAction
                                    iconName="delete-outline"
                                    backgroundColor={colors.secondary}
                                    onPress={() => {
                                        Alert.alert(
                                            "Do you want to delete the task?",
                                            "",
                                            [
                                                {
                                                    text: "No",
                                                },
                                                {
                                                    text: "Yes",
                                                    onPress: () =>
                                                        handleDelete(item),
                                                },
                                            ]
                                        );
                                    }}
                                />
                            )}
                            onPress={() => {
                                setTaskDetailModalVisible(true);
                                setTaskDetailToDetailScreen(item);
                            }}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 30 }} />
                    )}
                />
            </View>
            <Modal
                visible={calendarListModalVisible}
                animationType="slide"
                onRequestClose={() => setCalendarListModalVisible(false)}
            >
                <Screen>
                    <CalendarListPicker
                        onClosePress={() => setCalendarListModalVisible(false)}
                        onDayPress={handleCalendarListSelect}
                        style={defaultStyles.cardShadow}
                        selectedDay={moment(selectedDate).format("YYYY-MM-DD")}
                    />
                </Screen>
            </Modal>

            <ModalLb
                isVisible={taskDetailModalVisible}
                style={styles.modalContainer}
                avoidKeyboard
                backdropOpacity={0.3}
                onBackdropPress={() => setTaskDetailModalVisible(false)}
                onBackButtonPress={() => setTaskDetailModalVisible(false)}
                animationIn="zoomIn"
                animationOut="zoomOut"
                onSwipeComplete={() => setTaskDetailModalVisible(false)}
                swipeDirection="down"
                propagateSwipe
            >
                <Form
                    initialValues={{
                        id: taskDetailToDetailScreen.id,
                        task: taskDetailToDetailScreen.task,
                        startTime: taskDetailToDetailScreen.startTime,
                        endTime: taskDetailToDetailScreen.endTime,
                        date: taskDetailToDetailScreen.date,
                        note: taskDetailToDetailScreen.note,
                        status: "waiting",
                        repeat: "",
                        reminder: "",
                        subTasks: [],
                        category: taskDetailToDetailScreen.category,
                        categoryColor: taskDetailToDetailScreen.categoryColor,
                    }}
                    onSubmit={handleSavePressInDetailTask}
                    validationSchema={validationSchema}
                >
                    <View style={styles.modalContent}>
                        <TaskDetailScreen
                            onUnsavePress={() =>
                                setTaskDetailModalVisible(false)
                            }
                            onDeletePress={() => {
                                Alert.alert(
                                    "Do you want to delete the task?",
                                    "",
                                    [
                                        {
                                            text: "Yes",
                                            onPress: () => {
                                                handleDelete(
                                                    taskDetailToDetailScreen
                                                );
                                                setTaskDetailModalVisible(
                                                    false
                                                );
                                            },
                                        },
                                        {
                                            text: "No",
                                        },
                                    ]
                                );
                            }}
                            onMissPress={() =>
                                handleMissTask(taskDetailToDetailScreen)
                            }
                            onCompletePress={() => {
                                handleCompleteTask(taskDetailToDetailScreen);
                            }}
                        />
                    </View>
                </Form>
            </ModalLb>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {},
    calendarContainer: {
        height: 130,
        paddingBottom: 0,
    },

    calenderIcon: {
        alignItems: "flex-end",
        height: "38%",
        position: "absolute",
        top: 0,
        right: 33,
        width: "20%",
    },
    closeModal: {
        width: 50,
        height: 30,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    headerContainer: {
        paddingHorizontal: 25,
    },

    heading: {
        textAlign: "center",
        color: colors.primary,
        marginBottom: 25,
    },
    modalContainer: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "white",
        height: "88%",
        paddingVertical: 0,
        paddingTop: 20,
        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
    },

    tasksContainer: {
        backgroundColor: colors.white,
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: colors.white,
        shadowRadius: 15,
        paddingTop: 20,
        paddingTop: 30,
    },
});

export default MyTasksScreen;
