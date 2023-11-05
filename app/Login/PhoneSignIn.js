// import React, { useState, useEffect } from 'react';
// import { Button, TextInput } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { View } from '../../components/Themed';

// export default function PhoneSignIn() {
//     // If null, no SMS has been sent
//     const [confirm, setConfirm] = useState(null);

//     // verification code (OTP - One-Time-Passcode)
//     const [code, setCode] = useState('');

//     // Handle login
//     function onAuthStateChanged(user) {
//         if (user) {
//             // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
//             // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
//             // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
//             // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
//         }
//     }

//     useEffect(() => {
//         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//         return subscriber; // unsubscribe on unmount
//     }, []);

//     // Handle the button press


//     async function confirmCode() {
//         try {
//             await confirm.confirm(code);
//         } catch (error) {
//             console.log('Invalid code.');
//         }
//     }

//     if (!confirm) {
//         return (
//             <View>
//                 <Button
//                     title="Phone Number Sign In"
//                     onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
//                 />
//             </View>
//         );
//     }

//     return (
//         <>
//             <TextInput value={code} onChangeText={text => setCode(text)} />
//             <Button title="Confirm Code" onPress={() => confirmCode()} />
//         </>
//     );
// }

import React, { useContext, useState } from 'react';
import { TextInput, Button, StyleSheet, useColorScheme, Image, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from '../../components/Themed';
import WordsContext from '../../src/lang/wordsContext';
import directionContext from '../../src/direction/directionContext';
import { View, Text, } from '../../components/Themed';
import Modal from "react-native-modal";

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
        const confirmation = await auth().signInWithPhoneNumber(Number).then((confirmation) => {
            setVerificationId(confirmation.verificationId);
            console.log(confirmation.verificationId);
            setIsSending(true);
            Alert.alert('Verification code has been sent to your phone.');
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

    }

    if (!confirm) {
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
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                    />

                    <Text style={styles.label}>{Languages.email}</Text>
                    <TextInput
                        keyboardType='email-address'
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                    />

                    <Text style={styles.label}>{Languages.phone}</Text>
                    <TextInput
                        keyboardType='numeric'
                        style={styles.input}
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
                    style={styles.input}
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
        justifyContent: 'center',
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