import React, { useContext } from "react";
import { View, Text } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, useColorScheme, View as ReactView } from "react-native";
import WordsContext from "../../src/lang/wordsContext";
import directionContext from "../../src/direction/directionContext";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function MyAds() {
    const colorScheme = useColorScheme();
    const Lungaues = useContext(WordsContext);
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
        <SafeAreaView style={{ flex: 1, backgroundColor: (colorScheme == 'dark') ? 'black' : 'white' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-evenly" , alignItems: "center" }}>
                    <ImageLogo />
                </View>
                <View style={{ width: "100%", flexDirection: 'row' }}>
                    <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ width: "100%", height: 50 }}>
                            <Text style={{ width: "100%", fontSize: 15, fontWeight: "bold" }}>
                                My Ads
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ width: "50%", alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ width: "100%", height: 50 }}>
                            <Text style={{ width: "100%", fontSize: 15, fontWeight: "bold" }}>
                                My Love
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={{ width: "90%" }}>
                    <View style={{ width: "100%", height: 40, backgroundColor: 'gray', flexDirection: "row", alignItems: "center", justifyContent: 'space-around' }}>
                        <ReactView style={{ width: "80%" }}>
                            <Text>
                                From: 28 Oct 22
                            </Text>
                        </ReactView>
                        <ReactView style={{ width: "10%" }}>
                            <Text>
                                DO
                            </Text>
                        </ReactView>
                    </View>
                    <View>
                        <View style={{}}>
                            <Image source={require('../../src/assets/house1.jpeg')} />
                        </View>
                        <View style={{}}>
                            <Text>
                                some Data
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}