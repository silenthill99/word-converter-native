import {Stack, useRouter, useSegments} from "expo-router";
import {AuthProvider, useAuth} from "@/contexts/AuthContext";
import {useEffect} from "react";

const RootLayoutNav = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        const inTabs = segments[0] === '(tabs)';

        if (!isAuthenticated && inTabs) {
            router.replace('/')
        } else if (isAuthenticated && !inTabs) {
            router.replace('/(tabs)/home')
        }
    }, [isAuthenticated, isLoading, segments, router]);

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name={'index'}/>
            <Stack.Screen name={'(tabs)'}/>
        </Stack>
    )
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav/>
        </AuthProvider>
    );
}
