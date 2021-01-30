import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    Button,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "react-native-modal";

import colors from "../../config/colors";
import H1 from "../H1";
import routes from "../../navigation/routes";
import useStateWithPromise from "../hooks/useStateWithPromise";

function AddNewTaskButton({ navigation }) {
    let taskDetail = {
        id: 6,
        task: task,
        startTime: "18:30",
        endTime: "20:30",
        date: "2021-01-2T05:00:00.000Z",
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [task, setTask] = useState("");
    const [id, setId] = useState(6);
    const [taskItem, setTaskItem] = useStateWithPromise(taskDetail);

    const handleAddPress = async () => {
        setId(id + 1);
        taskDetail = {
            id: id,
            task: task,
            startTime: "18:30",
            endTime: "20:30",
            date: Date.now(),
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
                    <H1 style={{ alignSelf: "center" }}>New Task</H1>
                    <TextInput
                        placeholder="Task Name..."
                        style={styles.newTaskInput}
                        onChangeText={(text) => setTask(text)}
                    />
                    <Button title="Add" onPress={handleAddPress} />
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: "white",
        padding: 22,
        borderTopRightRadius: 17,
        borderTopLeftRadius: 17,
    },

    contentView: {
        justifyContent: "flex-end",
        margin: 0,
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
    newTaskInput: {
        width: "100%",
        backgroundColor: "#eee",
        height: 59,
        marginTop: 20,
        padding: 20,
        marginBottom: 10,
    },
    tabContainer: {
        width: 100,
        alignItems: "center",
    },
});

export default AddNewTaskButton;
