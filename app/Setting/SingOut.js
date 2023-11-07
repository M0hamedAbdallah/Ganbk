import React, { useContext } from "react";
import { useState, useEffect } from 'react'
import { StyleSheet, Image, TouchableOpacity, useColorScheme, ActivityIndicator } from "react-native";
import { View, Text } from "../../components/Themed";
import auth from "../../firebase/config/firebase-config";
import auth2 from "@react-native-firebase/auth";
import { Redirect, router, useNavigation } from "expo-router";
import * as Google from '@react-native-google-signin/google-signin'
import { signOut } from "firebase/auth";
import WordsContext from "../../src/lang/wordsContext";
import { EventRegister } from "react-native-event-listeners";
import Modal from "react-native-modal";

export default function index() {
    const color = useColorScheme();
    const Languages = useContext(WordsContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [init, setInit] = useState(true);
    const [user, setUser] = useState();


    Google.GoogleSignin.configure({});
    const nav = useNavigation();


    const signOut_ = async () => {
        try {
            await signOut(auth);
            await auth2().signOut().catch((error) => {
                console.log(error);
            });
            setUser(null);
            EventRegister.emit('ReLoad', Math.random() * 1000);
            router.replace('/Home');
            router.back();
            await Google.GoogleSignin.revokeAccess();
            return (
                <Redirect href={'/Home'} />
            );
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <Modal style={{ flex: 1 }} isVisible={isModalVisible}>
                <View style={{ width: "100%", height: "100%", backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator size={50} color={'#ff3a3a'} />
                </View>
            </Modal>
            <View style={{ width: "100%", height: "20%", alignItems: 'center' }}>
                <TouchableOpacity style={styles.ButtonContainer} onPress={() => {
                    setIsModalVisible(true);
                    signOut_()
                }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                        {Languages.signOut}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
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