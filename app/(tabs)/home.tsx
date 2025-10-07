import PageLayout from "@/layouts/PageLayout";
import {Text} from "react-native";
import {TextStyles} from "@/hook/TextStyles";

export default function Index() {
    return (
        <PageLayout>
            <Text style={[TextStyles.h1, {
                paddingVertical: 20,
                color: "white",
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)"
            }]}>Bienvenue cher agriculteur !</Text>
        </PageLayout>
    );
}