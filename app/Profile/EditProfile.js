import React, { useContext } from "react";
import { useState, useEffect } from 'react'
import { View, Text } from "../../components/Themed";
import { StyleSheet, Image, TouchableOpacity, TextInput, useColorScheme, Pressable, Platform } from "react-native";
import auth from "../../firebase/config/firebase-config";
import { Redirect, router } from "expo-router";
import * as Google from '@react-native-google-signin/google-signin'
import { signOut, onAuthStateChanged, updateProfile, updatePhoneNumber } from "firebase/auth";
import WordsContext from "../../src/lang/wordsContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config/firebase-config";
import { EventRegister } from "react-native-event-listeners";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function index() {
    const color = useColorScheme();
    const Languages = useContext(WordsContext);
    const [init, setInit] = useState(true);
    const [user, setUser] = useState();
    const [userBase, setUserBase] = useState();
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Birth, setBirth] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    Google.GoogleSignin.configure({});


    async function onAuthStateC(user) {
        setUser(user);
        const UserRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(UserRef);
        console.log(docSnap.data());
        setUserBase(docSnap.data());
        setName(user.displayName)
        setPhone((docSnap.data().phone) ? docSnap.data().phone : '')
        setBirth((docSnap.data().BirthDate) ? docSnap.data().BirthDate : '')
        if (init) setInit(false)
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, onAuthStateC);
        return subscriber;
    }, []);


    const save = async () => {
        const UserRef = doc(db, "Users", user.uid);
        await updateDoc(UserRef, {
            firstName: Name,
            phone: Phone,
            BirthDate: Birth,
        })
        await updateProfile(auth.currentUser, {
            displayName: Name,
            phoneNumber: Phone
        })
        // await updatePhoneNumber(auth,{})
        // FirebaseAuth.instance.verifyPhoneNumber(
        //     phoneNumber: phoneNumber,
        //     timeout: const Duration(minutes: 2),
        //     verificationCompleted: (credential) async {
        //       await (await FirebaseAuth.instance.currentUser()).updatePhoneNumber(credential);
        //       // either this occurs or the user needs to manually enter the SMS code
        //     },
        //     verificationFailed: null,
        //     codeSent: (verificationId, [forceResendingToken]) async {
        //       String smsCode;
        //       // get the SMS code from the user somehow (probably using a text field)
        //       final AuthCredential credential =
        //         PhoneAuthProvider.getCredential(verificationId: verificationId, smsCode: smsCode);
        //       await (await FirebaseAuth.instance.currentUser()).updatePhoneNumber(credential);
        //     },
        //     codeAutoRetrievalTimeout: null);
        router.replace('/Home');
        router.back();
    }

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === 'android') {
                toggleDatepicker();
                setBirth(formatDate(currentDate));
            }
        } else {
            toggleDatepicker();
        }
    }

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return (day + '/' + month + '/' + year);
    }

    useEffect(() => {
        const listener = EventRegister.addEventListener('Back', (data) => {
            if(data){
                router.back();
            }
        })
        return () => {
            EventRegister.removeEventListener('Back');
        }
    }, [])

    if (init) return null;

    if (!user) {
        return (
            <Redirect href={'/Home'} />
        );
    }
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", height: "80%", marginTop: 30 }}>
                <View style={{ width: "100%", alignItems: 'center' }}>
                    <View style={{ width: "90%" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {Languages.name}
                        </Text>
                    </View>
                    <View style={{ width: "90%", borderRadius: 6 }}>
                        <TextInput style={{
                            width: "100%",
                            height: 45,
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderColor: 'gray',
                            borderRadius: 5,
                            borderWidth: 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: (color == 'dark') ? 'white' : 'black'
                        }}
                            value={Name}
                            onChangeText={setName}
                        />
                    </View>
                </View>
                <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: "90%" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {Languages.email}
                        </Text>
                    </View>
                    <View style={{ width: "90%", height: 50, borderRadius: 5, borderColor: (color == 'light') ? 'black' : 'white', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15 }}>
                            {user.email}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    if (Phone != '' || Phone != null) {
                        router.push("/OTP");
                    }
                }} style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: "90%" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {Languages.phone}
                        </Text>
                    </View>
                    <View style={{
                        width: "90%", height: 45, borderRadius: 6, alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        borderColor: 'gray',
                        borderWidth: 2,
                    }}>
                        <Text style={{
                            width: "100%",
                            paddingLeft: 10,
                            paddingRight: 10,
                            color: (color == 'dark') ? 'white' : 'black'
                        }}
                        >
                            {Phone}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: "90%" }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {Languages.BirthDate}
                        </Text>
                    </View>
                    {!showPicker && (<Pressable
                        onPress={toggleDatepicker}
                        style={{ width: "90%" }}
                    >
                        <View style={{ width: "100%", borderRadius: 6 }}>
                            <TextInput style={{
                                width: "100%",
                                height: 45,
                                paddingLeft: 10,
                                paddingRight: 10,
                                borderColor: 'gray',
                                borderRadius: 5,
                                borderWidth: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: (color == 'dark') ? 'white' : 'black'
                            }}
                                value={Birth}
                                onChangeText={setBirth}
                                editable={false}
                            />
                        </View>
                    </Pressable>)}
                    {showPicker && (<DateTimePicker
                        mode='date'
                        display='spinner'
                        value={date}
                        onChange={onChange}
                    />)}
                </View>
            </View>
            <View style={{ width: "100%", height: "20%", alignItems: 'center' }}>
                <TouchableOpacity style={styles.ButtonContainer} onPress={() => {
                    save();
                }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                        {Languages.Save}
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