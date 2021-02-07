import React from "react";
import { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import ModalLb from "react-native-modal";

import CalendarListPicker from "../components/CalendarListPicker";
import H1 from "../components/text/H1";
import Screen from "../components/Screen";
import colors from "../config/colors";
import defaultStyles from "../config/defaultStyles";
import TaskCard from "../components/TaskCard";
import ListItemAction from "../components/ListItemAction";
import TaskDetailScreen from "./TaskDetailScreen";

//prevent warning
moment.createFromInputFallback = function (config) {
    config._d = new Date(config._i);
};

const tasks = [
    {
        id: 1,
        task: "Task 1",
        startTime: moment(Date.now()).format("YYYY-MM-DD") + "T09:00:24+07:00",
        endTime: moment(Date.now()).format("YYYY-MM-DD") + "T11:00:24+07:00",
        date: Date.now(),
        status: "waiting",
        note: "Note of task 1",
        repeat: "",
        reminder: "",
        subTasks: [],
        category: "education",
        categoryColor: colors.primary,
    },
    {
        id: 2,
        task: "Task 2",
        startTime: moment(Date.now()).format("YYYY-MM-DD") + "T13:00:24+07:00",
        endTime: moment(Date.now()).format("YYYY-MM-DD") + "T16:00:24+07:00",
        date: Date.now(),
        status: "waiting",
        note: "Note of task 2",
        repeat: "",
        reminder: "",
        subTasks: [],
        category: "personal",
        categoryColor: "lightgreen",
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

    useEffect(() => {
        onDateSelected(Date.now());
        //calendarStrip.current.setSelectedDate(Date.now());
    }, []);

    //handle add new task
    const taskDetail = route.params;
    useEffect(() => {
        taskDetail ? console.log(taskDetail) : console.log("no task added");
        if (taskDetail) {
            tasks.push({
                id: taskDetail.id,
                task: taskDetail.task,
                startTime: taskDetail.startTime,
                endTime: taskDetail.endTime,
                date: taskDetail.date,
                note: taskDetail.note,
                status: taskDetail.status,
                repeat: "",
                reminder: "",
                subTasks: [],
                category: taskDetail.category,
                categoryColor: taskDetail.categoryColor,
            });
            tasks.sort(
                (a, b) =>
                    moment(a.startTime).format("YYYYMMDDHHmmss") -
                    moment(b.startTime).format("YYYYMMDDHHmmss")
            );

            setSelectedDate(taskDetail.date);
            calendarStrip.current.setSelectedDate(taskDetail.date);
            onDateSelected(taskDetail.date);
        }
    }, [taskDetail]);

    //Handle day selected in calendar trip
    const onDateSelected = (date) => {
        setSelectedDate(date);
        setTaskList(
            tasks.filter(
                (item) =>
                    moment(item.date).format("DD/MM/YYYY") ===
                    moment(date).format("DD/MM/YYYY")
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

        console.log("Delete" + deleteTask);
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
                    markedDates={[
                        {
                            date: Date.now(),
                            lines: [
                                {
                                    color: colors.primary,
                                    selectedColor: colors.primary,
                                },
                            ],
                        },
                    ]}
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
                    renderItem={({ item }) => (
                        <TaskCard
                            task={item.task}
                            startTime={
                                item.startTime
                                    ? moment(item.startTime).format("HH:mm")
                                    : "All day"
                            }
                            endTime={
                                item.endTime
                                    ? moment(item.endTime).format("HH:mm")
                                    : null
                            }
                            renderRightActions={() => (
                                <ListItemAction
                                    iconName="done"
                                    onPress={() => handleDelete(item)}
                                />
                            )}
                            renderLeftActions={() => (
                                <ListItemAction
                                    iconName="delete-outline"
                                    backgroundColor={colors.secondary}
                                    onPress={() => handleDelete(item)}
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
                <View style={styles.modalContent}>
                    <TaskDetailScreen
                        onCancelPress={() => setTaskDetailModalVisible(false)}
                        taskName={taskDetailToDetailScreen.task}
                        startTimeTask={taskDetailToDetailScreen.startTime}
                        endTimeTask={taskDetailToDetailScreen.endTime}
                        noteTask={taskDetailToDetailScreen.note}
                        dayTask={taskDetailToDetailScreen.date}
                        categoryTask={taskDetailToDetailScreen.category}
                        categoryColorTask={
                            taskDetailToDetailScreen.categoryColor
                        }
                    />
                </View>
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
