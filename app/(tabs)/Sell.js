import React, { useContext } from "react";
import { useEffect, useState, memo } from 'react';
import { View, Text, TouchableOpacity, ImageEdit } from "../../components/Themed";
import { StyleSheet, Image, useColorScheme } from "react-native";
import { router } from "expo-router";
import wordsContext from '../../src/lang/wordsContext';
import directionContext from '../../src/direction/directionContext';

function index() {
    const colorScheme = useColorScheme(wordsContext);
    const Lungaues = useContext(wordsContext);
    const direction = useContext(directionContext);
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
        <View style={styles.container}>
            <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-evenly", marginTop: 50, alignItems: "center" }}>
                <ImageLogo />
            </View>
            <TouchableOpacity onPress={()=> router.push('/Details/Properties')}>
                <View style={{ flexDirection: direction.direction, alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: 20 }}>
                    <View style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                        <Image source={require('../../src/assets/HomeShape.png')} style={{ width: 50, height: 50 }} />
                    </View >
                    <View style={{ width: "70%" }}>
                        <Text style={{ fontSize: 15 }}>
                            {Lungaues.Properties}
                        </Text>
                    </View>
                    <View style={{ width: "10%" ,alignItems:'center',transform:[{rotate:(Lungaues.lang=='en')?'0deg':'180deg'}]}}>
                        <ImageEdit source={require('../../src/assets/right-arrow.png')} style={{ width: 15, height: 15 }}
                            lightColor="black"
                            darkColor="white" />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> null}>
                <View style={{ flexDirection: direction.direction, alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: 20 }}>
                    <View style={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                        <Image source={require('../../src/assets/car.png')} style={{ width: 50, height: 50 }} />
                    </View >
                    <View style={{ width: "70%" }}>
                        <Text style={{ fontSize: 15 }}>
                        {Lungaues.cars}
                        </Text>
                    </View>
                    <View style={{ width: "10%" ,alignItems:'center',transform:[{rotate:(Lungaues.lang=='en')?'0deg':'180deg'}]}}>
                        <ImageEdit source={require('../../src/assets/right-arrow.png')} style={{ width: 15, height: 15 }}
                            lightColor="black"
                            darkColor="white" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    }
})


export default memo(index);