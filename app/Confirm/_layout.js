import { SplashScreen, Stack } from "expo-router";
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
            <Stack.Screen name="DuplexForRent" options={{headerShown:false}}/>
            <Stack.Screen name="VillasForSale" options={{headerShown:false}}/>
            <Stack.Screen name="VillasForRent" options={{headerShown:false}}/>
            <Stack.Screen name="HomesForSale" options={{headerShown:false}}/>
            <Stack.Screen name="HomesForRent" options={{headerShown:false}}/>
            <Stack.Screen name="CommercialForSale" options={{headerShown:false}}/>
            <Stack.Screen name="CommercialForRent" options={{headerShown:false}}/>
            <Stack.Screen name="BuildingsLands" options={{headerShown:false}}/>
        </Stack>
    )
}

export default StackLayout;