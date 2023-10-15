import React, { useContext, useState } from "react";
import { View, Text } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, useColorScheme, View as ReactView, TouchableOpacity, Text as ReactText } from "react-native";
import WordsContext from "../../src/lang/wordsContext";
import directionContext from "../../src/direction/directionContext";



export default function MyAds() {
    const colorScheme = useColorScheme();
    const [load, setLoad] = useState(false);
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
                <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-evenly", alignItems: "center" }}>
                    <ImageLogo />
                </View>
                <View style={{ width: "100%", flexDirection: 'row' }}>
                    <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                        <ReactView style={{ height: 50 }}>
                            <Text style={{ width: "100%", fontSize: 15, fontWeight: "bold" }}>
                                My Ads
                            </Text>
                        </ReactView>
                    </View>
                    {/* <View style={{ width: "50%", alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ width: "100%", height: 50 }}>
                            <Text style={{ width: "100%", fontSize: 15, fontWeight: "bold" }}>
                                My Love
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={{ width: "90%", alignItems: "center" }}>
                    <View style={{ width: "100%", height: 40, backgroundColor: 'gray', flexDirection: direction.direction, alignItems: "center", justifyContent: 'space-around' }}>
                        <ReactView style={{ width: "80%" }}>
                            <Text>
                                From: 28 Oct 22
                            </Text>
                        </ReactView>
                        <TouchableOpacity style={{ width: "10%" }} onPress={() => {
                            setLoad(true);
                        }}>
                            <ReactView style={{ width: 4, height: 4, borderRadius: 50, backgroundColor: 'black', marginBottom: 2 }} />
                            <ReactView style={{ width: 4, height: 4, borderRadius: 50, backgroundColor: 'black', marginBottom: 2 }} />
                            <ReactView style={{ width: 4, height: 4, borderRadius: 50, backgroundColor: 'black', marginBottom: 2 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", flexDirection: direction.direction, justifyContent: 'space-between' }} >
                        <View style={{ width: "52%" }}>
                            <Image source={require('../../src/assets/house1.jpeg')} />
                        </View>
                        <View style={{ width: "47%", justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={3}>
                                some Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Data
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={2}>
                                some Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Data
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }} numberOfLines={1}>
                                some Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Datasome Data
                            </Text>
                        </View>
                    </View>
                </View>
                {
                    load ? (
                        <>
                            <ReactView style={{ height: "100%", width: "100%", top: 0, bottom: 0, position: 'absolute', backgroundColor: 'gray', opacity: 0.5, alignItems: "center", justifyContent: "center" }}>
                            </ReactView>
                            <ReactView style={{ width: "90%", height: 200, backgroundColor: "white", opacity: 1 }}>
                                <TouchableOpacity onPress={() => {
                                    setLoad(false);
                                }}>
                                    <ReactText>
                                        Delete It
                                    </ReactText>
                                </TouchableOpacity>
                            </ReactView>
                        </>
                    ) : (<></>)
                }
            </View>
        </SafeAreaView>
    )
}