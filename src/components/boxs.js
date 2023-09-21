import React, { useContext, useState } from "react";
import home from '../../src/assets/home.png'
import { View, TouchableOpacity, Text, ScrollView } from "../../components/Themed";
import { Image, StyleSheet,  } from "react-native";
import WordsContext from "../lang/wordsContext";
import directionContext from "../direction/directionContext";

export default function Boxs() {
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);
    const [item, setItem] = useState([
        {
            img: home,
            name: 'Value1',
        },
        {
            img: home,
            name: 'Value2',
        },
        {
            img: home,
            name: 'Value3',
        },
    ]);
    return (
        <ScrollView horizontal={true} directionalLockEnabled={true} style={{ width: "100%", flexDirection: 'row',transform:[{scaleX:(direction.lang=='ar')?-1:1}] }} >
            {item.map((value, key) =>
                <View style={[styles.marksscroll,{transform:[{scaleX:(direction.lang=='ar')?-1:1}]}]} key={key}>
                    <TouchableOpacity onPress={() => { }}>
                        <View style={{ width: "100%", height: 100, backgroundColor: 'gray' , borderRadius:10  ,zIndex:-10}}>
                        </View>
                        <Text style={styles.markstext}>{value.name}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    marksscroll: {
        width: 200,
        height: 250,
        borderRadius: 10,
        margin: 10
    },
    marksicons: {
        width: 100,
        height: 100,
        marginRight: 8,
    },
    markstext: {
        fontWeight: "800",
        fontSize: 15
    }
});