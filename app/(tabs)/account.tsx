import React, {useState} from 'react';
import PageLayout from "@/layouts/PageLayout";
import {StyleSheet, Text, Pressable, View} from "react-native";
import { useAuth } from "@/contexts/AuthContext";

const Account = () => {

    const [isHovered, setHovered] = useState(false);
    const { logout} = useAuth();

    const handleLogout = async () => {
        await logout();
        // router.navigate('../')
    }

    return (
        <PageLayout style={{flex: 1}}>
            <View style={styles.mainView}>
                <Pressable
                    onHoverIn={() => setHovered(true)}
                    onHoverOut={() => setHovered(false)}
                    onPress={handleLogout}
                >
                    <Text style={[styles.buttonText, isHovered && styles.buttonTextHovered]}>Se déconnecter</Text>
                </Pressable>
            </View>
        </PageLayout>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: 'red'
    },
    buttonTextHovered: {
        textDecorationLine: "underline"
    },
    mainView: {
        flex: 1,
        backgroundColor: "white",
    }
})

export default Account;