import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, useColorScheme, View as ReactView, TouchableOpacity, Text as ReactText, ScrollView, Alert, Button } from "react-native";
import WordsContext from "../../src/lang/wordsContext";
import directionContext from "../../src/direction/directionContext";
import auth, { db } from "../../firebase/config/firebase-config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firebase } from "../../firebase/config/firebase-config";
import { getStorage, ref } from "firebase/storage";
import Modal from "react-native-modal";
import { EventRegister } from "react-native-event-listeners";


export default function MyAds() {
    const colorScheme = useColorScheme();
    const [count, setcount] = useState(0);
    const [load2, setLoad2] = useState(false);
    const [MyAds, setMyAds] = useState([]);
    const [MyAdsDetails, setMyAdsDetails] = useState([]);
    const [valueData, setvalueData] = useState([]);
    const [deleteIt, setDeleteIt] = useState({});
    const [indexItem, setindexItem] = useState(-1);
    const [value, setValue] = useState(0);
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

    const ReLoad = async (v) => {
        setValue(v + 1);
    }


    useEffect(() => {
        setvalueData([]);
        const login = async () => {
            const wa = await new Promise(async (r, e) => {
                const UserRef = doc(db, "Users", auth?.currentUser?.uid);
                const docSnap = await getDoc(UserRef);
                const data = docSnap.data();
                setMyAds((data.MyAds));
            })
            setTimeout(() => {
                setValue(value + 1);
            }, 0);
        }
        if (auth?.currentUser) {
            login()
        }
        Promise.all(login);
    }, [count])

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
        const login = () => {
            MyAds?.map(async ({ from, num }) => {
                firebase.firestore().doc('/' + from + '/' + num).onSnapshot((value) => {
                    if (value.data() != undefined) {
                        valueData.push(value.data());
                    }
                })
            })
            setMyAdsDetails(valueData);
        }
        login();
    }, [count])

    const DeleteTheAds = async (dataSended) => {
        try {
            const Ad = (dataSended?.Photo)?.map(async (ImageUri, index) => {
                const Sended = await new Promise(async (resolve, reject) => {
                    firebase.storage().refFromURL(ImageUri).delete().then(async () => {
                        if (index == (dataSended?.Photo)?.length - 1) {
                            console.log(ImageUri, index);
                            const theAdsD = MyAds[indexItem];
                            const UserRef = doc(db, theAdsD?.from, "0");
                            const docSnap = await getDoc(UserRef);
                            if (docSnap.data() != undefined) {
                                const num = parseInt(docSnap.data().number);
                                const array = docSnap.data().DataList;
                                const arrayDeleted = docSnap.data().Deleted;
                                const UserRef1 = doc(db, theAdsD?.from, theAdsD?.num);
                                console.log(array,"the array");
                                console.log(arrayDeleted,"the arrayDeleted");
                                console.log(theAdsD?.num,"the num");
                                arrayDeleted.push(theAdsD?.num);
                                arrayDeleted.sort((a, b) => a - b);
                                array.splice(parseInt(theAdsD?.num), 1);
                                console.log("---------------------");
                                console.log(array,"the array");
                                console.log(arrayDeleted,"the arrayDeleted");
                                await updateDoc(UserRef, {
                                    number: (num - 1),
                                    DataList: array,
                                    Deleted: arrayDeleted
                                })
                                await deleteDoc(UserRef1);
                            }
                            const UserRef2 = doc(db, "Users", auth?.currentUser?.uid);
                            const docSnap2 = await getDoc(UserRef2);
                            const data = docSnap2.data();
                            const NewData = data.MyAds;
                            const NewData1 = NewData.filter((value) => {
                                console.log(value.num);
                                console.log(theAdsD?.num);
                                console.log(value.from);
                                console.log(theAdsD?.from);
                                return ((value.num != theAdsD?.num) || (value.from != theAdsD?.from));
                            })
                            console.log(NewData1);
                            await updateDoc(UserRef2, {
                                MyAds: NewData1
                            }).then(() => {
                                setIsModalVisible(!isModalVisible);
                                setLoad2(false);
                                setValue(value + 1);
                            })
                        }
                    }).catch((e) => {
                        console.log(e);
                    })
                })
            })
            Promise.all(Ad);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: (colorScheme == 'dark') ? 'black' : 'white' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-evenly", alignItems: "center" }}>
                    <ImageLogo />
                </View>
                <View style={{ width: "100%", flexDirection: 'row' }}>
                    <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                        <ReactView style={{ height: 50, flexDirection: direction.direction, width: "90%", justifyContent: "space-between" , alignItems:"center"}}>
                            <TouchableOpacity onPress={() => {
                                if (count != null) {
                                    setcount(count - 1);
                                }
                            }}>
                                <Image source={require("../../src/assets/reload.png")} style={{ width: 25, height: 25 }} tintColor={(colorScheme == 'dark') ? 'white' : 'black'} />
                            </TouchableOpacity>
                            <View style={{ width: "20%", }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                    My Ads
                                </Text>
                            </View>
                        </ReactView>
                    </View>
                </View>
                <Modal isVisible={isModalVisible}>
                    <ReactView style={{ flex: 1 }}>
                        {!load2 ? (
                            <ReactView style={{ height: "100%", width: "100%", alignItems: 'center', justifyContent: 'center', }}>
                                <ReactView style={{ width: "90%", backgroundColor: "white", borderRadius: 10, padding: 10 }}>
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                                        setLoad2(true);
                                    }}>
                                        <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                            Delete It
                                        </ReactText>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ padding: 10 }} onPress={() => {
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

                                <ReactView style={{ width: "90%", backgroundColor: "white", borderRadius: 10, padding: 10 }}>
                                    <ReactText style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Are you sure for delete it?
                                    </ReactText>
                                    <ReactView style={{ flexDirection: direction.direction, alignItems: direction.start, width: "100%" }}>
                                        <TouchableOpacity style={{ padding: 10 }} onPress={async () => {
                                            await DeleteTheAds(deleteIt);
                                            handleModal();
                                            setLoad2(false);
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
                                        setDeleteIt(value);
                                        setindexItem(index);
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