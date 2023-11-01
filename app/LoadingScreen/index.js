import React, { Component } from "react";
import {
    StyleSheet,
    Image,
    useColorScheme
} from "react-native";
import { useEffect } from "react";
import { View } from "../../components/Themed";
import { Redirect, router } from "expo-router";

export default function LoadingScreen() {
    const color = useColorScheme();
    function ImageLogo() {
        if (color == 'light') {
            return (
                <Image source={require("../../src/assets/Ganbk.png")}
                    resizeMode="center"
                    style={styles.image}
                />
            )
        } else if (color == 'dark') {
            return (
                <Image source={require("../../src/assets/GanbkDark.png")}
                    resizeMode="center"
                    style={styles.image}
                />
            )
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            clearTimeout(timer)
            router.replace('/Home');
        }, 2000);
        // return () => {
        // };
    }, []);

    return (
        <View style={styles.container}>
            <ImageLogo />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "70%",
        height: "70%"
    }
});