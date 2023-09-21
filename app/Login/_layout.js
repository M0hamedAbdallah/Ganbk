import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";


const Login = () => {
    
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        setAppIsReady(true);
    })

    if (!appIsReady) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false,
            headerShown:false
            }}/>
        </Stack>
    )
}

export default Login;