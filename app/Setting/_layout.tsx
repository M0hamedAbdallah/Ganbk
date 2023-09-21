import { Stack } from "expo-router";
import { useEffect, useState } from "react";

const StackLayout = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        setAppIsReady(true);
    })

    if (!appIsReady) {
        return null;
    }
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}}/>
        </Stack>
    )
}

export default StackLayout;