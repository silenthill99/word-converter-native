import React, {PropsWithChildren, useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, ScrollView, StyleSheet, View} from "react-native";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

const Index = () => {
    const [screenData, setScreenData] = useState(Dimensions.get('window'));

    useEffect(() => {
        const onChange = (result: any) => {
            setScreenData(result.window);
        };

        const subscription = Dimensions.addEventListener('change', onChange);
        return () => subscription?.remove();
    }, []);

    useEffect(() => {
        fetch("https://devflorian.cornillet.com")
            .then(response => {
                console.log('Status:', response.status, response.statusText);
                console.log("Headers:", Object.fromEntries(response.headers.entries()));
                return response.text();
            })
            .then(html => {
                console.log('Body content:', html.substring(0, 200) + '...')
                console.log("Full HTML length:", html.length);
            })
            .catch(error => console.error("Erreur : ", error))
    }, [])
    const isTablet = screenData.width > 768;

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={[styles.container, { width: isTablet ? '90%' : '100%' }]}>
                    <Row isTablet={isTablet}>
                        <Col isTablet={isTablet}>
                            <LoginForm/>
                        </Col>
                        <Col isTablet={isTablet}>
                            <RegisterForm/>
                        </Col>
                    </Row>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const Row = ({children, isTablet}: PropsWithChildren & { isTablet: boolean }) => {
    return <View style={[styles.row, { flexDirection: isTablet ? 'row' : 'column' }]}>{children}</View>
}

const Col = ({children, isTablet}: PropsWithChildren & { isTablet: boolean }) => {
    return <View style={[styles.col, { flex: isTablet ? 1 : 0 }]}>{children}</View>
}
export default Index;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'skyblue'
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 12
    },
    container: {
        marginHorizontal: "auto",
        maxWidth: 800,
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        minHeight: 400
    },
    row: {
        gap: 20,
        width: '100%'
    },
    col: {
        width: '100%'
    }
})