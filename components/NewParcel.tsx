import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {TextStyles} from "@/hook/TextStyles";
import ApiService from "@/services/apiService";

const NewParcel = () => {

    const [value, setValue] = useState({
        name: "",
        surface_in_ha: 0,
        description: "",
    });

    const handleSubmit = () => {
        ApiService.getToken()
            .then(token => {
                return fetch("https://devflorian.cornillet.com/parcelle", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(value)
                })
            })
            .then(res => res.json())
            .then(data => console.log("Parcelle créée : " + data))
            .catch(err => console.error("Erreur : " + err));
    }

    // noinspection XmlDeprecatedElement
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
                value={value.surface_in_ha?.toString() || "0"}
                onChangeText={(text) => setValue({...value, surface_in_ha: parseFloat(text) || 0})}
            />
            <Text>Description</Text>
            <TextInput
                multiline
                blurOnSubmit={false}
                style={[styles.input, {height: 293, justifyContent: "flex-start"}]}
                placeholder={"Courte description"}
                placeholderTextColor={"#c9c3c3"}
                value={value.description}
                onChangeText={(text) => setValue({...value, description: text})}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{color: "white"}}>Valider</Text>
            </TouchableOpacity>
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