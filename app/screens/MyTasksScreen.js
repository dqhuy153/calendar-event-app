import React from "react";
import { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    Text,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import H1 from "../components/H1";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useRef } from "react";
import defaultStyles from "../config/defaultStyles";
import TaskCard from "../components/TaskCard";
import ListItemAction from "../components/ListItemAction";
import { useEffect } from "react";
import { CalendarList, Agenda } from "react-native-calendars";

//prevent warning
moment.createFromInputFallback = function (config) {
    config._d = new Date(config._i);
};

const tasks = [
    {
        id: 1,
        task: "Meeting at coffee and do some photo shoots",
        startTime: "9:00",
        endTime: "11:00",
        date: Date.now(),
    },
    {
        id: 2,
        task: "Buy foods",
        startTime: "11:00",
        endTime: "12:00",
        date: Date.now(),
    },
    {
        id: 3,
        task: "Learning coding app",
        startTime: "13:00",
        endTime: "16:00",
        date: "2021-01-25T05:00:00.000Z",
    },
    {
        id: 4,
        task: "Run 3km",
        startTime: "16:30",
        endTime: "17:30",
        date: "2021-01-27T05:00:00.000Z",
    },
    {
        id: 5,
        task: "Lol lol",
        startTime: "18:30",
        endTime: "20:30",
        date: "2021-01-2T05:00:00.000Z",
    },
];

function MyTasksScreen({ route }) {
    //const [id, setId] = useState(5);

    /*let Task = {
        id: id,
        task: route?.params?.task ? route.params.task : null,
        startTime: "18:30",
        endTime: "20:30",
        date: "2021-01-2T05:00:00.000Z",
    };*/
    const [taskList, setTaskList] = useState(tasks);
    const [modalVisible, setModalVisible] = useState(false);
    const calendarStrip = useRef();
    const [selectedDate, setSelectedDate] = useState();
    //const [taskAdd, setTaskAdd] = useState();
    //const [isAddTask, setIsAddTask] = useState(false);

    /*useEffect(() => {
        route?.params?.task
            ? console.log(route.params.task)
            : console.log("ga");
        setIsAddTask(true) : setIsAddTask(false);
            setId(id + 1);
            setTaskAdd(Task);
        }
        
        setTaskAdd(null);
        tasks.push(taskAdd);
        console.log(Task);
        route.params.task = null;
    });*/

    //Handle day selected in calendar trip
    const onDateSelected = (date) => {
        console.log(date);
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
                : date.year +
                  "-" +
                  `${
                      parseInt(date.month) < 10 ? "0" + date.month : date.month
                  }` +
                  "-" +
                  `${parseInt(date.day) < 10 ? "0" + date.day : date.day}` +
                  "T05:00:00.000Z"; //"2021-01-30T05:00:00.000Z";

        setSelectedDate(selectedDay);
        calendarStrip.current.setSelectedDate(selectedDay);
        setModalVisible(false);
        console.log(selectedDay);
    };

    const handleDelete = (deleteTask) => {
        setTaskList(taskList.filter((item) => item.id !== deleteTask.id));
        console.log("Delete");
        console.log(taskList);
    };
    const handlePressItem = () => {
        console.log("item selected");
    };

    useEffect(() => {
        onDateSelected(Date.now());
    }, []);

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
                    onPress={() => setModalVisible(true)}
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
                            startTime={item.startTime}
                            endTime={item.endTime}
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
                            onPress={handlePressItem}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: 30 }} />
                    )}
                />
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <Screen>
                    <View style={styles.headerModal}>
                        <H1>Calendar</H1>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeModal}
                        >
                            <MaterialIcons
                                name="close"
                                size={20}
                                color={colors.medium}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[
                            defaultStyles.cardShadow,
                            styles.calendarListContainer,
                        ]}
                    >
                        <CalendarList
                            // Callback which gets executed when visible months change in scroll view. Default = undefined
                            /*onVisibleMonthsChange={(months) => {
                            console.log("now these months are visible", months);
                        }}*/
                            onDayPress={handleCalendarListSelect}
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
                </Screen>
            </Modal>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {},
    calendarContainer: {
        height: 130,
        paddingBottom: 0,
    },
    calendarListContainer: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        shadowRadius: 15,
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
    headerModal: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 30,
        paddingTop: 0,
    },
    heading: {
        textAlign: "center",
        color: colors.primary,
        marginBottom: 25,
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
