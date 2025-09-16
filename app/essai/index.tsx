import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

const Index = () => {
    return (
        <View style={styles.main}>
            <Text>Convertisseur de fichiers</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: "red",
        flex: 1
    }
})

export default Index;