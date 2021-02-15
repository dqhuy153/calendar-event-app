import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Alert,
    TouchableOpacity,
    FlatList,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { useState } from "react";

import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";
import TaskCardProgress from "./TaskCardProgress";
import ListItemAction from "./ListItemAction";
import H1 from "../text/H1";
import tasks from "../../values/tasks";
import categories from "../../values/categories";

function MediumCard({
    color,
    completeTasks,
    category,
    onPressAdd,
    onPressCompleteTask,
    percent,
    totalTasks,
    title,
    style,
    onTaskPress,
}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryList, setCategoryList] = useState(
        tasks.filter((i) => i.category === category && i.status === "waiting")
    );
    const [refreshing, setRefreshing] = useState(false);

    const handlePressCompleteTask = (task) => {
        task.status = "complete";
        tasks[tasks.findIndex((i) => i.id === task.id)].status = "complete";
        categories[
            categories.findIndex(
                (i) => i.value.toLowerCase() === task.category.toLowerCase()
            )
        ].completeTasks++;
        setCategoryList(
            categoryList.filter(
                (i) => i.category === category && i.status === "waiting"
            )
        );
    };

    const handlePressDeleteTask = (task) => {
        tasks.splice(tasks.indexOf(task), 1);
        setCategoryList(categoryList.filter((item) => item.id !== task.id));

        categories[
            categories.findIndex(
                (i) => i.value.toLowerCase() === task.category.toLowerCase()
            )
        ].totalTasks--;
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View
                    style={[defaultStyles.cardShadow, styles.container, style]}
                >
                    <ProgressCircle
                        percent={percent}
                        radius={30}
                        borderWidth={8}
                        color={color}
                        shadowColor="#e4e4e4"
                        bgColor="#fff"
                    >
                        <Text style={styles.percentText}>{percent}%</Text>
                    </ProgressCircle>
                    <View style={[styles.circle, { backgroundColor: color }]} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Text style={styles.subtitle}>
                        {completeTasks}/{totalTasks} completed
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <Modal
                avoidKeyboard
                isVisible={modalVisible}
                backdropOpacity={0.4}
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                animationIn="fadeIn"
                animationOut="fadeOut"
                style={styles.modalContainer}
            >
                <View style={[styles.modalCategoryContent, { height: "87%" }]}>
                    <View style={styles.headerModal}>
                        <H1>{title}</H1>
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

                    <FlatList
                        data={categoryList}
                        keyExtractor={(item) => item.id.toString()}
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
                                        ? moment(item.endTime).format("HH:mm")
                                        : null
                                }
                                categoryColor={item.categoryColor}
                                //bug delete task, can't sync with 2 screen, and can't sync totalTask of category immediately
                                renderLeftActions={() => (
                                    <ListItemAction
                                        iconName="delete-outline"
                                        backgroundColor={colors.secondary}
                                        onPress={() => {
                                            Alert.alert(
                                                "Incomplete task?",
                                                "",
                                                [
                                                    {
                                                        text: "No",
                                                    },
                                                    {
                                                        text: "Yes",
                                                        onPress: () =>
                                                            handlePressDeleteTask(
                                                                item
                                                            ),
                                                    },
                                                ]
                                            );
                                        }}
                                    />
                                )}
                                renderRightActions={() => (
                                    <ListItemAction
                                        iconName="done"
                                        onPress={() => {
                                            Alert.alert(
                                                "Do you want to complete the task?",
                                                "",
                                                [
                                                    {
                                                        text: "No",
                                                    },
                                                    {
                                                        text: "Yes",
                                                        onPress: () => {
                                                            handlePressCompleteTask(
                                                                item
                                                            );
                                                            onPressCompleteTask();
                                                        },
                                                    },
                                                ]
                                            );
                                        }}
                                    />
                                )}
                            />
                        )}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 30 }} />
                        )}
                        refreshing={refreshing}
                        onRefresh={() =>
                            setCategoryList(
                                tasks.filter(
                                    (i) =>
                                        i.category === category &&
                                        i.status === "waiting"
                                )
                            )
                        }
                    />
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 15,
        width: "48%",
        marginBottom: 17,
    },
    circle: {
        borderRadius: 5,
        height: 10,
        position: "absolute",
        top: 15,
        right: 15,
        width: 10,
    },
    headerModal: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 30,
        paddingTop: 0,
    },

    modalCategoryContent: {
        backgroundColor: "white",
        height: "64%",
        paddingVertical: 0,
        paddingTop: 20,
        borderRadius: 17,
        overflow: "hidden",
    },
    modalContainer: {
        margin: 0,
        justifyContent: "flex-end",
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        marginBottom: 10,
    },
    title: {
        textTransform: "capitalize",
        fontWeight: "500",
        fontSize: 17,
        width: "60%",
    },
});

export default MediumCard;
