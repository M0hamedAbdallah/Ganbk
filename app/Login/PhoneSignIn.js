import React, { useContext, useState } from 'react';
import { TextInput,  StyleSheet, useColorScheme, Image, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import auth2, { firebase } from '../../firebase/config/firebase-config';
import { TouchableOpacity } from '../../components/Themed';
import WordsContext from '../../src/lang/wordsContext';
import directionContext from '../../src/direction/directionContext';
import { View, Text, } from '../../components/Themed';
import Modal from "react-native-modal";
import { router } from 'expo-router';
import { EventRegister } from 'react-native-event-listeners';

export default function PhoneSignIn() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const colorScheme = useColorScheme();
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);

    async function signInWithPhoneNumber(Number) {
        const confirmation = await auth().signInWithPhoneNumber(Number).then((confir) => {
            setVerificationId(confir.verificationId);
            console.log(confir.verificationId, "verificationId");
            setIsSending(true);
            alert('Verification code has been sent to your phone.');
            setIsModalVisible(false);
        }).catch((error) => {
            alert("Try again later");
            console.log(error);
            setIsModalVisible(false);
        });
    }

    function isValidName(name) {
        // Check if the name contains only letters, spaces, and is between 2 and 50 characters.
        const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
        return nameRegex.test(name);
    }

    const CheckPhone = (num) => {
        let val = true;
        if (phoneNumber == "") {
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

    const handlePhoneVerification = async () => {
        // TODO: Implement phone number verification using Firebase
        if (isValidName(name)) {
            if (isValidEmail(email)) {
                if (CheckPhone(phoneNumber)) {
                    setIsModalVisible(true);
                    await signInWithPhoneNumber("+2" + phoneNumber);
                }
            } else {
                alert("Email is not valid.");
            }
        } else {
            alert("the name contains only letters, spaces, and is between 2 and 50 characters");
        }


    };

    function isValidEmail(email) {
        // Check if the email is in a valid format.
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
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

    const handleOtpVerification = async () => {
        //sgin with phone number by firebase with credentials
        try {
            // Sign in with phone number using credentials
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                code
            );
            await firebase.auth().signInWithCredential(credential).then(async () => {
                await firebase.auth().currentUser.updateProfile({
                    displayName: name,
                    email: email
                })
                setIsModalVisible(false);
                alert("تم التسجيل بنجاح");
                router.back();
                EventRegister.emit('Back2', true);
            });
            // Handle successful sign in
            // ...
        } catch (error) {
            console.log(error);
        }
    }

    if (!isSending) {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Modal style={{ flex: 1 }} isVisible={isModalVisible}>
                        <View style={{ width: "100%", height: "100%", backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                            <ActivityIndicator size={50} color={'#ff3a3a'} />
                        </View>
                    </Modal>
                    <View style={{ flexDirection: direction.direction, width: "100%", justifyContent: "space-evenly", marginTop: 50, alignItems: "center" }}>
                        <ImageLogo />
                    </View>
                    <Text style={styles.label}>{Languages.name}</Text>
                    <TextInput
                        style={[styles.input, { color: (colorScheme == 'dark') ? "white" : "black" }]}
                        onChangeText={setName}
                        value={name}
                    />

                    <Text style={styles.label}>{Languages.email}</Text>
                    <TextInput
                        keyboardType='email-address'
                        style={[styles.input, { color: (colorScheme == 'dark') ? "white" : "black" }]}
                        onChangeText={setEmail}
                        value={email}
                    />

                    <Text style={styles.label}>{Languages.phone}</Text>
                    <TextInput
                        keyboardType='numeric'
                        style={[styles.input, { color: (colorScheme == 'dark') ? "white" : "black" }]}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                    />

                    <TouchableOpacity style={styles.button} onPress={handlePhoneVerification}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                            {Languages.Sign}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Modal style={{ flex: 1 }} isVisible={isModalVisible}>
                    <View style={{ width: "100%", height: "100%", backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size={50} color={'#ff3a3a'} />
                    </View>
                </Modal>
                <View style={{ flexDirection: direction.direction, width: "100%", justifyContent: "space-evenly", marginTop: 50, alignItems: "center" }}>
                    <ImageLogo />
                </View>

                <Text style={styles.label}>{Languages.sendOTP}</Text>
                <TextInput
                    keyboardType='numeric'
                    style={[styles.input, { color: (colorScheme == 'dark') ? "white" : "black" }]}
                    onChangeText={setCode}
                    value={code}
                />

                <TouchableOpacity style={styles.button} onPress={handleOtpVerification}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                        {Languages.Conf}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    button: {
        backgroundColor: '#ff0000',
        padding: 16,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});