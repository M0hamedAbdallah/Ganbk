import React, { useContext, useState } from "react";
import home from '../../src/assets/HomeShape.png';
import car from '../../src/assets/car.png';
import { View, Text, ScrollView, TouchableOpacity } from "../../components/Themed";
import { Image, StyleSheet, I18nManager } from "react-native";
import WordsContext from "../lang/wordsContext";
import directionContext from "../direction/directionContext";
import { router } from "expo-router";
export default function Items() {
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);
    const [item, setItem] = useState([
        {
            img: home,
            name: 'Properties',
        },
        // {
        //     img: car,
        //     name: 'cars',
        // },
    ]);
    const [item2, setItem2] = useState([
        // {
        //     img: car,
        //     name: 'cars',
        // },
        {
            img: home,
            name: 'Properties',
        },
    ]);
    return (
        <ScrollView horizontal={true} directionalLockEnabled={true} style={{ width: "100%", flexDirection: 'row', transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }] }} >
            {
                (!(I18nManager.isRTL)) ?

                    item.map((value, key) =>
                        <View style={[styles.marksscroll, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }] }]} key={key}>
                            <TouchableOpacity onPress={() => { 
                                router.push("/DetailsShow")
                             }}>
                                <Image source={value.img} style={[styles.marksicons]} />
                                <Text style={styles.markstext}>{Languages[value.name]}</Text>
                            </TouchableOpacity>
                        </View>
                    ) :
                    item2.map((value, key) =>
                        <View style={[styles.marksscroll, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }] }]} key={key}>
                            <TouchableOpacity onPress={() => { 
                                router.push("/DetailsShow")
                             }}>
                                <Image source={value.img} style={[styles.marksicons]} />
                                <Text style={styles.markstext}>{Languages[value.name]}</Text>
                            </TouchableOpacity>
                        </View>
                    )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    marksscroll: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        marginTop: 10,
        gap: 15,
    },
    marksicons: {
        width: 70,
        height: 70,
        marginRight: 8,
        resizeMode: 'contain'
    },
    markstext: {
        fontWeight: "800",
        alignSelf: "center",
        marginBottom: 10,
        marginRight: 8,
        fontSize: 15
    }
});