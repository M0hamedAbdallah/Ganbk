import React, { useState, useEffect, useContext, useRef } from 'react';
import { Image, TextInput, useColorScheme, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Text, View, TouchableOpacity } from '../../components/Themed';
// import FirebaseRecaptchaVerifierModal from '../../src/src/FirebaseRecaptchaVerifierModal';
import { firebaseConfig, firebase, db } from '../../firebase/config/firebase-config'; // Replace with your Firebase config
import WordsContext from '../../src/lang/wordsContext';
import directionContext from '../../src/direction/directionContext';
import { router } from 'expo-router';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { EventRegister } from 'react-native-event-listeners';
import auth from '@react-native-firebase/auth';
import Modal from "react-native-modal";
/*
    make verification to number phone in expo react native
*/
export default function PhoneVerification() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [codeNumber, setCodeNumber] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const colorScheme = useColorScheme();
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);
    const [verificationId, setVerificationId] = useState("");
    const recaptchaVerifier = useRef(null);


    async function verify(phone) {
        try {
            const confirmationResult = await firebase.auth().signInWithPhoneNumber(
                // Replace with your phone number
                "+20" + phone,
                this.applicationVerifier
            );
            return confirmationResult;
        } catch (error) {
            console.error('Error sending verification code:', error);
            throw error;
        }
    }

    const handleSendCode = async () => {
        try {
            // const phoneProvider = new firebase.auth.PhoneAuthProvider();
            // const verificationId = await phoneProvider.verifyPhoneNumber(
            //     "+2" + phoneNumber,
            //     recaptchaVerifier.current
            // ).then((verificationIdSend) => {
            //     console.log(verificationIdSend, "");
            //     setVerificationId(verificationIdSend);
            //     setIsSending(true);
            //     setIsModalVisible(false);
            //     Alert.alert('Verification code has been sent to your phone.');
            // });
            // console.log(verificationId);

            await verifyPhoneNumber("+2" + phoneNumber);

        } catch (error) {
            console.log(error);
            Alert.alert('Failed to send verification code.');
            setIsModalVisible(false);
        }
    };

    async function verifyPhoneNumber(phoneNumber) {
        console.log(auth().currentUser);
        const confirmation = await auth().verifyPhoneNumber(phoneNumber).then((confirmation) => {
            setVerificationId(confirmation.verificationId);
            console.log(confirmation.verificationId);
            setIsSending(true);
            setIsModalVisible(false);
            Alert.alert('Verification code has been sent to your phone.');
        });
        // setConfirm(confirmation);
    }
    const handleVerifyCode = async (verificationCode) => {
        try {
            console.log(verificationId);
            console.log(verificationCode);
            const user = firebase.auth().currentUser;
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            )
            await firebase.auth().currentUser.updatePhoneNumber(credential).then(async () => {
                const UserRef = doc(db, "Users", firebase.auth().currentUser.uid);
                await updateDoc(UserRef, {
                    phone: phoneNumber,
                });
                const docv = doc(db, "NumbersPhones", phoneNumber);
                await setDoc(docv, {}).then(() => {
                    Alert.alert('Phone number updated successfully.');
                    setIsModalVisible(false);
                    router.back();
                    EventRegister.emit('Back', true);
                });
            });
        } catch (error) {
            console.log(error);
            setIsModalVisible(false);
            Alert.alert('Failed to update phone number.');
        }
    };


    const sendnumber1 = async () => {
        const phoneNumberExists = await firebase.firestore().collection("NumbersPhones").doc(phoneNumber).get();
        if (phoneNumberExists.exists) {
            alert("الرقم موجود بالفعل");
            setIsModalVisible(false);
            return false;
        } else {
            handleSendCode();
        }
    }



    const CheckPhone = (num) => {
        let val = true;
        if (phoneNumber == "") {
            alert("الرجاء ادخال رقم الهاتف");
            val = false;
            setIsModalVisible(false);
            return false;
        }
        if (num.length != 11) {
            alert("رقم الهاتف غير صحيح");
            val = false;
            setIsModalVisible(false);
            return false;
        }
        if (((num[0] + num[1] + num[2]) != "010") &&
            ((num[0] + num[1] + num[2]) != "011") &&
            ((num[0] + num[1] + num[2]) != "012") &&
            ((num[0] + num[1] + num[2]) != "015")) {
            console.log((num[0] + num[1] + num[2]));
            alert("رقم الهاتف غير صحيح");
            val = false;
            setIsModalVisible(false);
            return false;
        }
        if (val) {
            setIsModalVisible(false);
            return true;
        }
        setIsModalVisible(false);
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

    if (!isSending) {
        return (
            <View style={{ flex: 1 }}>
                <Modal style={{ flex: 1 }} isVisible={isModalVisible}>
                    <View style={{ width: "100%", height: "100%", backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size={50} color={'#ff3a3a'} />
                    </View>
                </Modal>
                {/* <FirebaseRecaptchaVerifierModal
                    style={{
                        alignItems: 'center',
                        justifyContent: "center",
                        flex: 1,
                        backgroundColor: "black"
                    }}
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                /> */}
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
                                keyboardType='numeric'
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                        </View>
                    </View>
                    <View style={{ width: "100%", height: "20%", alignItems: 'center' }}>
                        <TouchableOpacity style={styles.ButtonContainer} onPress={async () => {
                            setIsModalVisible(true);
                            const val = CheckPhone(phoneNumber);
                            if (val) {
                                await sendnumber1();
                            }
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                                {Languages.Send}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View style={{ flex: 1 }}>
                <Modal style={{ flex: 1 }} isVisible={isModalVisible}>
                    <View style={{ width: "100%", height: "100%", backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size={50} color={'#ff3a3a'} />
                    </View>
                </Modal>
                <View style={{ flexDirection: direction.direction, width: "100%", justifyContent: "space-evenly", marginTop: 50, alignItems: "center" }}>
                    <ImageLogo />
                </View>
                <View style={{ width: "100%", height: "80%", marginTop: 30 }}>
                    <View style={{ width: "100%", alignItems: 'center' }}>
                        <View style={{ width: "90%" }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                {Languages.sendOTP}
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
                                keyboardType='numeric'
                                value={codeNumber}
                                onChangeText={setCodeNumber}
                            />
                        </View>
                    </View>
                    <View style={{ width: "100%", height: "20%", alignItems: 'center' }}>
                        <TouchableOpacity style={styles.ButtonContainer} onPress={async () => {
                            if (codeNumber == "") {
                                alert("الرجاء ادخال رمز التحقق");
                            } else {
                                setIsModalVisible(true);
                                await handleVerifyCode(codeNumber);
                            }
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                                {Languages.Conf}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

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