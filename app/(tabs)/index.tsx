// noinspection JSDeprecatedSymbols,XmlDeprecatedElement

import {Text, View} from "react-native";
import {TextStyles} from "@/hook/TextStyles";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Index() {
    return (
        <SafeAreaView style={{backgroundColor: "#fafafa", flex: 1}}>
            <View style={{height: 41, backgroundColor: "#4eb3be", justifyContent: "center"}}>
                <Text style={[TextStyles.h1, {color: "white"}]}>WordConverter</Text>
            </View>
            <Text>Page d&#39;accueil</Text>
        </SafeAreaView>
    );
}
