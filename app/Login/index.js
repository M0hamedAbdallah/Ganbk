import React, { useContext } from "react";
import { useState, memo } from 'react';
import { View, Text, TouchableOpacity } from "../../components/Themed";
import { StyleSheet, Image, useColorScheme } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "../../firebase/config/firebase-config";
import auth2 from '@react-native-firebase/auth';
import { router } from "expo-router";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import WordsContext from "../../src/lang/wordsContext";
import directionContext from "../../src/direction/directionContext";
import { db } from "../../firebase/config/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { EventRegister } from "react-native-event-listeners";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

function setteing() {
    const colorScheme = useColorScheme();
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);
    const [init, setInit] = useState(true);
    const [user, setUser] = useState();

    GoogleSignin.configure({
        webClientId: "74922022574-ar04ta2vlrtcu5fni62jiu19dpi82a14.apps.googleusercontent.com",
    })


    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = GoogleAuthProvider.credential(idToken);
            const googleCredential2 = auth2.GoogleAuthProvider.credential(idToken);
            const userInfo = signInWithCredential(auth, googleCredential);
            auth2().signInWithCredential(googleCredential2);
            await userInfo.then(async (user) => {
                const UserRef = doc(db, "Users", user.user.uid);
                const docSnap = await getDoc(UserRef);
                if (docSnap.data() == undefined) {
                    await setDoc(UserRef, {
                        firstName: user["_tokenResponse"].firstName,
                        email: user.user.email,
                        ImageUser: user.user.photoURL,
                        phone: '',
                        BirthDate: '',
                        Love: [],
                        MyAds: [],
                        date: Date.now()
                    });
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            EventRegister.emit('ReLoad', Math.random() * 1000);
            router.replace('/Home');
            router.back();
        } catch (e) {
            console.log(e)
        }
    }

    async function onFaceBookButtonPress() {
        try {
            await LoginManager.logInWithPermissions(["public_profile", "email"]);
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                return;
            }
            const facebookCredential = FacebookAuthProvider.credential(data?.accessToken);
            const facebookCredential2 = auth2.FacebookAuthProvider.credential(data?.accessToken);
            const userInfo = signInWithCredential(auth, facebookCredential);
            auth2().signInWithCredential(facebookCredential2);
            await userInfo.then(async (user) => {
                const UserRef = doc(db, "Users", user.user.uid);
                const docSnap = await getDoc(UserRef);
                if (docSnap.data() == undefined) {
                    await setDoc(UserRef, {
                        firstName: user["_tokenResponse"].firstName,
                        email: user.user.email,
                        ImageUser: user.user.photoURL,
                        phone: '',
                        BirthDate: '',
                        Love: [],
                        MyAds: [],
                        date: Date.now()
                    });
                }
            })
                .catch((err) => {
                    console.log(err);
                });
            EventRegister.emit('ReLoad', Math.random() * 1000);
            router.replace('/Home');
            router.back();
        } catch (e) {
            console.log(e)
        }
    }

    async function onPhoneButtonPress() {
        try {
            router.replace('/Home');
            router.back();
        } catch (e) {
            console.log(e)
        }
    }

    function ImageLogo() {
        if (colorScheme == 'light') {
            return (
                <Image source={require("../../src/assets/Ganbk.png")}
                    resizeMode="center"
                    style={{ width: 100, height: 100 }}
                />
            )
        } else if (colorScheme == 'dark') {
            return (
                <Image source={require("../../src/assets/GanbkDark.png")}
                    resizeMode="center"
                    style={{ width: 100, height: 100 }}
                />
            )
        }
    }




    return (
        <View style={styles.container}>
            <View style={{ width: "100%", height: "80%", alignItems: "center", }}>
                <View style={{ flexDirection: direction.direction, width: "100%", justifyContent: "space-evenly", marginTop: 50, alignItems: "center" }}>
                    <ImageLogo />
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Text style={{ fontWeight: "900", fontSize: 25, }}>
                            {Languages.Sign}
                        </Text>
                        <Text style={{ textDecorationLine: 'underline', fontSize: 15, }}>{Languages.SignTo}</Text>
                    </View>
                </View>

                <TouchableOpacity style={[styles.itemContainer, { flexDirection: direction.direction }]} onPress={async () => {
                    await onGoogleButtonPress();
                }} lightColor="#eee" darkColor="#404040">
                    <View style={{ width: '30%', height: '100%', alignItems: "center", justifyContent: "center", backgroundColor: 'transparent' }} >
                        <Image
                            source={require("../../src/assets/google.png")}
                            style={{ width: 30, height: 30 }} />

                    </View>
                    <View style={{ width: '70%', height: '100%', justifyContent: "center", backgroundColor: 'transparent', alignItems: direction.start }} >

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {Languages.Google}
                        </Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity style={[styles.itemContainer, { flexDirection: direction.direction }]} lightColor="#eee" darkColor="#404040" onPress={async () => {
                    await onFaceBookButtonPress();
                }}>
                    <View style={{ width: '30%', height: '100%', alignItems: "center", justifyContent: "center", backgroundColor: 'transparent' }} >
                        <Image
                            source={require("../../src/assets/facebook.png")}
                            style={{ width: 30, height: 30 }} />

                    </View>
                    <View style={{ width: '70%', height: '100%', justifyContent: "center", backgroundColor: 'transparent', alignItems: direction.start }} >

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {Languages.Facebook}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.itemContainer, { flexDirection: direction.direction }]} lightColor="#eee" darkColor="#404040">
                    <View style={{ width: '30%', height: '100%', alignItems: "center", justifyContent: "center", backgroundColor: 'transparent' }} >
                        <Image
                            source={require("../../src/assets/phone.png")}
                            style={{ width: 30, height: 30 }} />

                    </View>
                    <View style={{ width: '70%', height: '100%', justifyContent: "center", backgroundColor: 'transparent', alignItems: direction.start }} >

                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {Languages.Phone}
                        </Text>
                    </View>
                </TouchableOpacity>


            </View>
            <View style={{ width: "100%", height: "20%", justifyContent: "flex-end" }}>
                <View style={{ alignItems: 'center' }}>

                    <Text>
                        {Languages.agree1}
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>

                    <Text style={{
                        textDecorationLine: 'underline', fontSize: 15
                        , fontWeight: 'bold'
                    }}>
                        {Languages.agree2}
                    </Text>
                </View>
                <View style={{ alignItems: 'center', marginBottom: 5 }}>

                    <Text style={{
                        textDecorationLine: 'underline', fontSize: 15
                        , fontWeight: 'bold', textDecorationColor: 'black'
                    }}>
                        {Languages.agree3}
                    </Text>
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    itemContainer: {
        width: "85%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 20
    },
})


export default memo(setteing);