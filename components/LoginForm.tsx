import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, TouchableOpacity, Alert} from "react-native";
import {colors} from "@/hook/Colors";
import ApiService from '@/services/apiService';

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!loginData.email || !loginData.password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs");
            return;
        }

        setLoading(true);
        try {
            const response = await ApiService.login(loginData);
            if (response.success) {
                Alert.alert("Succès", "Connexion réussie")
            } else {
                Alert.alert("Erreur", response.message || "Erreur de connexion")
            }
        } catch (error) {
            Alert.alert("Erreur", "Une erreur inattendue s'est produite");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View>
            <Text style={styles.title}>Se connecter</Text>
            <TextInput
                value={loginData.email}
                onChangeText={(text) => setLoginData({...loginData, email: text})}
                placeholder={"Votre adresse mail"}
                style={styles.input}
            />
            <TextInput
                value={loginData.password}
                onChangeText={(text) => setLoginData({...loginData, password: text})}
                placeholder={"Votre mot de passe"}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button}>
                <Text>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        width: "100%",
        fontSize: 16,
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        elevation: 2
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 30,
        fontWeight: 'bold',
        color: "#333"
    },
    button: {
        backgroundColor: colors.mainColor,
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
        elevation: 3,
        minHeight: 50
    }
})

export default LoginForm;