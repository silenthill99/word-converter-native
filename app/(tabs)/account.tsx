import React, {useEffect, useState} from 'react';
import PageLayout from "@/layouts/PageLayout";
import {Text, TextInput, TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator, Dimensions} from "react-native";
import {colors} from "@/hook/Colors";
import RegisterForm from "@/components/RegisterForm";

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
            // Essayons avec URLSearchParams (form-urlencoded)
            const formData = new URLSearchParams();
            formData.append("email", loginData.email);
            formData.append("password", loginData.password);

            console.log("Tentative de connexion avec:", loginData.email);

            const response = await fetch("https://devflorian.cornillet.com/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
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
                console.log("Login successful!")
                setLoggedIn(true);
                setLoginData({email: '', password: ''});
            } else {
                console.log("Login failed:", responseData.message);
                Alert.alert('Erreur', responseData.message || 'Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            Alert.alert('Erreur', "Impossible de se connecter au serveur");
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

                    <RegisterForm/>
                </View>
            )}
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