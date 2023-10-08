import { Image, StyleSheet, View, useColorScheme } from 'react-native'
import CustomListItem from '../../src/components/CustomListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import auth, { firebase } from "../../firebase/config/firebase-config";
import { EventRegister } from 'react-native-event-listeners';


const Chat = () => {
    const color = useColorScheme();
    const [chats, setChats] = useState([]);
    const [value, setvalue] = useState(0);
    function ImageLogo() {
        if (color == 'light') {
            return (
                <Image source={require("../../src/assets/Ganbk.png")}
                    resizeMode="center"
                    style={{ width: 100, height: 100 }}
                />
            )
        } else if (color == 'dark') {
            return (
                <Image source={require("../../src/assets/GanbkDark.png")}
                    resizeMode="center"
                    style={{ width: 100, height: 100 }}
                />
            )
        }
    }

    const ReLoad = async (v) => {
        setvalue(v+1);
    }
    useEffect(() => {
        const listener = EventRegister.addEventListener('ReLoad', (data) => {
            ReLoad(data);
        })
        ReLoad(Math.random()*1000)
        return () => {
            EventRegister.removeEventListener('ReLoad');
        }
    }, [])

    useEffect(() => {
        if (auth?.currentUser) {
            const unsubscribe = firebase.firestore().collection('/Users/' + auth?.currentUser?.uid + "/Chats").onSnapshot((snapshot) =>
                setChats((snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })
                ))))
            return unsubscribe;
        }
    }, [auth?.currentUser, value])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: (color == 'dark') ? 'black' : 'white' }}>
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-evenly", alignItems: "center" }}>
                <ImageLogo />
            </View>
            {
                console.log(chats)
            }
            {(auth?.currentUser) ? chats?.map((i) =>
                (i?.data?.show) ? (
                    <CustomListItem
                        Name={i?.data?.Name}
                        ImageUser={i?.data?.Image}
                        Message={i?.data?.Message}
                        key={i?.id}
                        Id={i?.id}
                        chatGroup={i?.data?.chatGroup}
                    />
                ) : (
                    null
                )
            ) : (null)}
        </SafeAreaView>
    )
}

export default Chat

const styles = StyleSheet.create({})