import React, { useState, useEffect, useContext } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, TouchableOpacity, Text, ScrollView } from "../../components/Themed";
import { ActivityIndicator, I18nManager, Image, StyleSheet, useColorScheme, View as ReactView , TouchableOpacity as Touch} from "react-native";
import WordsContext from "../../src/lang/wordsContext";
import directionContext from "../../src/direction/directionContext";
import { doc, getDoc } from "firebase/firestore";
import auth, { db } from "../../firebase/config/firebase-config";
import Love from "../../src/components/Love";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TheData() {
    const Languages = useContext(WordsContext);
    const { id, from } = useLocalSearchParams();
    const [user, setUser] = useState(auth.currentUser);
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
        console.log(id)
        setvalueData([]);
        setTempLoved([]);
        const load = async () => {
            const UserRef = doc(db, id, '0');
            const docSnap = await getDoc(UserRef);
            console.log(docSnap.data())
            if (auth?.currentUser) {
                const UserRefLike = doc(db, "Users", user?.uid);
                const docSnapLike = await getDoc(UserRefLike);
                const LikeArray = docSnapLike.data().Love;
                if (docSnap.data() != undefined) {
                    const num = docSnap.data().number;
                    const array = docSnap.data().DataList;
                    for (let index = num; index >= 1; index--) {
                        const value = array[index];
                        const UserRefNew = doc(db, id, value);
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
                    for (let index = num; index >= 1; index--) {
                        const value = array[index];
                        const UserRefNew = doc(db, id, value);
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
        <View style={{ flex: 1 }}>
            <Stack.Screen  options={{
                headerLeft: () => {
                    if (Languages.lang === 'en') {
                        if (!I18nManager.isRTL) {
                            return <Touch style={{ alignItems: 'center' }} onPress={() => {
                                router.replace("/Home");
                                router.back();

                            }}>
                                <Image source={require('../../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23 }} />
                            </Touch>
                        }
                    } else {
                        if (I18nManager.isRTL) {
                            return <Touch style={{ alignItems: 'center' }} onPress={() => {
                                router.replace("/Home");
                                router.back();

                            }}>
                                <Image source={require('../../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                            </Touch>
                        }
                    }
                },
                headerRight: () => {
                    if (Languages.lang === 'ar') {
                        if (!I18nManager.isRTL) {
                            return <Touch style={{ alignItems: 'center' }} onPress={() => {
                                router.replace("/Home");
                                router.back()
                            }}>
                                <Image source={require('../../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                            </Touch>
                        }
                    } else {
                        if (I18nManager.isRTL) {
                            return <Touch style={{ alignItems: 'center' }} onPress={() => {
                                router.replace("/Home");
                                router.back()
                            }}>
                                <Image source={require('../../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '0deg' }] }} />
                            </Touch>
                        }
                    }
                },
                headerTitle: () => {
                    return <ReactView style={{ width: "85%", marginLeft: 23 }}>
                        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                            البيانات
                        </Text>
                    </ReactView>
                },
                headerBackVisible: (I18nManager.isRTL)?false:false
            }} />
            <ScrollView style={{
                width: "100%",
                transform: [{ scaleX: (direction.lang == 'ar') ? -1 : 1 }]
            }} >
                {(item.length == 0) ? (
                    <>
                        <LoadTheValue />
                    </>
                ) : (<>
                </>)
                }

                {(item.length == 0) ? (
                    <>

                    </>
                ) : (
                    item.map((value, key) => {
                        return (
                            <View style={[styles.marksscroll, {
                                transform: [{ scaleX: (direction.lang == 'ar') ? -1 : 1 }],
                                height: 210,
                            }]} key={key}>
                                <TouchableOpacity onPress={() => {
                                    nav(value);
                                }}
                                    style={{
                                        height: "100%", flexDirection: direction.direction
                                    }}
                                >
                                    <View style={{ width: "45%", height: "100%", alignItems: direction.end }}>
                                        <Image style={{ width: 170, height: 200, borderTopRightRadius: (Languages.lang == 'ar') ? 5 : 0, borderBottomRightRadius: (Languages.lang == 'ar') ? 5 : 0, borderTopLeftRadius: (Languages.lang == 'ar') ? 0 : 5, borderBottomWidth: 0, borderColor: 'gray', borderWidth: 0.5 }} source={{ uri: value.Photo[0] }} />
                                    </View>
                                    <View style={{
                                        width: "55%",
                                        height: "95%",
                                        alignItems: 'center',
                                        borderWidth: 0.5,
                                        borderColor: 'gray',
                                        // borderBottomLeftRadius: 5,
                                        // borderBottomRightRadius: 5,
                                        borderLeftWidth: 0
                                    }}>

                                        <View style={{ flexDirection: direction.direction, justifyContent: 'space-between', alignItems: "center", width: '95%', height: "15%" }}>
                                            <View style={{ width: "80%" }}>
                                                <Text style={[styles.markstext, { color: "red" }]}>{parseFloat(value.Price).toLocaleString(Languages.lang)} {Languages.EGP}</Text>
                                            </View>
                                            <Love likeArray={likeArray} dataSort={dataLoved} num={key} />
                                        </View>
                                        <View style={{ margin: 5, width: "95%", }}>
                                            <Text style={styles.markstext} numberOfLines={2}>{(value.Adtitle)}</Text>
                                        </View>
                                        <View style={{ flexDirection: direction.direction, alignItems: "center", width: '95%', height: "15%" }}>
                                            <View style={{ flexDirection: Languages.direction, justifyContent: 'space-between', alignItems: "center", }}>
                                                <Image style={{ width: 15, height: 15 }} source={require('../../src/assets/bedempty.png')} tintColor={(color == "light") ? "black" : 'white'} />
                                                <Text style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}>
                                                    {parseInt(value.Bedrooms).toLocaleString(Languages.lang)}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: Languages.direction, justifyContent: 'space-between', alignItems: "center", marginRight: 5, marginLeft: 5 }}>
                                                <Image style={{ width: 15, height: 15 }} source={require('../../src/assets/Bathroom.png')} tintColor={(color == "light") ? "black" : 'white'} />
                                                <Text style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}>
                                                    {parseInt(value.Bathrooms).toLocaleString(Languages.lang)}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: Languages.direction, justifyContent: 'space-between', alignItems: "center" }}>
                                                <Image style={{ width: 15, height: 15 }} source={require('../../src/assets/area.png')} tintColor={(color == "light") ? "black" : 'white'} />
                                                <Text style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}>
                                                    {parseInt(value.Area).toLocaleString(Languages.lang)}
                                                </Text>
                                                <Image style={{ width: 18, height: 18, }} source={require('../../src/assets/m2.png')} tintColor={(color == "light") ? "black" : 'white'} />
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 8, width: "95%" }}>
                                            <Text style={[styles.markstext, { fontSize: 13, textDecorationStyle: 'dotted', width: "100%", height: 35, maxHeight: 35 }]} numberOfLines={2}>{(value.Location)}</Text>
                                        </View>
                                        <View style={{ width: "95%", marginTop: 10 }}>
                                            <Text style={[styles.markstext, { fontSize: 13, textDecorationStyle: 'dotted', width: "100%", color: 'gray' }]} numberOfLines={1}>{(value.Date)}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        )
                    }
                    )
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    marksscroll: {
        alignItems: "center",
        // width: 200,
        height: 250,
        margin: 10,
        marginTop: 5,
        marginBottom: 0,
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
