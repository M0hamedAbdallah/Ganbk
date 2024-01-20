import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, } from "../../components/Themed";
import WordsContext from "../../src/lang/wordsContext";
import { ScrollView, SafeAreaView, StyleSheet, Image, FlatList, ImageBackground, useWindowDimensions, useColorScheme, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SliderBox from '../../src/components/SliderBox.js';
import directionContext from "../../src/direction/directionContext";
import auth from "../../firebase/config/firebase-config";
import { db, firebase, storage } from "../../firebase/config/firebase-config";
import * as FileSystem from 'expo-file-system';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { router } from "expo-router";


export default function Search() {
    const [arr, setArr] = useState([]);
    const [load, setLoad] = useState(false);
    const user = auth.currentUser;
    const width = useWindowDimensions().width;
    const color = useColorScheme();
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);
    const [Phone, setPhone] = useState("");
    const [Data, setData] = useState({});
    const [value, setvalue] = useState(0);
    const [value2, setvalue2] = useState(false);
    const [toggle, setToggle] = useState(false);
    const Load = async () => {
        const Data = await AsyncStorage.getItem('@Data');
        const data = JSON.parse(Data);
        if (data != undefined && data != null) {
            setData(data);
        }
        const UserRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(UserRef);
        setPhone((docSnap.data().phone) ? docSnap.data().phone : '')
    }

    useEffect(() => {
    }, [value2]);
    console.log(arr);

    useEffect(() => {
        Load();
    }, [value])

    const ImageUri = async () => {
        const name = user.uid;
        const uploadTasks = (Data.Photo)?.map(async (item) => {
            const { uri } = await FileSystem.getInfoAsync(item);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response)
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'));
                }
                xhr.responseType = 'blob'
                xhr.open('GET', uri, true)
                xhr.send(null);
            })
            const filename = await (item.split('/').pop()).split('.jpeg');
            const ref = firebase.storage().ref().child('VillasForSale/' + (filename[0] + name).toString());
            const snapshot = await ref.put(blob);
            const downloadURL = await snapshot.ref.getDownloadURL();
            arr.push(downloadURL);

        })
        if (value2 == 0) {
            setvalue2(1)
        } else {
            setvalue2(0)
        }

        return Promise.all(uploadTasks);
    }


    const AdToAdmin = async () => {
        const UserRef = doc(db, "VillasForSaleAdmin", '0');
        const docSnap = await getDoc(UserRef);
        console.log(docSnap.data().number);
        console.log(arr)
        if (docSnap.data() != undefined) {
            const Deleted = docSnap.data().Deleted;
            const DataList = docSnap.data().DataList;
            if (Deleted.length == 0) {
                const num = (docSnap.data().number + 1);
                const UserRef2 = doc(db, "VillasForSaleAdmin", num.toString());
                await setDoc(UserRef2, {
                    uid: user.uid,
                    phone: Phone,
                    Photo: arr,
                    Price: Data.Price,
                    Negotiable: Data.Negotiable,
                    Type: Data.Type,
                    DownPayment: Data.DownPayment,
                    Area: Data.Area,
                    Amenities: Data.Amenities,
                    Bedrooms: Data.Bedrooms,
                    Bathrooms: Data.Bathrooms,
                    Furnished: Data.Furnished,
                    PaymentOption: Data.PaymentOption,
                    DeliveryDate: Data.DeliveryDate,
                    DeliveryTerm: Data.DeliveryTerm,
                    Location: Data.Location,
                    Adtitle: Data.Adtitle,
                    Describewhatyouareselling: Data.Describewhatyouareselling,
                    Date: Data.date + '/' + Data.month + '/' + Data.year
                });
                await updateDoc(UserRef, {
                    number: num,
                    DataList: [...DataList,(num).toString()]
                });
            }else{
                const num = (docSnap.data().number + 1);
                const val = Deleted.sort(function(a, b){return a - b});
                const UserRef2 = doc(db, "VillasForSaleAdmin", (val[0]).toString());
                await setDoc(UserRef2, {
                    uid: user.uid,
                    phone: Phone,
                    Photo: arr,
                    Price: Data.Price,
                    Negotiable: Data.Negotiable,
                    Type: Data.Type,
                    DownPayment: Data.DownPayment,
                    Area: Data.Area,
                    Amenities: Data.Amenities,
                    Bedrooms: Data.Bedrooms,
                    Bathrooms: Data.Bathrooms,
                    Furnished: Data.Furnished,
                    PaymentOption: Data.PaymentOption,
                    DeliveryDate: Data.DeliveryDate,
                    DeliveryTerm: Data.DeliveryTerm,
                    Location: Data.Location,
                    Adtitle: Data.Adtitle,
                    Describewhatyouareselling: Data.Describewhatyouareselling,
                    Date: Data.date + '/' + Data.month + '/' + Data.year
                });
                DataList.push((val[0]).toString());
                DataList.sort(function(a, b){return a - b});
                val.splice(0,1);
                await updateDoc(UserRef, {
                    number: num,
                    DataList: DataList,
                    Deleted: val
                });
            }
        }
        setLoad(false);
    }

    const Upload = async () => {
        if (Phone != '' && Phone != null && Phone != undefined) {
            setLoad(true);
            await ImageUri().then(async (results) => {
                await AdToAdmin().then((res) => {
                    setLoad(false);
                    alert(Languages.AdsUpload);
                    router.replace({ pathname: '/Home' });
                    router.back();
                });
            });
        } else {
            alert(Languages.PhoneMising)
        }
    }

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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <ScrollView style={{ width: "100%", marginTop: 20 }}>
                    <DataVeiw />
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.price} : {Data.Price}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Negotiable} : {(Data.Negotiable) ? Languages.YES : Languages.NO}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Type} : {Languages[Data.Type]}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.DownPayment} : {Data.DownPayment}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Area} : {Data.Area}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Amenities} :
                            </Text>
                        </View>
                        {
                            (Data.Amenities)?.map((info, index) => {
                                return (
                                    <View style={{ flexDirection: direction.direction, marginVertical: 10, alignItems: 'center' }} key={index}>
                                        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: (color == 'light') ? "black" : "white", marginLeft: 10, marginRight: 10 }} />
                                        <Text>
                                            {info}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Bedrooms} : {Data.Bedrooms}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Bathrooms} : {Data.Bathrooms}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Furnished} : {Languages[Data.Furnished]}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.PaymentOption} : {Languages[Data.PaymentOption]}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.DeliveryDate} : {Data.DeliveryDate}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.DeliveryTerm} : {Languages[Data.DeliveryTerm]}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Location} : {Data.Location}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Adtitle} : {Data.Adtitle}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Describewhatyouareselling} : {Data.Describewhatyouareselling}
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                        <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                        <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.Date} : {Data.date}/{Data.month}/{Data.year}
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                <TouchableOpacity style={{ backgroundColor: 'red', height: 40, alignItems: 'center', justifyContent: 'center', width: "90%", borderRadius: 5, marginBottom: 20, marginTop: 20 }} onPress={() => {
                    Upload();
                }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        Upload
                    </Text>
                </TouchableOpacity>

                {
                    load ? (
                        <View style={{ height: "100%", width: "100%", top: 0, bottom: 0, position: 'absolute', backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size={50} color={'#ff3a3a'} />
                        </View>
                    ) : (<></>)
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 45,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})