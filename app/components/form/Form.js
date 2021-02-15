import { Formik } from "formik";
import React from "react";
import { View, StyleSheet } from "react-native";

function Form({ children, initialValues, onSubmit, validationSchema }) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {() => <>{children}</>}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {},
});

export default Form;
