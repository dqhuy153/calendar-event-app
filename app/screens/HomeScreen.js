import React from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import H1 from "../components/H1";
import LargeCard from "../components/LargeCard";
import Screen from "../components/Screen";
import colors from "../config/colors";
import MediumCard from "../components/MediumCard";
import AddButton from "../components/buttons/AddButton";

const colorsPicker = [colors.primary, colors.secondary, "#fa8231", "#45aaf2"];
const numColumnCategory = 2;
const categories = [
    {
        id: 1,
        title: "education",
        color:
            colorsPicker[Math.round(Math.random() * (colorsPicker.length - 1))],
        totalTasks: 10,
        completeTask: 3,
    },
    {
        id: 2,
        title: "Personal things",
        color:
            colorsPicker[Math.round(Math.random() * (colorsPicker.length - 1))],
        totalTasks: 14,
        completeTask: 11,
    },
    {
        id: 3,
        title: "work",
        color:
            colorsPicker[Math.round(Math.random() * (colorsPicker.length - 1))],
        totalTasks: 4,
        completeTask: 3,
    },
    {
        id: 4,
        title: "healthy",
        color:
            colorsPicker[Math.round(Math.random() * (colorsPicker.length - 1))],
        totalTasks: 8,
        completeTask: 5,
    },
];

function HomeScreen(props) {
    const handleAddCategory = () => {
        console.log("Add new category action here");
    };

    const handleAddCategoryTask = () => {
        console.log("Add new category's task here");
    };

    const handleClickCategoryCard = () => {
        console.log("Go to category detail");
    };

    const getHeader = () => {
        return (
            <>
                <View style={styles.header__container}>
                    <View>
                        <Text style={styles.header__title}>Hey, Huy</Text>
                        <Text style={styles.header__desc}>
                            Let's make this day productive
                        </Text>
                    </View>
                    <Image
                        source={require("../assets/IMG_5494_Original.jpg")}
                        style={styles.header__image}
                    />
                </View>
                <LargeCard
                    style={styles.largeCard}
                    percent={63}
                    completeTasks={10}
                    totalTasks={14}
                />
                <View style={styles.articleDaily}>
                    <H1>Daily Progress</H1>
                    <AddButton
                        iconSize={20}
                        title="New category"
                        fontSize={11}
                        margin={8}
                        onPress={handleAddCategory}
                    />
                </View>
            </>
        );
    };

    const getFooter = () => {
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
    };

    return (
        <Screen style={styles.container}>
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
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <MediumCard
                        completeTasks={item.completeTask}
                        color={item.color}
                        percent={Math.round(
                            (item.completeTask / item.totalTasks) * 100
                        )}
                        title={item.title}
                        totalTasks={item.totalTasks}
                        onPress={handleClickCategoryCard}
                        onPressAdd={handleAddCategoryTask}
                    />
                )}
                ListHeaderComponent={getHeader}
                ListFooterComponent={getFooter}
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
    largeCard: {
        marginTop: 20,
    },
});

export default HomeScreen;
