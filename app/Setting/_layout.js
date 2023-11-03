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
            <Stack.Screen name="index" options={{
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
                            {Languages.Settings}
                        </Text>
                    </View>
                },
                headerBackVisible: (I18nManager.isRTL) ? false : false
            }} />
            <Stack.Screen name="SingOut" options={{
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
                            {Languages.Manageaccount}
                        </Text>
                    </View>
                },
                headerBackVisible: (I18nManager.isRTL) ? false : false
            }} />
        </Stack>
    )
}

export default StackLayout;