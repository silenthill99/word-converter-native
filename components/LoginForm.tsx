import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text} from "react-native";

const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

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
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        padding: 10,
        // width: 400,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "lightgray",
        width: "100%"
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 30,
        fontWeight: 'bold',
        color: "#333"
    }
})

export default LoginForm;