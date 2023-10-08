import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageEdit } from "../../components/Themed";
// import * as  Location from 'expo-location';
import WordsContext from '../../src/lang/wordsContext';
import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { firebase } from "../../firebase/config/firebase-config";
import directionContext from '../../src/direction/directionContext';


export default function location() {
    const val = useLocalSearchParams();
    const [city, setCity] = useState([]);
    const [location, setlocation] = useState([]);
    const [load, setLoad] = useState(false);
    const [backLocation, setBacklocation] = useState([]);
    const [memoryLocation, setMemoryLocation] = useState([]);
    const [TheLocationSelected, setTheLocationSelected] = useState([]);
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);
    const LocationAr = [
        // { name: "أسوان", val: "أسوان, مصر" },
        // { name: "الاسكندرية", val: "الاسكندرية, مصر" },
        // { name: "أسيوط", val: "أسيوط, مصر" },
        // { name: "البحيرة", val: "البحيرة, مصر" },
        // { name: "بني سويف", val: "بني سويف, مصر " },
        { name: "القاهرة", val: "القاهرة، مصر" },
        // { name: "الدقهلية", val: "الدقهلية, مصر" },
        // { name: "دمياط", val: "دمياط, مصر" },
        // { name: "الفيوم", val: "الفيوم, مصر" },
        // { name: "الغربية", val: "الغربية, مصر" },
        // { name: "الجيزة", val: "الجيزة, مصر" },
        // { name: "الإسماعيلية", val: "الإسماعيلية, مصر" },
        // { name: "كفر الشيخ", val: "كفر الشيخ، مصر" },
        // { name: "الأقصر", val: "الأقصر, مصر" },
        // { name: "مطروح", val: "مطروح, مصر" },
        // { name: "المنيا", val: "المنيا, مصر" },
        // { name: "المنوفية", val: "المنوفية, مصر" },
        // { name: "الوادي الجديد", val: "الوادي الجديد, مصر" },
        // { name: "بورسعيد", val: "بورسعيد, مصر" },
        // { name: "القليوبية", val: "القليوبية, مصر" },
        // { name: "قنا", val: "قنا, مصر" },
        // { name: "البحر الأحمر", val: "البحر الأحمر, مصر" },
        // { name: "الشرقية", val: "الشرقية, مصر" },
        // { name: "سوهاج", val: "سوهاج, مصر" },
        // { name: "جنوب سيناء", val: "جنوب سيناء, مصر" },
        // { name: "السويس", val: "السويس, مصر" }
    ]
    const LocationEn = [
        // { name: "Alexandria", val: "Alexandria, Egypt" },
        // { name: "Aswan", val: "Aswan, Egypt" },
        // { name: "Asyut", val: "Asyut, Egypt" },
        // { name: "Beheira", val: "Beheira, Egypt" },
        // { name: "BeniSuef", val: "Beni Suef, Egypt" },
        { name: "Cairo", val: "Cairo, Egypt" },
        // { name: "Dakahlia", val: "Dakahlia, Egypt" },
        // { name: "Damietta", val: "Damietta, Egypt" },
        // { name: "Fayoum", val: "Fayoum, Egypt" },
        // { name: "Gharbia", val: "Gharbia, Egypt" },
        // { name: "Giza", val: "Giza, Egypt" },
        // { name: "Ismailia", val: "Ismailia, }Egypt" },
        // { name: "KafrAlSheikh", val: "Kafr al- Sheikh, Egypt" },
        // { name: "Luxor", val: "Luxor, Egypt" },
        // { name: "Matruh", val: "Matruh, Egypt" },
        // { name: "Minya", val: "Minya, Egypt" },
        // { name: "Monufia", val: "Monufia, Egypt" },
        // { name: "NewValley", val: "New Valley, Egypt" },
        // { name: "PortSaid", val: "Port Said, Egypt" },
        // { name: "Qalyubia", val: "Qalyubia, Egypt" },
        // { name: "Qena", val: "Qena, Egypt" },
        // { name: "RedSea", val: "Red Sea, Egypt" },
        // { name: "Sharqia", val: "Sharqia, Egypt" },
        // { name: "Sohag", val: "Sohag, Egypt" },
        // { name: "SouthSinai", val: "South Sinai, Egypt" },
        // { name: "Suez", val: "Suez, Egypt" }
    ]
    useEffect(() => {

    }, []);


    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry must permision');
        }
        let location = await Location.getCurrentPositionAsync();
        console.log(JSON.stringify(location));
        const GeocodeLocation = await Location.reverseGeocodeAsync({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        });
        setCity(GeocodeLocation);
    }

    const updateLocation = async () => {
        if (city.length == 0) {
            setLoad(false);
            alert(Languages.lang == 'en' ? 'Try again' : 'اعد المحاولة')
        } else {
            EventRegister.emit('Location', (city[0].subregion + ' , ' + city[0].region).toString());
            const list = setTimeout(() => {
                setLoad(false);
                router.back();
            }, 3000)
            return () => {
                clearTimeout(list)
            }
        }
    }

    const LocationView = () => {
        if (Languages.lang == 'ar') {
            return (
                LocationAr.map((value, key) =>
                (<TouchableOpacity style={{ width: '100%', alignItems: 'center', height: 30, marginTop: 5, marginBottom: 5, justifyContent: 'center', flexDirection: direction.direction }} key={key} onPress={() => {
                    selectRegion(value.name);
                }}>
                    <View style={{ width: '45%', alignItems: direction.start }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {value.val}
                        </Text>
                    </View>
                    <View style={{ width: '45%', alignItems: direction.end }}>
                        <ImageEdit
                            source={require("../../src/assets/right-arrow.png")}
                            style={{ width: 13, height: 13, transform: [{ rotate: (Languages.lang == 'en') ? '0deg' : '180deg' }] }} />
                    </View>
                </TouchableOpacity>)
                )
            )
        } else {
            return (
                LocationEn.map((value, key) =>
                (<TouchableOpacity style={{ width: '100%', alignItems: 'center', height: 30, marginTop: 5, marginBottom: 5, justifyContent: 'center', flexDirection: direction.direction }} key={key} onPress={() => {
                    selectRegion(value.name);
                }}>
                    <View style={{ width: '45%', alignItems: direction.start }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {value.val}
                        </Text>
                    </View>
                    <View style={{ width: '45%', alignItems: direction.end }}>
                        <ImageEdit
                            source={require("../../src/assets/right-arrow.png")}
                            style={{ width: 13, height: 13, transform: [{ rotate: (Languages.lang == 'en') ? '0deg' : '180deg' }] }} />
                    </View>
                </TouchableOpacity>)
                )
            )
        }
    }

    const selectRegion = async (value) => {
        setLoad(true);
        if (memoryLocation.length == 0) {
            try {
                const snapshot = await firebase.firestore().collection('Location').get();
                if (Languages.lang === 'ar') {
                    if (snapshot.docs[0].data().ar[value] != undefined) {
                        console.log(snapshot.docs[0].data().ar[value]);
                        setlocation(snapshot.docs[0].data().ar[value]);
                        setMemoryLocation(snapshot.docs[0].data().ar[value]);
                        setBacklocation([...backLocation, ...[snapshot.docs[0].data().ar[value]]]);
                        setTheLocationSelected([...TheLocationSelected, ...[[{ name: value }]]]);
                    }
                }
                if (Languages.lang === 'en') {
                    if (snapshot.docs[0].data().en[value] != undefined) {
                        console.log(snapshot.docs[0].data().en.value);
                        console.log(snapshot.docs[0].data().en[value]);
                        setMemoryLocation(snapshot.docs[0].data().en[value]);
                        setBacklocation([...backLocation, ...[snapshot.docs[0].data().ar[value]]]);
                        setTheLocationSelected([...TheLocationSelected, ...[[{ name: value }]]]);
                    }
                }
            } catch (error) {
                alert('Please try again...');
                setLoad(false);
            }
        } else {
            setlocation(memoryLocation);
        }
        setLoad(false);
    }

    const SubLocationView = ({ Array }) => {
        return (
            Array?.map((value, key) =>
            (<TouchableOpacity style={{ width: '100%', alignItems: 'center', height: 30, marginTop: 5, marginBottom: 5, justifyContent: 'center', flexDirection: direction.direction }} key={key} onPress={() => {
                if (value.val.length != 0) {
                    setBacklocation([...backLocation, ...[location]]);
                    setTheLocationSelected([...TheLocationSelected, ...[[{ name: value.name }]]]);
                    setlocation(value.val);
                } else {
                    if (val[0] == undefined) {
                        setLoad(true);
                        let theloc = '';
                        for (let index = 0; index < TheLocationSelected.length; index++) {
                            if(index == 0){
                                theloc = ((TheLocationSelected[index])[0]).name + theloc;
                            }else{
                                theloc = theloc+ ' , ' + ((TheLocationSelected[index])[0]).name ;
                            }
                        }
                        const place = value.name;
                        EventRegister.emit('Location', (theloc+' , '+place).toString());
                        const list = setTimeout(() => {
                            setLoad(false);
                            router.back();
                        }, 3000)
                        return () => {
                            clearTimeout(list)
                        }
                    } else {
                        let theloc = '';
                        setLoad(true);
                        for (let index = 0; index < TheLocationSelected.length; index++) {
                            if(index == 0){
                                theloc = ((TheLocationSelected[index])[0]).name + theloc;
                            }else{
                                theloc = theloc+ ' , ' + ((TheLocationSelected[index])[0]).name ;
                            }
                        }
                        const place = value.name;
                        EventRegister.emit('Loc', (theloc+' , '+place).toString());
                        const list = setTimeout(() => {
                            setLoad(false);
                            router.back();
                        }, 3000)
                        return () => {
                            clearTimeout(list)
                        }
                    }
                }
            }}>
                <View style={{ width: '45%', alignItems: direction.start }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        {value.name}
                    </Text>
                </View>
                {
                    (value.val.length != 0) ? (
                        <View style={{ width: '45%', alignItems: direction.end }}>
                            <ImageEdit
                                source={require("../../src/assets/right-arrow.png")}
                                style={{ width: 13, height: 13, transform: [{ rotate: (Languages.lang == 'en') ? '0deg' : '180deg' }] }} />
                        </View>
                    ) : (
                        <View style={{ width: '45%', alignItems: direction.end }}>
                            <Text></Text>
                        </View>
                    )
                }
            </TouchableOpacity>)
            )
        )
    }

    const Back = () => {
        try {
            if (backLocation.length > 0) {
                TheLocationSelected.pop();
                setlocation(backLocation.pop());
            } else {
                setlocation([]);
            }
        } catch (err) {
            console.log(err + 'ghahfsda');
        }
    }

    if (location.length == 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity style={{ width: '90%', backgroundColor: 'red', height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 8 }}
                    onPress={async () => {
                        setLoad(true);
                        await userLocation()
                        await updateLocation();
                    }} >
                    <Text>
                        {Languages.GetLocation}
                    </Text>
                </TouchableOpacity>
                <ScrollView style={{ width: "100%", marginTop: 20 }}>
                    <LocationView />
                </ScrollView>
                {
                    load ? (
                        <View style={{ height: "100%", width: "100%", top: 0, bottom: 0, position: 'absolute', backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size={50} color={'#ff3a3a'} />
                        </View>
                    ) : (<></>)
                }
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity style={{ width: '90%', backgroundColor: 'red', height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 8 }}
                    onPress={async () => {
                        setLoad(true);
                        await userLocation()
                        await updateLocation();
                    }} >
                    <Text>
                        {Languages.GetLocation}
                    </Text>
                </TouchableOpacity>
                <View style={{ width: "90%", marginTop: 15, flexDirection: direction.direction }}>
                    <TouchableOpacity style={{ width: 60, height: 35, backgroundColor: 'red', borderRadius: 10, marginTop: 15, alignItems: 'center', justifyContent: "center" }} onPress={() => {
                        Back();
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {Languages.Back}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ width: "100%", marginTop: 20 }}>
                    <SubLocationView Array={location} />
                </ScrollView>
                {
                    load ? (
                        <View style={{ height: "100%", width: "100%", top: 0, bottom: 0, position: 'absolute', backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size={50} color={'#ff3a3a'} />
                        </View>
                    ) : (<></>)
                }
            </View>
        )
    }
}