import React from 'react';
import PageLayout from "@/layouts/PageLayout";
import {Text} from "react-native";

const Contacts = () => {
    // fetch("https://devflorian.cornillet.com/login")
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error('Erreur:', error));

    return (
        <PageLayout>
            <Text>Page de contacts</Text>
        </PageLayout>
    );
};
export default Contacts;