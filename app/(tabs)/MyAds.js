import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, useColorScheme, View as ReactView, TouchableOpacity, Text as ReactText } from "react-native";
import WordsContext from "../../src/lang/wordsContext";
import directionContext from "../../src/direction/directionContext";
import auth, { db } from "../../firebase/config/firebase-config";
import { doc, getDoc } from "firebase/firestore";



export default function MyAds() {
    const colorScheme = useColorScheme();
    const [load, setLoad] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [MyAds, setMyAds] = useState([]);
    const [MyAdsDetails, setMyAdsDetails] = useState([]);
    const [value, setValue] = useState(0);
    const Lungaues = useContext(WordsContext);
    const direction = useContext(directionContext);
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


    useEffect(() => {
        const login = async () => {
            const UserRef = doc(db, "Users", auth?.currentUser.uid);
            const docSnap = await getDoc(UserRef);
            const data = docSnap.data();
            setMyAds((data.MyAds));
        }
        if (auth?.currentUser) {
            login()
        }
    }, [auth?.currentUser, value])

    const dataObjct = (dataSend) => {
        setMyAdsDetails([...MyAdsDetails, dataSend]);
    }

    useEffect(() => {
        const login = async () => {
            MyAds?.map(async ({ from, num }) => {
                const UserRef = doc(db, from, num);
                const docSnap = await getDoc(UserRef);
                const data = docSnap.data();
                dataObjct(docSnap.data())
            })
        }
        if (MyAds.length != 0) {
            login()
        }
    }, MyAds)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: (colorScheme == 'dark') ? 'black' : 'white' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-evenly", alignItems: "center" }}>
                    <ImageLogo />
                </View>
                <View style={{ width: "100%", flexDirection: 'row' }}>
                    <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                        <ReactView style={{ height: 50 }}>
                            <Text style={{ width: "100%", fontSize: 15, fontWeight: "bold" }}>
                                My Ads
                            </Text>
                        </ReactView>
                    </View>
                </View>
                <View style={{ width: "90%", alignItems: "center" }}>
                    <View style={{ width: "100%", height: 40, backgroundColor: 'gray', flexDirection: direction.direction, alignItems: "center", justifyContent: 'space-around' }}>
                        <ReactView style={{ width: "80%" }}>
                            <Text>
                                From: 28 Oct 22
                            </Text>
                        </ReactView>
                        <TouchableOpacity style={{ width: "10%", alignItems: 'center' }} onPress={() => {
                            setLoad(true);
                        }}>
                            <ReactView style={{ width: 4, height: 4, borderRadius: 50, backgroundColor: 'black', marginBottom: 2 }} />
                            <ReactView style={{ width: 4, height: 4, borderRadius: 50, backgroundColor: 'black', marginBottom: 2 }} />
                            <ReactView style={{ width: 4, height: 4, borderRadius: 50, backgroundColor: 'black', marginBottom: 2 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", flexDirection: direction.direction, justifyContent: 'space-between' }} >
                        <View style={{ width: "10%" }}>
                            <Image source={require('../../src/assets/house1.jpeg')} style={{ width: 100, height: 100 }} />
                        </View>
                        <ReactView style={{ width: "70%", justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={3}>
                                some Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Data
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={1}>
                                some Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Data
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={1}>
                                some Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Data
                            </Text>
                        </ReactView>
                    </View>
                </View>
                {
                    load ? (
                        <>
                            <ReactView style={{ height: "100%", width: "100%", top: 0, bottom: 0, position: 'absolute', backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                            </ReactView>
                            {!load2 ? (
                                <ReactView style={{ width: "90%", height: 90, backgroundColor: "white", borderRadius: 10, padding: 10 }}>
                                    <TouchableOpacity onPress={() => {
                                        setLoad2(true);
                                    }}>
                                        <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                            Delete It
                                        </ReactText>
                                    </TouchableOpacity>
                                </ReactView>

                            ) : (
                                <ReactView style={{ width: "90%", height: 90, backgroundColor: "white", borderRadius: 10, padding: 10 }}>
                                    <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Are you sure for delete it?
                                    </ReactText>
                                    <ReactView style={{ flexDirection: direction.direction, alignItems: direction.start, width: "100%" }}>
                                        <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                                            setLoad(false);
                                            setLoad2(false);
                                        }}>
                                            <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                                Yes
                                            </ReactText>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                                            setLoad(false);
                                            setLoad2(false);
                                        }}>
                                            <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                                No
                                            </ReactText>
                                        </TouchableOpacity>
                                    </ReactView>
                                </ReactView>
                            )}
                        </>
                    ) : (<></>)
                }
            </View>
        </SafeAreaView>
    )
}