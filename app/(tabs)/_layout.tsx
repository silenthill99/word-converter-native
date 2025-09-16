import React from 'react';
import {Tabs} from "expo-router";
import {IconSymbol} from "@/app-example/components/ui/icon-symbol";
import ProfileIcon from "@/components/ProfileIcon";

const RootLayout = () => {
    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen name={'index'} options={{tabBarIcon: ({color}) => <IconSymbol size={28} name={"house.fill"} color={color} />}}/>
            <Tabs.Screen name={'contacts'} options={{tabBarIcon: ({color}) => <IconSymbol size={28} name={"paperplane.fill"} color={color} />, title: 'Page de contacts'}}/>
            <Tabs.Screen name={'account'} options={{tabBarIcon: ({color}) => <ProfileIcon size={28} color={color}/>}}/>
        </Tabs>
    );
};

export default RootLayout;