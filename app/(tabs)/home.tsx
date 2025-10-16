import PageLayout from "@/layouts/PageLayout";
import {StyleSheet, Text, View} from "react-native";
import {TextStyles} from "@/hook/TextStyles";

export default function Index() {
    return (
        <PageLayout>
            <Text style={[TextStyles.h1, styles.title]}>Bienvenue cher agriculteur !</Text>
            <View style={styles.mainContainer}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text>12345</Text>
                </View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text>12345</Text>
                </View>
            </View>
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        width: 1158,
        height: 641,
        margin: "auto",
        borderRadius: 80,
    },
    title: {
        fontSize: 24,
        paddingVertical: 20,
        color: "white",
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 8,
        position: "absolute",
    }
})