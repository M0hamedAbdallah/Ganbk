import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, useColorScheme, View as ReactView, TouchableOpacity, Text as ReactText, ScrollView, Alert, Button } from "react-native";
import WordsContext from "../../src/lang/wordsContext";
import directionContext from "../../src/direction/directionContext";
import auth, { db } from "../../firebase/config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { firebase } from "../../firebase/config/firebase-config";
import Modal from "react-native-modal";


export default function MyAds() {
    const colorScheme = useColorScheme();
    const [load, setLoad] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [MyAds, setMyAds] = useState([]);
    const [MyAdsVersion, setMyAdsVersion] = useState([]);
    const [MyAdsDetails, setMyAdsDetails] = useState([]);
    const [value, setValue] = useState(0);
    const [plus, setPlus] = useState(0);
    const [plus1, setPlus1] = useState(0);
    const Lungaues = useContext(WordsContext);
    const direction = useContext(directionContext);
    const Languages = useContext(WordsContext);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
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
            const UserRef = doc(db, "Users", auth?.currentUser?.uid);
            const docSnap = await getDoc(UserRef);
            const data = docSnap.data();
            setMyAds((data.MyAds));
            // setMyAdsDetails([]);
            return Math.round() * 1000;
        }
        if (auth?.currentUser) {
            setPlus(
                login()
            )
        }
        return login;
    }, [value])



    useEffect(() => {
        const login = () => {
            MyAds?.map(async ({ from, num }) => {
                firebase.firestore().doc('/' + from + '/' + num).onSnapshot((value) => {
                    MyAdsDetails.push(value.data());
                    // console.log(value.data())

                })
            })
            return Math.round() * 1000;
        }
        // if (MyAdsDetails.length == 0) {
        setPlus1(
            login()
        );
        // }
        console.log(MyAdsDetails)
        return login;
    }, [])


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
                <Modal isVisible={isModalVisible}>
                    <ReactView style={{ flex: 1 }}>
                        {!load2 ? (
                            <ReactView style={{ height: "100%", width: "100%", alignItems: 'center', justifyContent: 'center', }}>
                                <ReactView style={{ width: "90%", height: 90, backgroundColor: "white", borderRadius: 10, padding: 10 }}>
                                    <TouchableOpacity onPress={() => {
                                        setLoad2(true);
                                    }}>
                                        <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                            Delete It
                                        </ReactText>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        handleModal();
                                    }}>
                                        <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                            Cancel
                                        </ReactText>
                                    </TouchableOpacity>
                                </ReactView>
                            </ReactView>

                        ) : (
                            <ReactView style={{ height: "100%", width: "100%", alignItems: 'center', justifyContent: 'center', }}>

                                <ReactView style={{ width: "90%", height: 90, backgroundColor: "white", borderRadius: 10, padding: 10 }}>
                                    <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Are you sure for delete it?
                                    </ReactText>
                                    <ReactView style={{ flexDirection: direction.direction, alignItems: direction.start, width: "100%" }}>
                                        <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                                            setLoad2(false);
                                            handleModal();
                                        }}>
                                            <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                                Yes
                                            </ReactText>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                                            setLoad2(false);
                                            handleModal();
                                        }}>
                                            <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                                No
                                            </ReactText>
                                        </TouchableOpacity>
                                    </ReactView>
                                </ReactView>
                            </ReactView>
                        )}
                    </ReactView>
                </Modal>
                <ScrollView style={{ width: "90%", }}>

                    {MyAdsDetails?.map((value, index) => {
                        return (

                            <View style={{ width: "100%", alignItems: "center" }} key={index}>
                                <View style={{ width: "100%", height: 40, backgroundColor: 'gray', flexDirection: direction.direction, alignItems: "center", justifyContent: 'space-around' }}>
                                    <ReactView style={{ width: "80%" }}>
                                        <Text>
                                            From: {value.Date}
                                        </Text>
                                    </ReactView>
                                    <TouchableOpacity style={{ width: "10%", alignItems: 'center' }} onPress={() => {
                                        // setLoad(true);
                                        handleModal();
                                    }}>
                                        <ReactView style={{ width: 4, height: 4, borderRadius: 50, backgroundColor: 'black', marginBottom: 2 }} />
                                        <ReactView style={{ width: 4, height: 4, borderRadius: 50, backgroundColor: 'black', marginBottom: 2 }} />
                                        <ReactView style={{ width: 4, height: 4, borderRadius: 50, backgroundColor: 'black', marginBottom: 2 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "100%", flexDirection: direction.direction, justifyContent: 'space-between', marginBottom: 20 }} >
                                    <View style={{ width: "10%", alignItems: direction.start }}>
                                        <Image source={{ uri: value?.Photo[0] }} style={{ width: 100, height: 100 }} />
                                    </View>
                                    <ReactView style={{ width: "70%", justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={3}>
                                            {
                                                value.Adtitle
                                            }
                                        </Text>
                                        <ReactView style={{ width: '100%', alignItems: direction.end }}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', }} numberOfLines={1}>
                                                {
                                                    parseInt(value.Price).toLocaleString(Languages.lang)
                                                }
                                            </Text>
                                        </ReactView>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={1}>
                                            {
                                                value.Location
                                            }
                                        </Text>

                                    </ReactView>
                                </View>
                            </View>

                        )
                    })}
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}