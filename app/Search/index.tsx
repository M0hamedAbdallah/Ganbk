import React, { useContext } from "react";
import { View, Text } from "../../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import WordsContext from "../../src/lang/wordsContext";
import { KeyboardAvoidingView, SafeAreaView, Platform, StyleSheet } from "react-native";


export default function Search() {
    const Languages = useContext(WordsContext);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                enabled={true}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: "90%", backgroundColor: 'white', borderRadius: 6, marginTop: 10 }}>
                        <TextInput style={styles.input} placeholder={Languages.search} />
                    </View>
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