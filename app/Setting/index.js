import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ImageEdit } from "../../components/Themed";
import directionContext from "../../src/direction/directionContext";
import WordsContext from "../../src/lang/wordsContext";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase/config/firebase-config";
import { useState } from "react";
import { router } from "expo-router";


export default function setteing() {
    const direction = useContext(directionContext);
    const Languages = useContext(WordsContext);
    const [user, setUser] = useState();

    async function onAuthStateC(user) {
        setUser(user);
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, onAuthStateC);
        return subscriber;
    }, []);


    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {
                (!user) ? (
                    <View style={{ flex: 1 ,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>
                            {Languages.NoThing}
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity style={{ width: '100%', marginTop: 10, flexDirection: direction.direction }}
                        onPress={() => {
                            router.push('/Setting/SingOut')
                        }}
                    >
                        <View style={{ width: "80%", marginLeft: 20, marginRight: 20, }}>
                            <Text style={{ fontSize: 20 }}>
                                {Languages.Manageaccount}
                            </Text>
                            <Text style={{ fontSize: 15, color: 'gray' }}>
                                {Languages.Takeactiononaccount}
                            </Text>
                        </View>
                        <View style={{ width: "10%", alignItems: 'center', justifyContent: 'center' }}>
                            <ImageEdit
                                source={require("../../src/assets/right-arrow.png")}
                                style={{ width: 20, height: 20, transform: [{ rotate: (Languages.lang == 'en') ? '0deg' : '180deg' }] }} />
                        </View>
                    </TouchableOpacity>
                )
            }
        </View >
    )
}