import {StyleSheet, TextInput, View} from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TextInput style={styles.form}/>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        height: 25,
        width: '25%',
        backgroundColor: "white",
        borderWidth: 2,
    }
})
