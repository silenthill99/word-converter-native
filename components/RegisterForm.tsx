import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {colors} from "@/hook/Colors";
import {useAuth} from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

const RegisterForm = () => {

    const [registerData, setRegisterData] = useState({
        email: "",
        email_confirmation: "",
        password: "",
        password_confirmation: ""
    })

    const {register, isLoading} = useAuth();
    const router = useRouter();

    const handleRequest = async () => {
        if (!registerData.email || !registerData.email_confirmation || !registerData.password || !registerData.password_confirmation) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs");
            return;
        }

        if (registerData.email !== registerData.email_confirmation) {
            Alert.alert("Erreur", "Les adresses mail ne correspondent pas");
            return;
        }

        if (registerData.password !== registerData.password_confirmation) {
            Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
            return;
        }

        const result = await register(
            registerData.email,
            registerData.email_confirmation,
            registerData.password,
            registerData.password_confirmation
        );

        if (result.success) {
            Alert.alert("Succès", "Compte créé avec succès !");
            router.replace('/(tabs)')
            setRegisterData({
                email: "",
                email_confirmation: "",
                password: "",
                password_confirmation: ""
            });
        } else {
            Alert.alert('Erreur', result.message || "Erreur lors de la création du compte");
        }
    }

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
            <TextInput style={styles.input} value={registerData.password} onChangeText={(text) => setRegisterData({
                ...registerData,
                password: text
            })} placeholder={"Votre mot de passe"} secureTextEntry/>
            <TextInput style={styles.input} value={registerData.password_confirmation} onChangeText={(text) => setRegisterData({
                ...registerData,
                password_confirmation: text
            })} placeholder={"Confirmez votre mot de passe"} secureTextEntry/>
            <TouchableOpacity onPress={handleRequest} style={styles.button} disabled={isLoading}>
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