import { Image, StyleSheet, Text as text, View as view } from 'react-native';
import { Text, View } from '../../components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react'
import directionContext from '../direction/directionContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomListItem = ({ Name, ImageUser, Message, chatGroup, Id }) => {
    const direction = useContext(directionContext);

    const info = async () => {
        await AsyncStorage.setItem("@ChatGroup", JSON.stringify({ chatGroup: chatGroup, Image: ImageUser, Id: Id }))
            .then(() => router.push("/ChatUser"));
    }
    return (
        <TouchableOpacity style={{ width: "100%" }} onPress={info}>
            <View style={{ flexDirection: direction.direction, width: "100%", justifyContent: 'space-between' }}>
                <View style={styles.Image}>
                    <Image source={{ uri: ImageUser }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                </View>
                <View style={[styles.Text, { alignItems: direction.start }]}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                        {Name}
                    </Text>
                    <View style={{ width: "80%", alignItems: direction.start }}>
                        <Text style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} numberOfLines={1}>
                            {Message}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    Image: {
        width: "20%",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginLeft: 10,
        marginRight: 10
    },
    Text: {
        width: "80%",
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center"
    }
})