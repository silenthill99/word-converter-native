import React from 'react';
import PageLayout from "@/layouts/PageLayout";
import {StyleSheet, Dimensions} from "react-native";
import {colors} from "@/hook/Colors";

const Account = () => {


    return (
        <PageLayout>

        </PageLayout>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center'
    },
    email: {
        borderWidth: 1,
        borderColor:'#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    input: {
        borderWidth: 1,
        borderColor:'#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    button: {
        backgroundColor: colors.mainColor,
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        width: Dimensions.get('window').width > 768 ? '25%' : '100%',
        minHeight: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
})

export default Account;