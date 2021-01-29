import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import routes from "./routes";
import AddNewTaskButton from "../components/buttons/AddNewTaskButton";
import HomeScreen from "../screens/HomeScreen";
import MyTasksScreen from "../screens/MyTasksScreen";
import AddTasksScreen from "../screens/AddTasksScreen";
import colors from "../config/colors";

const AddScreenComponent = () => null;

const Stack = createStackNavigator();

const StackScreen = () => {
    return (
        <Stack.Navigator
            mode="modal"
            screenOptions={{ animationEnabled: false }}
        >
            <Stack.Screen
                name={routes.ADD_MODAL}
                component={AddTasksScreen}
                options={{ animationEnabled: true }}
            />
        </Stack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

function AppNavigator() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor: colors.white,
                activeTintColor: colors.primary,
                inactiveBackgroundColor: colors.white,
                inactiveTintColor: "#9F9E9E",
                showLabel: false,
            }}
        >
            <Tab.Screen
                name={routes.TASKS}
                component={MyTasksScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="check" size={size} color={color} />
                    ),
                    tabBarLabel: {},
                }}
            />
            <Tab.Screen
                name={routes.ADD}
                component={AddScreenComponent}
                options={({ navigation }) => ({
                    tabBarButton: () => (
                        <AddNewTaskButton navigation={navigation} />
                    ),
                })}
            />
            <Tab.Screen
                name={routes.PROGRESS}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="stats-chart"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default AppNavigator;
