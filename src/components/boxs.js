import React, { memo, useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "../../components/Themed";
import { ActivityIndicator, Image, StyleSheet, useColorScheme, } from "react-native";
import WordsContext from "../lang/wordsContext";
import directionContext from "../direction/directionContext";
import { doc, getDoc } from "firebase/firestore";
import auth, { db } from "../../firebase/config/firebase-config";
import Love from "./Love";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Boxs(prames) {
    const [user, setUser] = useState(auth.currentUser);
    const Languages = useContext(WordsContext);
    const color = useColorScheme();
    const direction = useContext(directionContext);

    const [likeArray, setLikeArray] = useState([]);
    const [tempLoved, setTempLoved] = useState([]);
    const [dataLoved, setDataLoved] = useState([]);
    const [value, setvalue] = useState(0);
    const [val, setVal] = useState(true);
    const [valueData, setvalueData] = useState([]);
    const [item, setItem] = useState([
    ]);

    useEffect(() => {
        setvalueData([]);
        setTempLoved([]);
        const load = async () => {
            const UserRef = doc(db, prames.value, '0');
            const docSnap = await getDoc(UserRef);
            if (auth?.currentUser) {
                const UserRefLike = doc(db, "Users", user?.uid);
                const docSnapLike = await getDoc(UserRefLike);
                const LikeArray = docSnapLike.data().Love;
                if (docSnap.data() != undefined) {
                    const num = docSnap.data().number;
                    const array = docSnap.data().DataList;
                    for (let index = num; index >= ((num - 4 < 0) ? 1 : (num - 4)); index--) {
                        const value = array[index];
                        const UserRefNew = doc(db, prames.value, value);
                        const docSnap = await getDoc(UserRefNew);
                        if (docSnap.data() != undefined) {
                            valueData.push(docSnap.data());
                        }
                        tempLoved.push(value);
                    }
                }
                setLikeArray(LikeArray);
            } else {
                if (docSnap.data() != undefined) {
                    const num = docSnap.data().number;
                    const array = docSnap.data().DataList;
                    for (let index = num; index >= ((num - 4 < 0) ? 1 : (num - 4)); index--) {
                        const value = array[index];
                        const UserRefNew = doc(db, prames.value, value);
                        const docSnap = await getDoc(UserRefNew);
                        if (docSnap.data() != undefined) {
                            valueData.push(docSnap.data());
                        }
                        tempLoved.push(value);
                    }
                }
            }
            setDataLoved(tempLoved);
            setItem(valueData);
        }
        load();
    }, [value, user])

    const nav = async (item) => {
        await AsyncStorage.removeItem('@DataAds');
        await AsyncStorage.setItem('@DataAds', JSON.stringify(item));
        const list = setTimeout(() => {
            router.push('/Data');
        }, 0)
        return () => {
            clearTimeout(list)
        }
    }


    const LoadTheValue = () => {
        setTimeout(() => {
            setVal(false)
        }, 8000)
        if (val) {
            return (
                <View style={{ width: "100%", height: 100, alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator size={40} color={'#cc4949'} />
                </View>
            )
        }
        else {
            return (
                <View style={{ width: "100%", height: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontFamily: "bold", color: 'red', alignItems: 'center', justifyContent: 'center' }}>
                        No Thing in this moment
                    </Text>
                </View>
            )
        }
    }

    return (
        <>
            {(item.length == 0) ? (
                <>
                    <LoadTheValue />
                </>
            ) : (<>
            </>)
            }
            <ScrollView horizontal={true} directionalLockEnabled={true} style={{ width: "100%", height: 260, flexDirection: 'row', transform: [{ scaleX: (direction.lang == 'ar') ? -1 : 1 }] }} >
                {(item.length == 0) ? (
                    <>

                    </>
                ) : (
                    item.map((value, key) => {
                        return (
                            <View style={[styles.marksscroll, {
                                transform: [{ scaleX: (direction.lang == 'ar') ? -1 : 1 }],
                                height: 250,
                            }]} key={key}>
                                <TouchableOpacity onPress={() => {
                                    nav(value);
                                }}
                                    style={{
                                        alignItems: 'center', height: "100%",
                                    }}
                                >
                                    <View style={{ width: "100%", height: "40%" }}>
                                        <Image style={{ width: "100%", height: 100, borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomWidth: 0, borderColor: 'gray', borderWidth: 0.5 }} source={{ uri: value.Photo[0] }} />
                                    </View>
                                    <View style={{
                                        width: "100%",
                                        height: "60%",
                                        alignItems: 'center',
                                        borderWidth: 0.5,
                                        borderColor: 'gray',
                                        borderBottomLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                        borderTopWidth: 0
                                    }}>

                                        <View style={{ flexDirection: direction.direction, justifyContent: 'space-between', alignItems: "center", width: '95%', height: "15%" }}>
                                            <View style={{ width: "80%" }}>
                                                <Text style={[styles.markstext, { color: "red" }]}>{parseFloat(value.Price).toLocaleString(Languages.lang)} {Languages.EGP}</Text>
                                            </View>
                                            <Love likeArray={likeArray} dataSort={dataLoved} num={key} />
                                        </View>
                                        <View style={{ margin: 5, width: "95%", height: "15%" }}>
                                            <Text style={styles.markstext}>{(value.Adtitle)}</Text>
                                        </View>
                                        <View style={{ flexDirection: direction.direction, alignItems: "center", width: '95%', height: "15%" }}>
                                            {
                                                (value.Bedrooms != undefined) ? (
                                                    <View style={{ flexDirection: Languages.direction, justifyContent: 'space-between', alignItems: "center", }}>
                                                        <Image style={{ width: 15, height: 15 }} source={require('../../src/assets/bedempty.png')} tintColor={(color == "light") ? "black" : 'white'} />
                                                        <Text style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}>
                                                            {parseInt(value.Bedrooms).toLocaleString(Languages.lang)}
                                                        </Text>
                                                    </View>
                                                ) : (<></>)
                                            }
                                            {
                                                (value.Bathrooms != undefined) ? (
                                                    <View style={{ flexDirection: Languages.direction, justifyContent: 'space-between', alignItems: "center", marginRight: 5, marginLeft: 5 }}>
                                                        <Image style={{ width: 15, height: 15 }} source={require('../../src/assets/Bathroom.png')} tintColor={(color == "light") ? "black" : 'white'} />
                                                        <Text style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}>
                                                            {parseInt(value.Bathrooms).toLocaleString(Languages.lang)}
                                                        </Text>
                                                    </View>
                                                ) : (<></>)
                                            }
                                            {
                                                (value.Area != undefined) ? (
                                                    <View style={{ flexDirection: Languages.direction, justifyContent: 'space-between', alignItems: "center" }}>
                                                        <Image style={{ width: 15, height: 15 }} source={require('../../src/assets/area.png')} tintColor={(color == "light") ? "black" : 'white'} />
                                                        <Text style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}>
                                                            {parseInt(value.Area).toLocaleString(Languages.lang)}
                                                        </Text>
                                                        <Image style={{ width: 18, height: 18, }} source={require('../../src/assets/m2.png')} tintColor={(color == "light") ? "black" : 'white'} />
                                                    </View>
                                                ) : (<></>)
                                            }
                                        </View>
                                        <View style={{ marginTop: 8, width: "95%", height: "20%" }}>
                                            <Text style={[styles.markstext, { fontSize: 13, textDecorationStyle: 'dotted', width: "100%", height: 35, maxHeight: 35 }]}>{(value.Location)}</Text>
                                        </View>
                                        <View style={{ width: "95%", marginTop: 10, height: "10%" }}>
                                            <Text style={[styles.markstext, { fontSize: 13, textDecorationStyle: 'dotted', width: "100%", color: 'gray' }]} t>{(value.Date)}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    )
                )}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    marksscroll: {
        width: 200,
        height: 250,
        margin: 10
    },
    marksicons: {
        width: 100,
        height: 100,
        marginRight: 8,
    },
    markstext: {
        fontWeight: "800",
        fontSize: 17,
        overflow: 'hidden',
    }
});

export default memo(Boxs);