import PageLayout from "@/layouts/PageLayout";
import {StyleSheet, Text, View} from "react-native";
import {TextStyles} from "@/hook/TextStyles";
import NewParcel from "@/components/NewParcel";

export default function Index() {
    return (
        <PageLayout style={{height: 939}}>
            <Text style={[TextStyles.h1, styles.title]}>Bienvenue cher agriculteur !</Text>
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <Text>12345</Text>
                </View>
                <View style={styles.container}>
                    <NewParcel/>
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
        height: 741,
        margin: "auto",
        borderRadius: 80,
        padding: 20,
        overflow: "hidden",
    },
    title: {
        fontSize: 24,
        paddingVertical: 20,
        color: "white",
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 8,
        position: "absolute"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})