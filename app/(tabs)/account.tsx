import React, {useState} from 'react';
import PageLayout from "@/layouts/PageLayout";
import {StyleSheet, Text, Pressable} from "react-native";
import { useAuth } from "@/contexts/AuthContext";

const Account = () => {

    const [isHovered, setHovered] = useState(false);
    const { logout} = useAuth();

    const handleLogout = async () => {
        await logout();
        // router.navigate('../')
    }

    return (
        <PageLayout>
            <Pressable
                onHoverIn={() => setHovered(true)}
                onHoverOut={() => setHovered(false)}
                onPress={handleLogout}
            >
                <Text style={[styles.buttonText, isHovered && styles.buttonTextHovered]}>Se déconnecter</Text>
            </Pressable>
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
        backgroundColor: 'red',
        minWidth: 0
    },

    buttonText: {
        color: 'red'
    },

    buttonTextHovered: {
        textDecorationLine: "underline"
    }

})

export default Account;