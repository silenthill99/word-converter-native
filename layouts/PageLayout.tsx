import React, {PropsWithChildren} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, Text, View} from "react-native";
import {colors} from "@/hook/Colors";
import {TextStyles} from "@/hook/TextStyles";

const PageLayout = ({children}: PropsWithChildren) => {
    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.header}>
                <Text style={[TextStyles.h1, {color: "white"}]}>Agricultury</Text>
            </View>
            <View style={styles.main}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: colors.mainColor,
    },
    header: {
        height: 41,
        justifyContent: "center"
    },
    main: {
        flex: 1,
        backgroundColor: "#fafafa",
    }
})

export default PageLayout;