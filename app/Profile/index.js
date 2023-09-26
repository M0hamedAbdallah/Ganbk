import React, { useContext } from "react";
import { useState, useEffect } from 'react'
import { StyleSheet, Image, TouchableOpacity, useColorScheme } from "react-native";
import { View,Text } from "../../components/Themed";
import auth from "../../firebase/config/firebase-config";
import { Redirect, router } from "expo-router";
import * as Google from '@react-native-google-signin/google-signin'
import { signOut, onAuthStateChanged } from "firebase/auth";
import WordsContext from "../../src/lang/wordsContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config/firebase-config";
export default function index() {
    const color = useColorScheme();
    const Languages = useContext(WordsContext);
    const [init, setInit] = useState(true);
    const [user, setUser] = useState();
    const [userBase, setUserBase] = useState();

    Google.GoogleSignin.configure({});


    async function onAuthStateC(user) {
        setUser(user);
        const UserRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(UserRef);
        setUserBase(docSnap.data());
        if (init) setInit(false)
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, onAuthStateC);
        return subscriber;
    }, []);

    const signOut_ = async () => {
        try {
            await Google.GoogleSignin.revokeAccess();
            await signOut(auth);
            setUser(null);
            router.replace('/Home');
            router.back();
        } catch (e) {
            console.log(e);
        }
    }

    if (init) return null;

    if (!user) {
        return (
            <Redirect href={'/Home'} />
        );
    }
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", height: "80%" }}>
                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: 'row' }}>
                    <Image source={{ uri: user.photoURL }}
                        style={{ height: 100, width: 100, borderRadius: 50, margin: 50 }}
                    />
                </View>
                <View style={{ width: "100%", alignItems: 'center' }}>
                    <View style={{ width: "90%" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {Languages.name}
                        </Text>
                    </View>
                    <View style={{ width: "90%", height: 50, borderRadius: 5,borderColor:(color=='light')?'black':'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15 }}>
                            {user.displayName}
                        </Text>
                    </View>
                </View>
                <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: "90%" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {Languages.email}
                        </Text>
                    </View>
                    <View style={{ width: "90%", height: 50, borderRadius: 5,borderColor:(color=='light')?'black':'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15 }}>
                            {user.email}
                        </Text>
                    </View>
                </View>
                <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: "90%" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {Languages.phone}
                        </Text>
                    </View>
                    <View style={{ width: "90%", height: 50, borderRadius: 5,borderColor:(color=='light')?'black':'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15 }}>
                            {(userBase.phone == '')? Languages.Notfound : userBase.phone}
                        </Text>
                    </View>
                </View>
                <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: "90%" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {Languages.BirthDate}
                        </Text>
                    </View>
                    <View style={{ width: "90%", height: 50, borderRadius: 5,borderColor:(color=='light')?'black':'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15 }}>
                            {(userBase.BirthDate == '')? Languages.Notfound : userBase.BirthDate}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ width: "100%", height: "20%", alignItems: 'center' }}>
                <TouchableOpacity style={styles.ButtonContainer} onPress={() => router.push('/Profile/EditProfile')}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                        {Languages.Edit}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%", height: "20%", alignItems: 'center' }}>
                <TouchableOpacity style={styles.ButtonContainer} onPress={() => signOut_()}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                        {Languages.signOut}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
    }
});