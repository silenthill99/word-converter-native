import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {TextStyles} from "@/hook/TextStyles";

const NewParcel = () => {

    const [value, setValue] = useState({
        name: "",
        surface_in_ha: 0
    });

    return (
        <View style={styles.main}>
            <Text style={[TextStyles.h3, styles.title]}>Ajouter une parcelle</Text>
            <Text>Nom</Text>
            <TextInput
                style={styles.input}
                placeholder={"Nom"}
                placeholderTextColor={"#c9c3c3"}
                value={value.name}
                onChangeText={(text) => {setValue({...value, name: text})}}
            />
            <Text>Surface (en ha)</Text>
            <TextInput
                style={styles.input}
                placeholder={"Surface (en ha)"}
                placeholderTextColor={"#c9c3c3"}
                keyboardType={"numeric"}
                inputMode={"decimal"}
                value={value.surface_in_ha.toString()}
                onChangeText={(text) => setValue({...value, surface_in_ha: parseFloat(text) || 0})}
            />
            <Text>Description</Text>
            <TextInput
                multiline
                blurOnSubmit={false}
                style={[styles.input, {height: 293, justifyContent: "flex-start"}]}
                placeholder={"Courte description"}
                placeholderTextColor={"#c9c3c3"}
            />
            <TouchableOpacity style={styles.button}>Valider</TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: "100%",
        padding: 10,
        justifyContent: "center",
        gap: 10
    },
    input: {
        borderWidth: 1,
        padding: 10,
        height: 66,
        borderColor: "#dddddd",
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        elevation: 2
    },
    title: {
        textAlign: "center",
    },
    button: {
        backgroundColor: "black",
        color: "white",
        width: 226,
        height: 54,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    }
})

export default NewParcel;