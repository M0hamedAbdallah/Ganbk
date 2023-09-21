import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "../../components/Themed";
import { TextInput, StyleSheet, Animated, Dimensions, Image, useColorScheme } from "react-native";
import Items from "../../src/components/Item";
import Boxs from "../../src/components/boxs";
import WordsContext from "../../src/lang/wordsContext";
import { router } from "expo-router";
import { EventRegister } from 'react-native-event-listeners';
import directionContext from "../../src/direction/directionContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    const [images, setImages] = useState(
        [
            {
                uri: require('../../src/assets/A1.jpg')
            },
            {
                uri: require('../../src/assets/A2.jpg')
            },
            {
                uri: require('../../src/assets/A3.jpg')
            },
            {
                uri: require('../../src/assets/A1.jpg')
            },
        ]
    );
    const [imageCount, setImageCount] = useState(0);
    const slideLeft = new Animated.Value(imageCount);
    const [location, setlocation] = useState('Egypt');
    const { width } = Dimensions.get('screen')
    const color = useColorScheme();
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);

    useEffect(() => {
        slideLeft.setValue(imageCount);
        Animated.timing(slideLeft, {
            toValue: imageCount + 1,
            duration: 3000,
            useNativeDriver: true,
            delay: 3000,
        }).start(() => {
            setImageCount(((imageCount + 1) % 3));
        });
    },);

    useEffect(() => {
        const lis = EventRegister.addEventListener('Location', (data) => {
            setlocation(data);
        })
        return () => {
            EventRegister.removeEventListener('Location');
        }
    },)


    const getTransformStyle = (index) => {
        const translateX = slideLeft.interpolate({
            inputRange: [0, 1],
            outputRange: [index * width, (index - 1) * width],
        });

        return {
            transform: [{ translateX }],
            zIndex: index === imageCount ? 1 : 0,
        };

    };


    function ImageLogo() {
        if (color == 'light') {
            return (
                <Image source={require("../../src/assets/Ganbk.png")}
                    resizeMode="center"
                    style={{ width: 60, height: 60 }}
                />
            )
        } else if (color == 'dark') {
            return (
                <Image source={require("../../src/assets/GanbkDark.png")}
                    resizeMode="center"
                    style={{ width: 60, height: 60 }}
                />
            )
        }
    }


    return (
        <SafeAreaView style={[styles.container,{backgroundColor:'white'}]}>
            <ScrollView style={styles.container}>
                <View style={{
                    width: "100%",
                    alignItems: 'center'
                }}>
                    <View style={{ width: "99%", alignItems: 'center', marginTop: 10, flexDirection: direction.direction, justifyContent: 'space-between' }} >
                        <View style={{ width: '20%', alignItems: 'center' }}>
                            <ImageLogo />
                        </View>
                        <View style={{ width: "70%", height: 50, alignItems: direction.end, }}>
                            <TouchableOpacity style={{ height: 50, alignItems: 'center', borderRadius: 8, flexDirection: direction.direction, padding: 10, justifyContent: "center" }}
                                onPress={() => {
                                    router.push('/Location/')
                                }}
                            >
                                <Image source={require('../../src/assets/marker.png')} style={{ width: 20, height: 20 }} />
                                <Text style={{ fontSize: 15, fontWeight: 'bold', paddingLeft: 10, paddingRight: 10 }} >{Languages[location] || location}</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                                    <Image source={require('../../src/assets/angleSmallDown.png')} style={{ width: 15, height: 15 }} tintColor={color == 'dark' ? 'white' : 'black'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: "96%", alignItems: 'center', marginTop:5, flexDirection: direction.direction, justifyContent: 'space-between' }} >

                        <TouchableOpacity style={{ width: "60%", height: 45, alignItems: 'center', justifyContent: "space-evenly", borderRadius: 8, flexDirection: direction.direction, borderColor: (color == 'dark') ? 'white' : 'black', borderWidth: 2 }}
                            onPress={() => {
                                router.push('/Search/')
                            }}
                        >
                            <Image source={require('../../src/assets/search.png')} style={{ width: 20, height: 20 }} tintColor={color == 'light' ? 'black' : 'white'} />
                            <Text style={{ fontSize: 15, fontWeight: '900' }}>
                                {Languages.Whatareyoulookingfor}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "35%", height: 45, alignItems: 'center', justifyContent: "space-evenly", flexDirection: direction.direction }}
                            onPress={() => {
                            }}
                        >
                            <Image source={require('../../src/assets/commentsQuestion.png')} style={{ width: 20, height: 20 }} />
                            <Text style={{ fontSize: 15, fontWeight: '900' }}>
                                {Languages.forAds}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: "100%",
                        marginTop: 10,
                        backgroundColor: "#ffffff",

                    }}>
                        <View style={{
                            width: "100%",
                            flexDirection: direction.direction,
                            justifyContent: 'space-around'
                        }}>
                            <View style={{ width: '45%', justifyContent: 'center', alignItems: direction.start }}>
                                <Text style={[styles.text, { fontSize: 20 }]}>
                                    {Languages.ExploreCategories}
                                </Text>
                            </View>
                            <View style={{ width: '45%', justifyContent: 'center', alignItems: direction.end }}>
                                <Text style={styles.text}>
                                    {Languages.SeeAll}
                                </Text>
                            </View>
                        </View>
                        <Items />
                    </View>
                    <View style={{ width: '100%', height: 150, backgroundColor: "#ffffff" }}>
                        {images.map((image, i) => (
                            <Animated.Image
                                key={i}
                                source={image.uri}
                                style={[
                                    { width: "100%", height: "100%", position: 'absolute', top: 0, left: 0 },
                                    getTransformStyle(i),
                                ]}
                            />
                        ))}
                    </View>
                    <View style={{
                        width: "100%",
                        marginTop: 10,
                        backgroundColor: "#ffffff"
                    }}>
                        <View style={{
                            width: "100%",
                            flexDirection: direction.direction,
                            justifyContent: 'space-around'
                        }}>
                            <View style={{ width: '45%', justifyContent: 'center', alignItems: direction.start }}>
                                <Text style={[styles.text, { fontSize: 20 }]}>
                                    {Languages.VillasForSale}
                                </Text>
                            </View>
                            <View style={{ width: '45%', justifyContent: 'center', alignItems: direction.end }}>
                                <Text style={styles.text}>
                                    {Languages.SeeAll}
                                </Text>
                            </View>
                        </View>
                        <Boxs />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
    }
});