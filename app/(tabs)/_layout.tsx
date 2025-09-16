import React from 'react';
import {Tabs} from "expo-router";

const RootLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name={'index'}/>
        </Tabs>
    );
};

export default RootLayout;