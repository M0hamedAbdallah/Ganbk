import { Stack, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import WordsContext from "../../src/lang/wordsContext";
import { Text } from "../../components/Themed";
import { useColorScheme, I18nManager, View, Image, TouchableOpacity } from 'react-native';
const StackLayout = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const Languages = useContext(WordsContext);
    const colorScheme = useColorScheme();
    useEffect(() => {
        setAppIsReady(true);
    })

    if (!appIsReady) {
        return null;
    }
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
        </Stack>
    )
}

export default StackLayout;