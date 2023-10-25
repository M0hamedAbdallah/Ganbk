import { Image, Keyboard, View as ReactView, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import { View, Text, ScrollView, TouchableOpacity } from "../../components/Themed";
import React, { memo, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import directionContext from '../../src/direction/directionContext'
import WordsContext from '../../src/lang/wordsContext'
import auth, { db, firebase } from '../../firebase/config/firebase-config'
import { useEffect } from 'react'
import { useLayoutEffect } from 'react'
// import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'


export default function Support() {
    const [start, setStart] = useState(false);
    const color = useColorScheme();
    const direction = useContext(directionContext);
    const Languages = useContext(WordsContext);
    const [message, setMessage] = useState('');
    const [sendedMessage, setSendedMessage] = useState([]);
    const [docUpdata, setDocUpdata] = useState(false);
    const [data, setData] = useState({});
    const [appIsReady, setAppIsReady] = useState(false);
    const [value, setvalue] = useState(0);
    const [plus, setPlus] = useState(0);

    const sendMessage = () => {
        Keyboard.dismiss();
        if (message != "") {
            firebase.firestore().collection('AdminChats').doc("Admin" + auth?.currentUser?.uid).collection("messages").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                see: false,
                send: true,
                message: message,
                uid: auth?.currentUser?.uid,
                user: auth?.currentUser?.displayName,
                PhotoURL: auth?.currentUser?.photoURL,
            }).then(async () => {
                console.log('yes')
            }).catch((e) => {
                console.log('No')
            })
            setvalue(value + 1);
        }

        setMessage("");
    }


    useEffect(() => {
        const lon = async () => {
            const def = doc(db, "Users", auth?.currentUser?.uid);
            const dataDef = await getDoc(def);
            if (dataDef.data() != undefined) {
                setStart(dataDef.data().ChatAdmin);
            }

        }
        lon();
        setAppIsReady(true);
    }, [])

    useEffect(() => {
        const load = async () => {
            firebase.firestore().collection("/AdminChats/" + "Admin" + auth?.currentUser?.uid + "/messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) =>
                    setSendedMessage((snapshot.docs.map((doc) => ({ doc: doc.data() }))))
                );
            return 0;
        }
        setPlus(
            load()
        );
        return load;
    }, [value])




    const Chat = async () => {
        if (auth?.currentUser) {
            const def = doc(db, "Users", auth?.currentUser?.uid);
            await updateDoc(def, {
                ChatAdmin: true
            }).then(() => {
                firebase.firestore().collection('AdminChats').doc("Admin" + auth?.currentUser?.uid).set({
                    Name: auth?.currentUser?.displayName,
                    Photo: auth?.currentUser?.photoURL,
                    uid: auth?.currentUser?.uid,
                    phono: auth?.currentUser?.phoneNumber,
                })
                setvalue(value + 1);

            });
            setStart(true);
        }
    }

    if (!appIsReady) {
        return null
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={{ flex: 1, alignItems: 'center' }}>
                {(!start) ? (
                    <>
                        <ReactView style={{ width: "90%", padding: 10, backgroundColor: 'red', borderRadius: 3, marginTop: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                ملحوظة هامة هذا الدعم يتواصل مباشرة مع أحد خدمة العملاء
                            </Text>
                        </ReactView>
                    </>
                ) : (
                    <>
                    </>
                )}
                {console.log(sendedMessage)}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    {(!start) ? (
                        <>
                        </>
                    ) : (
                        <>
                            <ScrollView style={{ height: "100%" }}>
                                {
                                    sendedMessage?.map((value, index) =>

                                        (!(value?.doc?.uid === auth?.currentUser?.uid)) ? (
                                            <View style={{ width: "100%", alignItems: "center", flexDirection: direction.direction }} key={index}>
                                                <View style={{ width: "15%", alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={(color=='light')?(require("../../src/assets/Ganbk.png")):(require("../../src/assets/GanbkDark.png"))} style={{ width: 40, height: 40, borderRadius: 50 ,resizeMode:'center'}} />
                                                </View>
                                                <View style={{ width: "85%", padding: 10, alignItems: direction.start }}>
                                                    <Text style={{ color: 'white', backgroundColor: '#535353', padding: 10, borderRadius: 8 }}>
                                                        {value?.doc?.message}
                                                    </Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <View style={{ width: "100%", alignItems: "center", flexDirection: direction.direction }} key={index}>
                                                <View style={{ width: "85%", padding: 10, alignItems: direction.end }}>
                                                    <Text style={{ color: 'white', backgroundColor: '#d43131', padding: 10, borderRadius: 8 }}>
                                                        {value?.doc?.message}
                                                    </Text>
                                                </View>
                                                <View style={{ width: "15%", alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image source={{ uri: auth?.currentUser?.photoURL }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                                                </View>
                                            </View>
                                        )
                                    )

                                }
                            </ScrollView>
                        </>
                    )}

                </View>
                {(!start) ? (
                    <>
                        <TouchableOpacity style={{ width: 100, padding: 10, backgroundColor: 'red', borderRadius: 3, marginTop: 10, alignItems: "center", marginBottom: 20 }} onPress={() => {
                            Chat();
                        }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                بدء المحادثة
                            </Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                    </>
                )}
                <View style={[styles.footer, { flexDirection: direction.direction, justifyContent: 'space-between', marginBottom: 10 }]}>
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        placeholder={Languages.Message}
                        placeholderTextColor={'red'}
                        style={styles.textInput}
                    />
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} style={{ transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], width: "10%" }} >
                        <Ionicons name='send' size={24} color={"#e94444"} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    footer: {
        alignItems: "center",
        width: "100%",
        paddingTop: 15,
        paddingBottom: 15,
    },
    textInput: {
        bottom: 0,
        width: "80%",
        height: 40,
        flex: 1,
        marginRight: 13,
        marginLeft: 13,
        borderColor: "transparent",
        backgroundColor: "#42424268",
        borderWidth: 1,
        padding: 10,
        color: '#ffffff',
        borderRadius: 30
    }
})