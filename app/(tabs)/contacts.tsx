import React from 'react';
import PageLayout from "@/layouts/PageLayout";
import {StyleSheet, Text, View} from "react-native";
import EmailIcon from "@/components/icons/EmailIcon";
import {Ionicons} from "@expo/vector-icons";

const Contacts = () => {

    return (
        <PageLayout style={styles.main}>
            <View style={styles.first}>
                <View style={[styles.email]}>
                    <EmailIcon/>
                    <Text>contact@agricultury.com</Text>
                </View>
                <View style={[styles.email]}>
                    <Ionicons name="call" size={24} color={"black"}/>
                    <Text>+33 6 12 34 56 78</Text>
                </View>
            </View>
        </PageLayout>
    );
};
export default Contacts;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    email: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: "white",
    },
    first: {
        backgroundColor: "white",
        height: 300,
        width: 300,
        borderRadius: 8,
        justifyContent: "center",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
    }
})