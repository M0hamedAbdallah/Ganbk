import React, { useState, useEffect, useContext, useReducer, useRef } from 'react';
import { Image, TextInput, useColorScheme, StyleSheet, ActivityIndicator } from 'react-native';
// import auth from '@react-native-firebase/auth';
import auth, { db, firebase } from '../../firebase/config/firebase-config';
import { Text, View, TouchableOpacity } from '../../components/Themed';
import WordsContext from '../../src/lang/wordsContext';
import directionContext from '../../src/direction/directionContext';
import { router } from 'expo-router';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { EventRegister } from 'react-native-event-listeners';
import Modal from "react-native-modal";

export default function PhoneSignIn() {
    // If null, no SMS has been sent
    const [Phone, setPhone] = useState("");
    const [v, setV] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const colorScheme = useColorScheme();
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);


    const sendnumber1 = async () => {
        firebase.firestore().collection("NumbersPhones").onSnapshot(async ({ docs }) => {
            docs.map((value) => {
                if (value.id == Phone) {
                    setV(false);
                    alert("الرقم موجود بالفعل");
                    setIsModalVisible(!isModalVisible);
                    console.log(value.id, Phone)
                }
            })
        })
    }

    const sendnumber2 = async () => {
        try {
            const UserRef = doc(db, "Users", auth?.currentUser?.uid);
            await updateDoc(UserRef, {
                phone: Phone,
            });
            const doo = collection(db, '/NumbersPhones');
            const docv = doc(db, "NumbersPhones", Phone);
            await setDoc(docv, {}).then(() => {
                alert("تم");
                router.back();
                EventRegister.emit('Back', true);
            });
        } catch (e) {
            console.log(e);
        }
    }

    const sendnumber = async () => {
        setV(!v);
        setIsModalVisible(!isModalVisible);
        await sendnumber1().then(async() => {
            if(v){
                await sendnumber2().then(()=>{
                    setIsModalVisible(!isModalVisible);
                });
            }
        })
    }

    const CheckPhone = (num) => {
        let val = true;
        if (Phone == "") {
            alert("الرجاء ادخال رقم الهاتف");
            val = false;
            return false;
        }
        if (num.length != 11) {
            alert("رقم الهاتف غير صحيح");
            val = false;
            return false;
        }
        if (((num[0] + num[1] + num[2]) != "010") &&
            ((num[0] + num[1] + num[2]) != "011") &&
            ((num[0] + num[1] + num[2]) != "012") &&
            ((num[0] + num[1] + num[2]) != "015")) {
            console.log((num[0] + num[1] + num[2]));
            alert("رقم الهاتف غير صحيح");
            val = false;
            return false;
        }
        if (val) {
            return true;
        }
    }

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

    return (
        <>
            <Modal style={{ flex: 1 }} isVisible={isModalVisible}>
                <View style={{ width: "100%", height: "100%", backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size={50} color={'#ff3a3a'} />
                </View>
            </Modal>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: direction.direction, width: "100%", justifyContent: "space-evenly", marginTop: 50, alignItems: "center" }}>
                    <ImageLogo />
                </View>
                <View style={{ width: "100%", height: "80%", marginTop: 30 }}>
                    <View style={{ width: "100%", alignItems: 'center' }}>
                        <View style={{ width: "90%" }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.phone}
                            </Text>
                        </View>
                        <View style={{ width: "90%", borderRadius: 6 }}>
                            <TextInput style={{
                                width: "100%",
                                height: 45,
                                fontSize: 18,
                                paddingLeft: 10,
                                paddingRight: 10,
                                borderColor: 'gray',
                                borderRadius: 5,
                                borderWidth: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: (colorScheme == 'dark') ? 'white' : 'black'
                            }}
                                value={Phone}
                                onChangeText={setPhone}
                            />
                        </View>
                    </View>
                    <View style={{ width: "100%", height: "20%", alignItems: 'center' }}>
                        <TouchableOpacity style={styles.ButtonContainer} onPress={() => {
                            const val = CheckPhone(Phone);
                            if (val) {
                                sendnumber();
                            }
                            console.log(val)
                            console.log(Phone.length)
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                                {Languages.Send}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    ButtonContainer: {
        width: "85%",
        height: 50,
        backgroundColor: "#e93333",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 5,
        marginTop: 20,
    }
});