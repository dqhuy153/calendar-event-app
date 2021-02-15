import moment from "moment";
import colors from "../config/colors";

export default [
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
        category: "general",
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
        category: "general",
        categoryColor: colors.primary,
    },
];
