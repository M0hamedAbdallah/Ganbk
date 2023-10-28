import React, { useState, useEffect, useContext } from 'react';
import { Button, Image, TextInput, useColorScheme ,StyleSheet } from 'react-native';
// import auth from '@react-native-firebase/auth';
import { Text, View ,TouchableOpacity} from '../../components/Themed';
import WordsContext from '../../src/lang/wordsContext';
import directionContext from '../../src/direction/directionContext';

export default function PhoneSignIn() {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);
    const [Phone, setPhone] = useState("");
    const colorScheme = useColorScheme();
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);


    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');

    // Handle login
    //   function onAuthStateChanged(user) {
    //     if (user) {
    //       console.log(user)

    //       return(
    //         <>
    //         <View> 
    //             <Text>
    //                 you sign in
    //             </Text>
    //         </View>
    //         </>
    //       )
    //     }
    //   }

    //   useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    //   }, []);

    //   // Handle the button press
    //   async function signInWithPhoneNumber(phoneNumber) {
    //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    //     setConfirm(confirmation);
    //   }

    //   async function confirmCode() {
    //     try {
    //       await confirm.confirm(code);
    //     } catch (error) {
    //       console.log('Invalid code.');
    //     }
    //   }


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

    if (!confirm) {
        return (
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
                            // save();
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                                {Languages.Save}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <>
            <TextInput value={code} style={{ color: 'white' }} onChangeText={text => setCode(text)} />
            <Button title="Confirm Code" onPress={() => confirmCode()} />
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