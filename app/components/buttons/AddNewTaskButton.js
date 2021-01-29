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

function AddNewTaskButton({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [task, setTask] = useState("");

    const handleAddPress = () => {
        navigation.jumpTo(routes.TASKS, { task: task });
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
