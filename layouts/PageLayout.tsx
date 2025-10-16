import React, {PropsWithChildren} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {colors} from "@/hook/Colors";
import {TextStyles} from "@/hook/TextStyles";
import {ImageBackground} from "expo-image";

interface PageLayoutProps {
    style?: StyleProp<ViewStyle>;
}

const PageLayout = ({children, style}: PropsWithChildren<PageLayoutProps>) => {
    return (
        <SafeAreaView style={styles.parent}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={[TextStyles.h1, {color: "white", textAlignVertical: "center"}]}>Agricultury</Text>
                </View>
                <ImageBackground
                    style={[styles.main, style]}
                    source={require("@/assets/images/agriculture.jpg")}
                    contentFit="cover"
                    imageStyle={{height: '100%'}}
                >
                    {children}
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: colors.mainColor,
    },
    header: {
        minHeight: 41,
        paddingVertical: 20,
        justifyContent: "center",
        boxShadow: "0 4px 5px rgba(0, 0, 0, 0.25)",
        zIndex: 50
    },
    main: {
        minHeight: '100%',
        backgroundColor: "#fafafa"
    },
})

export default PageLayout;