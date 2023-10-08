import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native'
import React, { memo, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import directionContext from '../../src/direction/directionContext'
import WordsContext from '../../src/lang/wordsContext'
import auth, { db, firebase } from '../../firebase/config/firebase-config'
import { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const index = () => {
    const direction = useContext(directionContext);
    const Languages = useContext(WordsContext);
    const [message, setMessage] = useState('');
    const [sendedMessage, setSendedMessage] = useState([]);
    const [docUpdata, setDocUpdata] = useState(false);
    const [data, setData] = useState({});
    const [appIsReady, setAppIsReady] = useState(false);
    const [value, setvalue] = useState(0);
    const [plus, setPlus] = useState(0);


    useEffect(() => {
        const load = async () => {
            const value = await AsyncStorage.getItem("@ChatGroup")
            const data = JSON.parse(value);
            firebase.firestore().collection("/Chats/" + data?.chatGroup + "/messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) =>
                    setSendedMessage((snapshot.docs.map((doc) => ({ doc: doc.data() }))))
                );
            return 0;
        }
        setPlus(
            load()
        );
        setAppIsReady(true);
        return load;
    }, [value])

    useEffect(() => {
        const load = async () => {
            setData(
                JSON.parse(await AsyncStorage.getItem("@ChatGroup"))
            )
            return 0;
        }
        setPlus(
            load()
        );
        setAppIsReady(true);
        return load;
    }, [])


    if (!appIsReady) {
        return null;
    }
    const sendMessage = () => {
        Keyboard.dismiss();
        console.log(data?.chatGroup)
        if (message != "") {
            firebase.firestore().collection('Chats').doc(data?.chatGroup).collection("messages").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                see: false,
                send: true,
                message: message,
                uid: auth?.currentUser?.uid,
                user: auth?.currentUser?.displayName,
                PhotoURL: auth?.currentUser?.photoURL,
            }).then(async () => {
                const v2 = doc(db, '/Users/' + data?.Id + "/Chats", auth?.currentUser?.uid);
                await updateDoc(v2, {
                    show: true
                })
            }).catch((e) => {
                alert(e);
            })
            setvalue(value + 1);
        }

        setMessage("");
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={90}
        >
            <SafeAreaView />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>

                    {console.log(data?.chatGroup)}
                    {console.log(sendedMessage)}
                    <ScrollView style={{ height: "100%" }}>
                        {
                            sendedMessage?.map((value, index) =>

                                (!(value?.doc?.uid === auth?.currentUser?.uid)) ? (
                                    <View style={{ width: "100%", alignItems: "center", flexDirection: direction.direction }} key={index}>
                                        <View style={{ width: "15%", alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={{ uri: value?.doc?.PhotoURL }} style={{ width: 40, height: 40, borderRadius: 50 }} />
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
                    <View style={[styles.footer, { flexDirection: direction.direction, justifyContent: 'space-between' }]}>
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
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default memo(index)

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