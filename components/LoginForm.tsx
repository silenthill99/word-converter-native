import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, TouchableOpacity, Alert} from "react-native";
import {colors} from "@/hook/Colors";
import {useAuth} from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    const {login, isLoading} = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!loginData.email || !loginData.password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs");
            return;
        }

        const response = await login(loginData.email, loginData.password);
        if (response.success) {
            Alert.alert("Succès", "Connexion réussie")
            router.replace('/(tabs)/home')
        } else {
            Alert.alert("Erreur", response.message || "Erreur de connexion")
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
                returnKeyType={"next"}
                onSubmitEditing={() => {}}
            />
            <TextInput
                value={loginData.password}
                onChangeText={(text) => setLoginData({...loginData, password: text})}
                placeholder={"Votre mot de passe"}
                secureTextEntry
                style={styles.input}
                returnKeyType={"done"}
                onSubmitEditing={handleLogin}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
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