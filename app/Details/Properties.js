import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "../../components/Themed";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import WordsContext from "../../src/lang/wordsContext";

export default function Properties() {
    const Languages = useContext(WordsContext);
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/Details/' + `${Languages.ApartmentsDuplexforSale}` + '?from=' + Languages.Properties)
            }}>
                <Text style={styles.text}>
                    {Languages.ApartmentsDuplexforSale}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/Details/' + Languages.ApartmentsDuplexforRent + '?from=' + Languages.Properties)
            }}>
                <Text style={styles.text}>
                    {Languages.ApartmentsDuplexforRent}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/Details/' + Languages.VillasForSale + '?from=' + Languages.Properties)
            }}>
                <Text style={styles.text}>
                    {Languages.VillasForSale}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/Details/' + Languages.VillasForRent + '?from=' + Languages.Properties)
            }}>
                <Text style={styles.text}>
                    {Languages.VillasForRent}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/Details/' + Languages.VacationHomesforSale + '?from=' + Languages.Properties)
            }}>
                <Text style={styles.text}>
                    {Languages.VacationHomesforSale}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/Details/' + Languages.VacationHomesforRent + '?from=' + Languages.Properties)
            }}>
                <Text style={styles.text}>
                    {Languages.VacationHomesforRent}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/Details/' + Languages.CommercialforSale + '?from=' + Languages.Properties)
            }}>
                <Text style={styles.text}>
                    {Languages.CommercialforSale}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/Details/' + Languages.CommercialforRent + '?from=' + Languages.Properties)
            }}>
                <Text style={styles.text}>
                    {Languages.CommercialforRent}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/Details/' + Languages.BuildingsLands + '?from=' + Languages.Properties)
            }}>
                <Text style={styles.text}>
                    {Languages.BuildingsLands}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    items: {
        height: 30,
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
        fontWeight: '100'
    }
})