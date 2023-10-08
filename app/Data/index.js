import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageEdit } from "../../components/Themed";
import { Image, ScrollView, useColorScheme, View as ReactView, Linking } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import WordsContext from "../../src/lang/wordsContext";
import directionContext from "../../src/direction/directionContext";
import SliderBox from './SliderBox'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import auth, { db, firebase } from "../../firebase/config/firebase-config";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";

export default function Data() {
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);
    const color = useColorScheme();
    const [Data, setData] = useState({});
    const [DataTemp, setDataTemp] = useState([]);
    const [bool, setbool] = useState(false);
    const [user, setUser] = useState();
    useEffect(() => {
        // console.log(Data.uid);
        const DAtaSet = async () => {
            const item = await AsyncStorage.getItem('@DataAds');
            if (item != null) {
                setData(JSON.parse(item));
            }
            if (Data.uid != null) {
                console.log(Data)

                const user = doc(db, 'Users', Data.uid)
                const userInfo = await getDoc(user);
                if (userInfo.data() != null) {
                    setUser(userInfo.data());
                }
            }
        }
        console.log(user)
        DAtaSet();
    }, [])


    useEffect(() => {
        const user = async () => {

            if (Data.uid != null) {
                console.log(Data.uid)
                const user = doc(db, 'Users', Data.uid)
                const userInfo = await getDoc(user);
                if (userInfo.data() != null) {
                    setUser(userInfo.data());
                }
            }
        }

        user();
    }, [Data])



    const DataVeiw = () => {
        if (Data != undefined && Data != null) {
            return (
                <View style={{ width: "100%", alignItems: "center" }}>
                    <SliderBox Images={Data.Photo} />
                </View>
            )
        } else {
            return (
                <View style={{ width: "100%", height: 200, alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
                        {Languages.NoThing}
                    </Text>
                </View>
            )
        }
    }

    const Chat = async () => {
        if (auth?.currentUser) {
            if (auth?.currentUser?.uid == Data?.uid) {
                console.log('Cant Chat with your self');
            } else {
                console.log('Chat Now');
                console.log(auth?.currentUser?.uid)
                console.log(Data?.uid)
                const ChatWithUser = collection(db,
                    '/Users/' + auth?.currentUser?.uid + "/Chats"
                );
                const v1 = doc(db, '/Users/' + auth?.currentUser?.uid + "/Chats", Data?.uid);
                await setDoc(v1, {
                    Message: "...",
                    Name: user?.firstName,
                    Image: user?.ImageUser,
                    toUser: Data?.uid,
                    show: true,
                    chatGroup: auth?.currentUser?.uid + Data?.uid,
                    createAt: firebase.firestore.FieldValue.serverTimestamp(),
                })
                const v2 = doc(db, '/Users/' + Data?.uid + "/Chats", auth?.currentUser?.uid);
                await setDoc(v2, {
                    Message: "...",
                    Name: auth?.currentUser?.displayName,
                    Image: auth?.currentUser?.photoURL,
                    toUser: auth?.currentUser?.uid,
                    show: false,
                    chatGroup: auth?.currentUser?.uid + Data?.uid,
                    createAt: firebase.firestore.FieldValue.serverTimestamp(),
                })
                router.replace('/Chat');
                router.back();
            }
        } else {
            router.push('/Login');
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: (color == 'dark') ? 'black' : 'white' }}>
            <ScrollView style={{ width: "100%" }}>
                <DataVeiw />
                <View style={{ width: "100%", alignItems: 'center', marginTop: 15 }}>
                    <View style={{ width: "90%", marginBottom: 5, marginTop: 10, alignItems: direction.start }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Languages.EGP} {parseFloat(Data.Price).toLocaleString(Languages.lang)}
                        </Text>
                    </View>
                </View>
                <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: "90%", marginBottom: 5, marginTop: 10, alignItems: direction.start }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Data.Adtitle}
                        </Text>
                    </View>
                </View>
                <View style={{ width: "100%", alignItems: 'center', marginTop: 10, flexDirection: direction.direction, justifyContent: 'space-evenly' }}>
                    <View style={{ width: "47%", marginBottom: 5, marginTop: 10, flexDirection: direction.direction }}>
                        <View style={{ width: '20%', justifyContent: 'center', alignItems: direction.start }}>
                            <ImageEdit source={require('../../src/assets/marker.png')} style={{ width: 20, height: 20 }} />
                        </View>
                        <View style={{ width: '80%', }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Data.Location}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "40%", marginBottom: 5, marginTop: 10, flexDirection: direction.direction, justifyContent: Languages.end }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                            {Data.Date}
                        </Text>
                    </View>
                </View>
                <View style={{ width: "100%", alignItems: "center", marginTop: 10 }} lightColor="#eee" darkColor="#404040">
                    <ReactView style={{ width: "90%", marginTop: 15 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Languages.Details}
                        </Text>
                    </ReactView>
                    <ReactView style={{ width: "90%", marginTop: 15, flexDirection: direction.direction }}>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages.Type}:
                            </Text>
                        </ReactView>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {((Languages[Data.Type])?.toLowerCase())?.charAt(0).toUpperCase() + ((Languages[Data.Type])?.toLowerCase())?.slice(1)}
                            </Text>
                        </ReactView>
                    </ReactView>
                    <ReactView style={{ width: "90%", marginTop: 15, flexDirection: direction.direction }}>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages.Area}:
                            </Text>
                        </ReactView>
                        <ReactView style={{ width: "50%", flexDirection: direction.direction }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {parseInt(Data.Area)?.toLocaleString(Languages.lang)}
                            </Text>
                        </ReactView>
                    </ReactView>
                    <ReactView style={{ width: "90%", marginTop: 15, flexDirection: direction.direction }}>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages.Bedrooms}:
                            </Text>
                        </ReactView>
                        <ReactView style={{ width: "50%", flexDirection: direction.direction }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {parseInt(Data.Bedrooms)?.toLocaleString(Languages.lang)}
                            </Text>
                        </ReactView>
                    </ReactView>
                    <ReactView style={{ width: "90%", marginTop: 15, flexDirection: direction.direction }}>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages.Bathrooms}:
                            </Text>
                        </ReactView>
                        <ReactView style={{ width: "50%", flexDirection: direction.direction }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {parseInt(Data.Bathrooms)?.toLocaleString(Languages.lang)}
                            </Text>
                        </ReactView>
                    </ReactView>
                    <ReactView style={{ width: "90%", marginTop: 15, flexDirection: direction.direction }}>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages.Level}:
                            </Text>
                        </ReactView>
                        <ReactView style={{ width: "50%", flexDirection: direction.direction }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {parseInt(Data.Level).toLocaleString(Languages.lang)}
                            </Text>
                        </ReactView>
                    </ReactView>
                    <ReactView style={{ width: "90%", marginTop: 15, flexDirection: direction.direction }}>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages.Furnished}:
                            </Text>
                        </ReactView>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages[Data.Furnished]}
                            </Text>
                        </ReactView>
                    </ReactView>
                    <ReactView style={{ width: "90%", marginTop: 15, flexDirection: direction.direction }}>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages.PaymentOption}:
                            </Text>
                        </ReactView>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages[Data.PaymentOption]}
                            </Text>
                        </ReactView>
                    </ReactView>
                    <ReactView style={{ width: "90%", marginTop: 15, flexDirection: direction.direction }}>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages.DeliveryDate}:
                            </Text>
                        </ReactView>
                        <ReactView style={{ width: "50%", flexDirection: direction.direction }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Data.DeliveryDate}
                            </Text>
                        </ReactView>
                    </ReactView>
                    <ReactView style={{ width: "90%", marginTop: 15, marginBottom: 15, flexDirection: direction.direction }}>
                        <ReactView style={{ width: "50%" }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages.DeliveryTerm}:
                            </Text>
                        </ReactView>
                        <ReactView style={{ width: "50%", flexDirection: direction.direction }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {Languages[Data.DeliveryTerm]}
                            </Text>
                        </ReactView>
                    </ReactView>
                </View>
                {
                    (!bool) ?
                        (<>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10, height: 300 }}>
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                        {Languages.Description}
                                    </Text>
                                </View>
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Data.Describewhatyouareselling}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginBottom: 5, marginTop: 10 }}>
                                <TouchableOpacity style={{ width: "90%", marginBottom: 5, marginTop: 10 }} onPress={() => {
                                    setbool(!bool);
                                }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>
                                        Read More
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        )
                        :
                        (<>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                        {Languages.Description}
                                    </Text>
                                </View>
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Data.Describewhatyouareselling}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginBottom: 5, marginTop: 10 }}>
                                <TouchableOpacity style={{ width: "90%", marginBottom: 5, marginTop: 10 }} onPress={() => {
                                    setbool(!bool);
                                }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'red' }}>
                                        Read Less
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        )
                }
                <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                    <View style={{ width: "90%", height: 1, backgroundColor: 'black' }} />
                    <View style={{ width: "90%", marginBottom: 5, marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {Languages.Amenities}
                        </Text>
                    </View>
                    <View style={{ flexDirection: direction.direction, paddingHorizontal: 20, marginBottom: 20, flexWrap: 'wrap' }}>

                        {
                            (Data.Amenities)?.map((item, index) => {
                                return (
                                    <View key={index} style={[{ paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5, marginRight: 10, marginTop: 10, borderColor: (color == 'dark') ? "white" : "black", borderWidth: 1 }]}>
                                        <Text style={[{ fontSize: 15, fontWeight: 'bold' }]}>{item}</Text>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>
                {
                    (user) ?
                        (
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                <View style={{ width: "90%", height: 1, backgroundColor: 'black' }} />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Languages.Publisher}
                                    </Text>
                                </View>
                                <View style={{ width: "80%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {user.firstName}
                                    </Text>
                                </View>
                                <View style={{ width: "80%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Data.phone}
                                    </Text>
                                </View>
                                <View style={{ width: "80%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {user.BirthDate}
                                    </Text>
                                </View>
                            </View>
                        )
                        :
                        (null)
                }
            </ScrollView >
            <View style={{ width: "100%", borderTopColor: 'black', borderTopWidth: 1, paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: direction.direction, justifyContent: "space-between", width: "90%" }}>
                    <TouchableOpacity style={{ flexDirection: 'row-reverse', width: "45%", height: 50, backgroundColor: 'red', alignItems: "center", justifyContent: 'center', borderRadius: 5 }} onPress={() => {
                        Linking.openURL(`tel:${Data?.phone}`)
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                            {Languages.Call}
                        </Text>
                        <ImageEdit style={{ width: 20, height: 20, marginRight: 10 }} source={require('../../src/assets/phoneCall.png')} tintColor={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row-reverse', width: "45%", height: 50, backgroundColor: '#555555', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderColor: 'red', borderWidth: 1, }}
                        onPress={() => {
                            Chat();
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                            {Languages.Chat}
                        </Text>
                        <ImageEdit style={{ width: 20, height: 20, marginRight: 10 }} source={require('../../src/assets/chatCall.png')} tintColor={'red'} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}