import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, View } from "../../components/Themed";
import { FlatList, ImageBackground, useWindowDimensions, View as ReactView, Image } from "react-native";
import { useCallback } from "react";
import directionContext from "../../src/direction/directionContext";
import WordsContext from "../../src/lang/wordsContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

export default function SliderBox({ Images }) {
    const width = useWindowDimensions().width;
    const direction = useContext(directionContext);
    const Languages = useContext(WordsContext);
    const carouselRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 95 }).current;
    const onViewRef = useRef(({ changed }) => {
        if (changed[0].isViewable) {
            setActiveIndex(changed[0].index);
        }
    })

    useEffect(() => {

    }, [])
    return (<>
        <ReactView style={{ width: "100%", alignItems: direction.end }}>
            <ReactView style={{ width: "100%", alignItems: direction.start }}>
                <FlatList
                    data={Images}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ width: "100%", height: 300 }}
                    renderItem={({ item }) => {
                        return (
                            <ImageBackground
                                source={{ uri: item }}
                                style={{ width: width, height: 300, }}
                                imageStyle={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                            >
                            </ImageBackground>
                        )
                    }
                    }
                    keyExtractor={(item, key) => key}
                    key={(item, key) => key}
                    pagingEnabled={true}
                    ref={(ref) => (carouselRef.current = ref)}
                    viewabilityConfig={viewConfigRef}
                    onViewableItemsChanged={onViewRef.current}
                />
                <ReactView style={{ height: "0%", position: 'absolute', marginTop: 270, alignItems: direction.end }}>
                    <ReactView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 60, height: 23, backgroundColor: 'white', borderRadius: 15, marginLeft: 10, marginRight: 10, opacity: 0.9 }}>
                        <Image style={{ width: 15, height: 15, marginLeft: 5, marginRight: 3 }} source={require('../../src/assets/aperture.png')} />
                        <Text style={{ marginRight: 5, marginLeft: 2 ,color:'black'}}>
                            {activeIndex + 1}/{Images?.length}
                        </Text>
                    </ReactView>
                </ReactView>
                <ReactView style={{ height: '1%', position: 'absolute', marginTop: 10, alignItems: direction.end, }}>
                    <TouchableOpacity style={{ width: 35, height: 35, marginRight: 10, marginLeft: 10, backgroundColor: 'white', alignItems: 'center', justifyContent: "center", opacity: 0.5 ,borderRadius:5}} onPress={() => {
                        // router.back();
                    }}>
                        <Image source={require('../../src/assets/heart.png')} style={{ width: 20, height: 20 }} tintColor={"black"}/>
                    </TouchableOpacity>
                </ReactView>
            </ReactView>
            <ReactView style={{ height: "1%", position: 'absolute', marginTop: 20, alignItems: direction.end, }}>
                <TouchableOpacity style={{ width: 35, height: 35, marginRight: 10, marginLeft: 10 }} onPress={() => {
                    router.back();
                }}>
                    <Image source={require('../../src/assets/right-arrow.png')} style={{ width: 20, height: 20, transform: [{ rotate: (Languages.lang == 'en') ? '0deg' : '180deg' }] }} />
                </TouchableOpacity>
            </ReactView>
        </ReactView>
    </>
    );
}