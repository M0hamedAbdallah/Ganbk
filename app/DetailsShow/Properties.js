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
                router.push('/DetailsShow/' + `${Languages.ApartmentsDuplexforSale}` )
            }}>
                <Text style={styles.text}>
                    {Languages.ApartmentsDuplexforSale}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/DetailsShow/' + Languages.ApartmentsDuplexforRent )
            }}>
                <Text style={styles.text}>
                    {Languages.ApartmentsDuplexforRent}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/DetailsShow/' + Languages.VillasForSale )
            }}>
                <Text style={styles.text}>
                    {Languages.VillasForSale}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/DetailsShow/' + Languages.VillasForRent )
            }}>
                <Text style={styles.text}>
                    {Languages.VillasForRent}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/DetailsShow/' + Languages.VacationHomesforSale )
            }}>
                <Text style={styles.text}>
                    {Languages.VacationHomesforSale}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/DetailsShow/' + Languages.VacationHomesforRent )
            }}>
                <Text style={styles.text}>
                    {Languages.VacationHomesforRent}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/DetailsShow/' + Languages.CommercialforSale )
            }}>
                <Text style={styles.text}>
                    {Languages.CommercialforSale}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/DetailsShow/' + Languages.CommercialforRent )
            }}>
                <Text style={styles.text}>
                    {Languages.CommercialforRent}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                router.push('/DetailsShow/' + Languages.BuildingsLands )
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