import React, {useState} from 'react';
import PageLayout from "@/layouts/PageLayout";
import {StyleSheet, Text, Pressable, View} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import Circle from "@/components/icons/Circle";

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
                <View style={{flex: 1, borderRightWidth: 1, borderColor: "#ddd"}}>
                    <Pressable
                        onHoverIn={() => setHovered(true)}
                        onHoverOut={() => setHovered(false)}
                        onPress={handleLogout}
                    >
                        <Text style={[styles.buttonText, isHovered && styles.buttonTextHovered]}>Se déconnecter</Text>
                    </Pressable>
                </View>
                <View style={{flex: 5, padding: 10}}>
                    <Circle/>
                </View>
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
        flexDirection: "row",
    }
})

export default Account;