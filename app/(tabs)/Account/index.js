import { StyleSheet, Image, useColorScheme } from "react-native";
import { Link, useRouter, } from "expo-router";
import { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, ImageEdit, TouchableOpacity } from '../../../components/Themed';
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../../firebase/config/firebase-config";
import WordsContext from "../../../src/lang/wordsContext";
import directionContext from "../../../src/direction/directionContext";

export default function Account() {
    const router = useRouter();
    const [init, setInit] = useState(true);
    const [user, setUser] = useState();
    const colorScheme = useColorScheme();
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);

    function onAuthStateC(user) {
        setUser(user);
        if (init) setInit(false)
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, onAuthStateC);
        return subscriber;
    }, []);

    function ImageLogo() {
        if (colorScheme == 'light') {
            return (
                <Image source={require("../../../src/assets/Ganbk.png")}
                    resizeMode="center"
                    style={{ width: 100, height: 100 }}
                />
            )
        } else if (colorScheme == 'dark') {
            return (
                <Image source={require("../../../src/assets/GanbkDark.png")}
                    resizeMode="center"
                    style={{ width: 100, height: 100 }}
                />
            )
        }
    }

    function Info() {
        if (!user) {
            return (
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ fontWeight: "900", fontSize: 30, }}>
                        {Languages.Sign}
                    </Text>
                    <Text style={{ textDecorationLine: 'underline', fontSize: 15, }}>{Languages.SignTo}</Text>
                </View>
            )
        } else {
            return (
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ fontWeight: "900", fontSize: 20 }}>
                        {user.displayName}
                    </Text>
                    <Text style={{ textDecorationLine: 'underline', fontSize: 10, }}>{user.email}</Text>
                </View>
            )
        }
    }

    function ButtonAuth() {
        if (!user) {
            return (
                <Link href={'/Login'} asChild>
                    <TouchableOpacity style={styles.ButtonContainer} >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                            {Languages.Log}
                        </Text>
                    </TouchableOpacity>
                </Link>
            )
        } else {
            return (
                <Link href={'/Profile'} asChild>
                    <TouchableOpacity style={styles.ButtonContainer} >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                            Profile {user.displayName}
                        </Text>
                    </TouchableOpacity>
                </Link>
            )
        }
    }

    if (init) return null;

    return (
        <ScrollView style={{ width: '100%' }} >
            <View style={styles.container}>
                <View style={{ flexDirection: direction.direction , width: "100%", justifyContent: "space-evenly", marginTop: 50, alignItems: "center" }}>
                    <ImageLogo />
                    <Info />
                </View>
                <View style={{ width: "90%", height: 1, marginTop: 20 }} lightColor="black" darkColor="#c1c1c1" />
                <TouchableOpacity style={[styles.itemContainer, { flexDirection: direction.direction }]} lightColor="#eee" darkColor="#404040" onPress={() => {
                    router.push('/Language');
                }}>
                    <ImageEdit
                        source={require("../../../src/assets/lang.png")}
                        style={{ width: 30, height: 30 }}
                    />

                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {Languages.Language}
                    </Text>
                    <ImageEdit
                        source={require("../../../src/assets/right-arrow.png")}
                        style={{ width: 20, height: 20 ,transform:[{rotate:(Languages.lang == 'en')? '0deg':'180deg'}]}} />
                </TouchableOpacity>
                <View style={{ width: "90%", height: 1, marginTop: 20 }} lightColor="black" darkColor="#c1c1c1" />
                    <TouchableOpacity style={[styles.itemContainer, { flexDirection: direction.direction }]} lightColor="#eee" darkColor="#404040" onPress={()=>{
                        router.push('/Support')
                    }}>
                        <ImageEdit
                            source={require("../../../src/assets/help.png")}
                            style={{ width: 30, height: 30 }} />
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Languages.Support}
                        </Text>
                        <ImageEdit
                            source={require("../../../src/assets/right-arrow.png")}
                            style={{ width: 20, height: 20 ,transform:[{rotate:(Languages.lang == 'en')? '0deg':'180deg'}] }} />
                    </TouchableOpacity>

                <View style={{ width: "90%", height: 1, marginTop: 20 }} lightColor="black" darkColor="#c1c1c1" />
                    <TouchableOpacity style={[styles.itemContainer, { flexDirection: direction.direction }]} lightColor="#eee" darkColor="#404040" onPress={()=>{
                        router.push('/Setting');
                    }}>
                        <ImageEdit
                            source={require("../../../src/assets/settings.png")}
                            style={{ width: 30, height: 30 }} />
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Languages.Settings}
                        </Text>
                        <ImageEdit
                            source={require("../../../src/assets/right-arrow.png")}
                            style={{ width: 20, height: 20 ,transform:[{rotate:(Languages.lang == 'en')? '0deg':'180deg'}]}} />
                    </TouchableOpacity>
                <View style={{ width: "90%", height: 1, marginTop: 20 }} lightColor="black" darkColor="#c1c1c1" />
                <ButtonAuth />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    itemContainer: {
        width: "85%",
        height: 50,
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 5,
        marginTop: 20,
        flexDirection: "row",
    },
    ButtonContainer: {
        width: "85%",
        height: 50,
        backgroundColor: "#e93333",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 5,
        marginTop: 20,

    },
    nameText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
