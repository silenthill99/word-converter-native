import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {colors} from "@/hook/Colors";

const RegisterForm = () => {

    const [, setRegister] = useState(false);

    const [registerData, setRegisterData] = useState({
        email: "",
        email_confirmation: "",
        pseudo: "",
        password: "",
        password_confirmation: ""
    })

    const [, setRegisterLoading] = useState(false);

    const handleRequest = async () => {
        if (!registerData.email || !registerData.email_confirmation || !registerData.pseudo || !registerData.password || !registerData.password_confirmation) {
            Alert.alert("Erreur", "Veuillez remplir tout les champs");
            return;
        }
        setRegisterLoading(true);
        try {
            const formData = new URLSearchParams();
            formData.append("email", registerData.email);
            formData.append("email_confirmation", registerData.email_confirmation);
            formData.append("pseudo", registerData.pseudo);
            formData.append("password", registerData.password);
            formData.append("password_confirmation", registerData.password_confirmation);

            console.log("Tentative de création de compte avec " + registerData.email);
            console.log("Données envoyées:", Object.fromEntries(formData));

            const response = await fetch('https://devflorian.cornillet.com/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Accept": 'application/json',
                },
                body: formData
            })

            console.log("Réponse reçue:", response.status, response.statusText);

            if (!response.ok) {
                console.error('Erreur HTTP:', response.status, response.statusText);
                Alert.alert('Erreur', `Erreur serveur: ${response.status}`);
                return;
            }

            console.log("Response OK, parsing JSON...");
            const responseData = await response.json();
            console.log("Response data:", responseData);

            if (responseData.success) {
                console.log("Compte créé avec succès !");
                setRegister(true)
                setRegisterData({
                    email: "",
                    email_confirmation: "",
                    pseudo: "",
                    password: "",
                    password_confirmation: ""
                })
            } else {
                console.log('Register failed : ' + responseData.message);
                Alert.alert('Erreur', responseData.message || 'Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            Alert.alert('Erreur', "Impossible de se connecter au serveur");
        } finally {
            setRegisterLoading(false)
        }
    }

    useEffect(() => {
        fetch("https://devflorian.cornillet.com/register").then(response => response.json())
    }, []);

    return (
        <View style={styles.main}>
            <Text style={styles.title}>Créer un compte</Text>
            <TextInput style={styles.input} value={registerData.email} onChangeText={(text) => setRegisterData({
                ...registerData,
                email: text
            })} placeholder={"Votre email"}/>
            <TextInput style={styles.input} value={registerData.email_confirmation} onChangeText={(text) => setRegisterData({
                ...registerData,
                email_confirmation: text
            })} placeholder={"Confirmez votre adresse mail"}/>
            <TextInput style={styles.input} value={registerData.pseudo} onChangeText={(text) => setRegisterData({
                ...registerData,
                pseudo: text
            })} placeholder={"Votre pseudo"}/>
            <TextInput style={styles.input} value={registerData.password} onChangeText={(text) => setRegisterData({
                ...registerData,
                password: text
            })} placeholder={"Votre mot de passe"} secureTextEntry/>
            <TextInput style={styles.input} value={registerData.password_confirmation} onChangeText={(text) => setRegisterData({
                ...registerData,
                password_confirmation: text
            })} placeholder={"Confirmez votre mot de passe"} secureTextEntry/>
            <TouchableOpacity onPress={handleRequest} style={styles.button}>
                <Text>Créer un compte</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
        color: "#333"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        elevation: 2,
        width: "100%"
    },
    button: {
        backgroundColor: colors.mainColor,
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
        elevation: 3,
        // width: Dimensions.get('window').width > 768 ? '25%' : '100%',
        minHeight: 50
    }
})

export default RegisterForm;