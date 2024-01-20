import React, { useEffect, useRef, useState } from "react";
import { View } from "../../components/Themed";
import { FlatList, ImageBackground, useWindowDimensions, View as ReactView } from "react-native";
import { useCallback } from "react";

export default function SliderBox({ Images }) {
    const width = useWindowDimensions().width;
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
    return (
        <>
            <FlatList
                data={Images}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ width: "100%", height: 300 }}
                renderItem={({ item }) => {
                    return (
                        <ImageBackground
                            source={{ uri: item }}
                            style={{ width: width, height: 300 }}
                            imageStyle={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
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
            <ReactView style={{ flexDirection: 'row', justifyContent: "center", marginVertical: 15, backgroundColor: 'gray', borderRadius: 5 }}>
                {Images?.map(({ }, index) => {
                    return (<ReactView
                        key={index}
                        style={
                            {
                                height: 7,
                                width: 20,
                                margin: 5,
                                borderRadius: 3,
                                backgroundColor: "white",
                                opacity: (index === activeIndex) ? 1 : 0.5,
                            }
                        }
                    />)
                })}
            </ReactView>
        </>
    );
}