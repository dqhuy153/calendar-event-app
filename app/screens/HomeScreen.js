import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import moment from "moment";
import { useState } from "react";

import H1 from "../components/text/H1";
import LargeCard from "../components/items/LargeCard";
import Screen from "../components/items/Screen";
import colors from "../config/colors";
import MediumCard from "../components/items/MediumCard";
import tasks from "../values/tasks";
import categories from "../values/categories";
import ListItemAction from "../components/items/ListItemAction";
import TaskCardProgress from "../components/items/TaskCardProgress";
import routes from "../navigation/routes";

function HomeScreen({ navigation }) {
    const [completeTasksModalVisible, setCompleteTasksModalVisible] = useState(
        false
    );
    const [missTasksModalVisible, setMissTasksModalVisible] = useState(false);
    const [completeList, setCompleteList] = useState(
        tasks.filter((i) => i.status === "complete")
    );
    const [missList, setMissList] = useState(
        tasks.filter((i) => i.status === "miss")
    );
    const [refreshing, setRefreshing] = useState(false);

    const handleCancelCompletedTask = (task) => {
        task.status = "waiting";
        tasks[tasks.findIndex((i) => i.id === task.id)].status = "waiting";
        categories[
            categories.findIndex(
                (i) => i.value.toLowerCase() === task.category.toLowerCase()
            )
        ].completeTasks--;
        setCompleteList(completeList.filter((i) => i.status === "complete"));
    };

    const handleCancelMissedTask = (task) => {
        task.status = "waiting";
        tasks[tasks.findIndex((i) => i.id === task.id)].status = "waiting";

        setMissList(missList.filter((i) => i.status === "miss"));
        setMissTasksModalVisible(true);
    };

    const handleCompleteMissedTask = (task) => {
        task.status = "complete";
        tasks[tasks.findIndex((i) => i.id === task.id)].status = "complete";
        categories[
            categories.findIndex(
                (i) => i.value.toLowerCase() === task.category.toLowerCase()
            )
        ].completeTasks++;
        setMissList(missList.filter((i) => i.status === "miss"));
        setCompleteList(tasks.filter((i) => i.status === "complete"));
    };

    // const handleAddCategory = () => {
    //     console.log("Add new category action here");
    // };

    // const handleAddCategoryTask = () => {
    //     console.log("Add new category's task here");
    // };

    const getHeader = () => {
        return (
            <>
                <LargeCard
                    style={styles.largeCard}
                    percent={Math.round(
                        (categories.reduce(
                            (sum, item) => sum + item.completeTasks,
                            0
                        ) /
                            categories.reduce(
                                (sum, item) => sum + item.totalTasks,
                                0
                            )) *
                            100
                    )}
                    completeTasks={categories.reduce(
                        (sum, item) => sum + item.completeTasks,
                        0
                    )}
                    totalTasks={categories.reduce(
                        (sum, item) => sum + item.totalTasks,
                        0
                    )}
                />
                <H1 style={{ marginTop: 30, marginBottom: 25 }}>
                    Detail activities
                </H1>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableOpacity
                        style={{ width: "49%" }}
                        onPress={() => setCompleteTasksModalVisible(true)}
                    >
                        <View
                            style={{
                                backgroundColor: colors.primary,
                                padding: 20,
                                borderTopLeftRadius: 25,
                                borderBottomLeftRadius: 25,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: colors.white,
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                Complete tasks
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: "49%" }}
                        onPress={() => setMissTasksModalVisible(true)}
                    >
                        <View
                            style={{
                                backgroundColor: colors.secondary,
                                padding: 20,
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: colors.white,
                                    fontWeight: "600",
                                    fontSize: 16,
                                }}
                            >
                                Miss tasks
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    avoidKeyboard
                    isVisible={completeTasksModalVisible}
                    backdropOpacity={0.4}
                    onBackdropPress={() => setCompleteTasksModalVisible(false)}
                    onBackButtonPress={() =>
                        setCompleteTasksModalVisible(false)
                    }
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    style={styles.modalContainer}
                    swipeDirection="down"
                    propagateSwipe
                    onSwipeComplete={() => setCompleteTasksModalVisible(false)}
                >
                    <View
                        style={[styles.modalCategoryContent, { height: "87%" }]}
                    >
                        <View style={styles.headerModal}>
                            <H1>Completed tasks</H1>
                            <TouchableOpacity
                                onPress={() =>
                                    setCompleteTasksModalVisible(false)
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

                        <FlatList
                            data={completeList}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TaskCardProgress
                                    task={item.task}
                                    startTime={
                                        item.startTime
                                            ? moment(item.startTime).format(
                                                  "HH:mm"
                                              )
                                            : "All day"
                                    }
                                    endTime={
                                        item.endTime
                                            ? moment(item.endTime).format(
                                                  "HH:mm"
                                              )
                                            : null
                                    }
                                    renderLeftActions={() => (
                                        <ListItemAction
                                            iconName="close"
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
                                                                handleCancelCompletedTask(
                                                                    item
                                                                ),
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
                            /*refreshing={refreshing}
                            onRefresh={() =>
                                setCompleteList(
                                    tasks.filter((i) => i.status === "complete")
                                )
                            }*/
                        />
                    </View>
                </Modal>
                <Modal
                    avoidKeyboard
                    isVisible={missTasksModalVisible}
                    backdropOpacity={0.4}
                    onBackdropPress={() => setMissTasksModalVisible(false)}
                    onBackButtonPress={() => setMissTasksModalVisible(false)}
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    style={styles.modalContainer}
                >
                    <View
                        style={[styles.modalCategoryContent, { height: "87%" }]}
                    >
                        <View style={styles.headerModal}>
                            <H1>Missed tasks</H1>
                            <TouchableOpacity
                                onPress={() => setMissTasksModalVisible(false)}
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
                            data={missList}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TaskCardProgress
                                    task={item.task}
                                    startTime={
                                        item.startTime
                                            ? moment(item.startTime).format(
                                                  "HH:mm"
                                              )
                                            : "All day"
                                    }
                                    endTime={
                                        item.endTime
                                            ? moment(item.endTime).format(
                                                  "HH:mm"
                                              )
                                            : null
                                    }
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
                                                            onPress: () =>
                                                                handleCompleteMissedTask(
                                                                    item
                                                                ),
                                                        },
                                                    ]
                                                );
                                            }}
                                        />
                                    )}
                                    renderLeftActions={() => (
                                        <ListItemAction
                                            iconName="close"
                                            backgroundColor={colors.secondary}
                                            onPress={() => {
                                                Alert.alert(
                                                    "Do you want to cancel missed task?",
                                                    "",
                                                    [
                                                        {
                                                            text: "No",
                                                        },
                                                        {
                                                            text: "Yes",
                                                            onPress: () =>
                                                                handleCancelMissedTask(
                                                                    item
                                                                ),
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
                        />
                    </View>
                </Modal>

                <View style={styles.articleDaily}>
                    <H1>Daily Progress</H1>
                </View>
            </>
        );
    };

    /*const getFooter = () => {
        return (
            <>
            <View style={styles.articleImportant}>
            <FontAwesome
            name="star"
            size={20}
            color={colors.secondary}
            style={{ marginRight: 5 }}
            />
            <H1>Important Today's tasks</H1>
            </View>
            <FlatList />
            </>
            );
        };*/

    return (
        <Screen style={styles.container}>
            <View style={styles.header__container}>
                <View>
                    <Text style={styles.header__title}>Hey, You</Text>
                    <Text style={styles.header__desc}>
                        Let's make this day productive
                    </Text>
                </View>
                <Image
                    source={require("../assets/IMG_5494_Original.jpg")}
                    style={styles.header__image}
                />
            </View>
            <FlatList
                columnWrapperStyle={{
                    justifyContent: "space-between",
                }}
                contentContainerStyle={{
                    width: "98%",
                    alignSelf: "center",
                }}
                data={categories}
                numColumns={2}
                keyExtractor={(item) => item.value}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <MediumCard
                        completeTasks={item.completeTasks}
                        color={item.colorIcon}
                        percent={
                            item.totalTasks == 0
                                ? 0
                                : Math.round(
                                      (item.completeTasks / item.totalTasks) *
                                          100
                                  )
                        }
                        title={item.label}
                        totalTasks={item.totalTasks}
                        category={item.value}
                        //onPressAdd={handleAddCategoryTask}
                        onPressCompleteTask={() => {
                            setCompleteList(
                                tasks.filter((i) => i.status === "complete")
                            );
                        }}
                    />
                )}
                ListHeaderComponent={getHeader}
                //ListFooterComponent={getFooter}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
    },
    articleDaily: {
        alignItems: "center",
        marginVertical: 25,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    articleImportant: {
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 15,
    },
    categories: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    header__container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header__title: {
        fontWeight: "bold",
        fontSize: 28,
    },
    header__desc: {
        fontSize: 11,
        marginVertical: 10,
    },
    header__image: {
        width: 50,
        height: 50,
        borderRadius: 17,
    },
    headerModal: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 30,
        paddingTop: 0,
    },
    largeCard: {
        marginTop: 20,
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
});

export default HomeScreen;
