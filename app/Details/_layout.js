import { SplashScreen, Stack, router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { I18nManager, Image, TouchableOpacity, useColorScheme, View } from "react-native";
import { Text } from "../../components/Themed";
import WordsContext from "../../src/lang/wordsContext";


const index = () => {
    const colorScheme = useColorScheme();
    const Languages = useContext(WordsContext);
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        setAppIsReady(true);
    })
    const { id } = useLocalSearchParams();
    if (!appIsReady) {
        return null;
    }

    return (
        <Stack>
            <Stack.Screen name='[id]' options={{
                title:""
            }} />
            <Stack.Screen name='Properties' options={{
                headerLeft: () => {
                    if (Languages.lang === 'en') {
                        if (!I18nManager.isRTL) {
                            return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                                router.replace("/Home");
                                router.back();

                            }}>
                                <Image source={require('../../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23 }} />
                            </TouchableOpacity>
                        }
                    } else {
                        if (I18nManager.isRTL) {
                            return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                                router.replace("/Home");
                                router.back();

                            }}>
                                <Image source={require('../../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                            </TouchableOpacity>
                        }
                    }
                },
                headerRight: () => {
                    if (Languages.lang === 'ar') {
                        if (!I18nManager.isRTL) {
                            return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                                router.replace("/Home");
                                router.back()
                            }}>
                                <Image source={require('../../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                            </TouchableOpacity>
                        }
                    } else {
                        if (I18nManager.isRTL) {
                            return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {
                                router.replace("/Home");
                                router.back()
                            }}>
                                <Image source={require('../../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '0deg' }] }} />
                            </TouchableOpacity>
                        }
                    }
                },
                headerTitle: () => {
                    return <View style={{ width: "85%", marginLeft: 23 }}>
                        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                            {Languages.Properties}
                        </Text>
                    </View>
                },
                headerBackVisible: (I18nManager.isRTL)?false:false
            }} />
        </Stack>
    )
}

export default index;