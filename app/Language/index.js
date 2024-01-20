import { StyleSheet, ActivityIndicator } from "react-native";
import { Text, View, TouchableOpacity, ImageEdit } from "../../components/Themed";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import WordsContext from "../../src/lang/wordsContext";
import { useContext } from "react";
import { EventRegister } from 'react-native-event-listeners';
import { router } from "expo-router";
import directionContext from "../../src/direction/directionContext";

export default function Page() {
    const [lang, setlang] = useState("en"); // Languages.local
    const [load, setLoad] = useState(false);
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);


    const set = async (value) => {
        try {
            await AsyncStorage.setItem('@lang', (value).toString());
        } catch (error) {
            alert(error);
        }
    }

    const reload = async () => {
        setLoad(true);
        EventRegister.emit('Lang', lang);
        const list = setTimeout(() => {
            setLoad(false);
            router.back();
        }, 3000)
        return () => {
            clearTimeout(list)
        }
    }

    const get = async () => {
        try {
            await AsyncStorage.getItem('@lang', (err, item) => {
                if (item != null || item != undefined) {
                    setlang(item)
                }
            });
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        get();
    })

    function Language({ info }) {
        if (lang == info.language) {
            return (
                <>
                    <ImageEdit source={require('../../src/assets/check.png')} style={{ width: 30, height: 30 }} lightColor="black" darkColor="white" />
                </>
            )
        } else {
            return (
                <View style={{ width: 30, height: 30 }}>
                </View>
            )
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ width: "100%", marginTop: 10 }} onPress={async () => {
                if (lang != 'en') {
                    set('en');
                    get();
                    await reload();
                }
            }}>
                <View style={{ flexDirection: direction.direction, width: "100%", height: 60, justifyContent: "space-evenly", alignItems: "center" }}>
                    <View style={{ width: "85%", alignItems: direction.start }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            {Languages.English}
                        </Text>
                    </View>
                    <Language info={{ language: "en" }} />
                </View>
            </TouchableOpacity>
            <View style={{ width: "100%", height: 1, marginTop: 10 }} lightColor="black" darkColor="white"></View>
            <TouchableOpacity style={{ width: "100%", marginTop: 10 }} onPress={async () => {
                if (lang != 'ar') {
                    set('ar');
                    get();
                    await reload();
                }
            }}>
                <View style={{ flexDirection: direction.direction, width: "100%", height: 60, justifyContent: "space-evenly", alignItems: "center" }}>
                    <View style={{ width: "85%", alignItems: direction.start }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            {Languages.Arabic}
                        </Text>
                    </View>
                    <Language info={{ language: "ar" }} />
                </View>
            </TouchableOpacity>
            <View style={{ width: "100%", height: 1, marginTop: 10 }} lightColor="black" darkColor="white"></View>
            {
                load ? (
                    <View style={{ height: "100%", width: "100%", top: 0, bottom: 0, position: 'absolute', backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size={50} color={'#ff3a3a'} />
                    </View>
                ) : (<></>)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});
