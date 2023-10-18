import React, { useState, useEffect, useContext } from 'react';
import { useLocalSearchParams } from 'expo-router';
import WordsContext from '../../src/lang/wordsContext';
import { Text, View } from 'react-native';

export default function AddPhotosScreen() {
    const Languages = useContext(WordsContext);
    const { id, from } = useLocalSearchParams();


    if (id == Languages.ApartmentsDuplexforSale) {
        return (
            <View style={{ flex: 1 }}>
                <Text>
                    hello
                </Text>
            </View>
        )
    }


}
