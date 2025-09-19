import React, {useEffect, useState} from 'react';
import PageLayout from "@/layouts/PageLayout";
import {Text, TextInput, TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator} from "react-native";

const Account = () => {

    const [isLoggedIn, setLoggedIn] = useState(false)
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const  [loginLoading, setLoginLoading] = useState(false);

    const handleLogin = async () => {
        if (!loginData.email || !loginData.password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs");
            return;
        }
        setLoginLoading(true);
        try {
            const formData = new FormData();
            formData.append("email", loginData.email);
            formData.append("password", loginData.password);
            const response = await fetch("https://devflorian.cornillet.com/login", {
                method: "POST",
                body: formData
            })

            const responseData = await response.json();
            if (responseData.success) {
                setLoggedIn(true);
                setLoginData({email: '', password: ''});
            } else {
                Alert.alert('Erreur', responseData.message);
            }
        } catch (error) {
            Alert.alert('Erreur', "Erreur de connexion");
            console.error(error);
        } finally {
            setLoginLoading(false)
        }

    }

    useEffect(() => {
        fetch("https://devflorian.cornillet.com/check-auth")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLoggedIn(data.loggedIn)
            })
            .catch(error => console.error('Erreur:', error));
    }, [])

    return (
        <PageLayout>
            {isLoggedIn ? (
                <Text>Informations du compte</Text>
            ) : (
                <View>
                    <Text style={styles.title}>
                        Formulaire de connexion
                    </Text>
                    <TextInput
                        style={styles.email}
                        placeholder={"Email"}
                        onChangeText={(text) => setLoginData({...loginData, email: text})}
                        autoCapitalize="none"
                        editable={!loginLoading}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={"Mot de passe"}
                        onChangeText={(text) => setLoginData({...loginData, password: text})}
                        secureTextEntry={true}
                        editable={!loginLoading}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        disabled={loginLoading}
                        onPress={handleLogin}
                    >
                        {loginLoading ? (
                            <ActivityIndicator size="small" color={"white"} />
                        ) : (
                            <Text style={styles.buttonText}>Se connecter</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}
        </PageLayout>
    );
};

const styles = StyleSheet.create({
    title: {

    },
    email: {

    },
    input: {

    },
    button: {

    },
    buttonText: {

    }
})

export default Account;