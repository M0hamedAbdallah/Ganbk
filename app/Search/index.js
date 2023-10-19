import React, { useContext, useState } from "react";
import { View, Text } from "../../components/Themed";
import WordsContext from "../../src/lang/wordsContext";
import { KeyboardAvoidingView, SafeAreaView, Platform, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../../firebase/config/firebase-config";



export default function Search() {
    const Languages = useContext(WordsContext);
    const [search, setSearch] = useState("");

    const Search = async (value) => {
        const unsub = firebase.firestore().collection("DuplexForSale").where('Describewhatyouareselling', "<=", value).onSnapshot((e)=>{
            console.log(e.docs.map((doc)=>{ return doc.data()}))
        });
        // unsub.forEach((doc) => {
        //     console.log(doc.id, '=>', doc.data());
        // });
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                enabled={true}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: "90%", backgroundColor: 'white', borderRadius: 6, marginTop: 10 }}>
                        <TextInput style={styles.input} placeholder={Languages.search}
                            onChangeText={(value) => {
                                console.log(value)
                                setSearch(value)
                            }} value={search} />
                    </View>
                    <TouchableOpacity style={{ alignItems: 'center', width: 100, height: 35, backgroundColor: "red", justifyContent: "center", borderRadius: 3, marginTop: 10 }} onPress={() => {
                        Search(search);
                    }}>
                        <Text style={{ color: "white" }}>
                            {Languages.Search}
                        </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 45,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})