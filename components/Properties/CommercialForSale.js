import Checkbox from 'expo-checkbox';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from "../../components/Themed";
import { Platform, Image, StyleSheet, useColorScheme, Animated, KeyboardAvoidingView, TextInput, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from 'expo-router';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import WordsContext from '../../src/lang/wordsContext';

export default function CommercialForSale({ id, from }) {
    const color = useColorScheme();
    const Languages = useContext(WordsContext);
    const [valueImage, setvalueImage] = useState(false);
    const [images, setImages] = useState([]);
    const [isChecked, setChecked] = useState(false);
    const slide = useState(new Animated.Value(-10))[0];
    const viewHight = useState(new Animated.Value(50))[0];
    const opacity = useState(new Animated.Value(0))[0];
    const rotate = useState(new Animated.Value(0))[0];
    const [amenities, SetAmenities] = useState([]);
    const data_amenities = [
        { key: "1", value: "Air Conditioning" },
        { key: "2", value: "Covered Parking" },
        { key: "3", value: "Secuirty" },
        { key: "4", value: "Storage" },
    ]


    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('permission to access media library is required');
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            multiple: true,
        });

        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]);
            slideUp.start(({ finished }) => {
                if (finished) {
                    setvalueImage(false);
                }
            });
            opacityHide.start();
            rotateDown.start();
            viewEnd.start();
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('permission to access media library is required');
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            multiple: true,
        });

        if (!result.canceled) {
            setImages([...images, result.assets[0].uri]);
            slideUp.start(({ finished }) => {
                if (finished) {
                    setvalueImage(false);
                }
            });
            opacityHide.start();
            rotateDown.start();
            viewEnd.start();
        }
    };

    const viewStart = Animated.timing(viewHight, {
        toValue: 80,
        duration: 1000,
        useNativeDriver: false,
    })

    const viewEnd = Animated.timing(viewHight, {
        toValue: 50,
        duration: 1000,
        useNativeDriver: false,
    })

    const slideDown = Animated.timing(slide, {
        toValue: 3,
        duration: 1000,
        useNativeDriver: true,
    })

    const opacityShow = Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    })

    const slideUp = Animated.timing(slide, {
        toValue: -10,
        duration: 1000,
        useNativeDriver: true,
    })

    const opacityHide = Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
    })

    const rotateUp = Animated.timing(rotate, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
    })

    const rotateDown = Animated.timing(rotate, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
    })


    return (

        <SafeAreaView style={{ flex: 1 }}>

            <Stack.Screen options={{
                headerLeft: () => {
                    if (Languages.lang === 'en') {
                        return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                            <Image source={require('../../src/assets/arrow-left.png')} tintColor={(color == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23 }} />
                        </TouchableOpacity>
                    }
                },
                headerRight: () => {
                    if (Languages.lang === 'ar') {
                        return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                            <Image source={require('../../src/assets/arrow-left.png')} tintColor={(color == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                        </TouchableOpacity>
                    }
                },
                headerTitle: () => {
                    return <View style={{ width: "85%", marginLeft: 23 }}>
                        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                            {id}
                        </Text>
                    </View>
                },
                headerBackVisible: false
            }} />

            <KeyboardAvoidingView
                style={{ width: "100%", height: "100%" }}
                enabled={true}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={{ width: "100%", height: "100%" }}>
                    <View style={{ width: "100%", height: "90%" }}>

                        <ScrollView
                            style={{ width: "100%" }}
                            showsVerticalScrollIndicator={false}
                        >

                            <Animated.View style={{ alignItems: 'center', marginTop: 20, height: viewHight }}>
                                <TouchableOpacity onPress={() => {
                                    if (valueImage) {
                                        slideUp.start(({ finished }) => {
                                            if (finished) {
                                                setvalueImage(false);
                                            }
                                        });
                                        opacityHide.start();
                                        rotateDown.start();
                                        viewEnd.start();
                                    } else {
                                        setvalueImage(!valueImage);
                                        opacityShow.start();
                                        slideDown.start();
                                        rotateUp.start();
                                        viewStart.start();
                                    }
                                }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginBottom: 10, padding: 5, borderTopRightRadius: 5, borderTopLeftRadius: 5, width: "90%" }} lightColor="#eee" darkColor="#404040">

                                    <Text style={styles.label}>UPLOAD IMAGES</Text>
                                    <Animated.View style={[{ transform: [{ rotate: rotate.interpolate({ inputRange: [0, 1], outputRange: ['90deg', '270deg'], }) }], marginRight: 10 }]}>
                                        <Animated.Image source={require('../../src/assets/right-arrow.png')} style={{ width: 10, height: 10 }} tintColor={color == 'dark' ? 'white' : 'black'} />
                                    </Animated.View>
                                </TouchableOpacity>

                                {
                                    valueImage ? (
                                        <Animated.View style={{ flexDirection: 'row', width: "90%", justifyContent: "space-between", transform: [{ translateY: slide }], opacity: opacity }}>
                                            <TouchableOpacity style={styles.addImage} onPress={pickImage}>
                                                <Text style={styles.addImageText}>+</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.addImage} onPress={takePhoto}>
                                                <Image style={styles.ImageCamera} source={require('../../src/assets/addPhoto.png')} />
                                            </TouchableOpacity>
                                        </Animated.View>) : (
                                        null
                                    )
                                }
                            </Animated.View>
                            {images.length == 0 ? (null) : (
                                <View style={{ width: "100%", alignItems: 'center', marginTop: 10, height: 90 }}>
                                    <ScrollView style={[styles.imageContainer, { marginBottom: 10 }]} horizontal={true}>
                                        {images.map((image, index) => (
                                            <TouchableOpacity key={index} onPress={() => setImages(images.filter((img, i) => i !== index))}>
                                                <Image source={{ uri: image }} style={styles.image} />
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Category *
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: "100%", alignItems: 'center', }}>
                                    <Image source={from == 'Properties' ? require('../../src/assets/HomeShape.png') : require('../../src/assets/car.png')} style={{ width: 90, height: 90 }} />
                                    <View style={{}}>
                                        <Text style={{ fontSize: 20, fontWeight: '900', color: 'gray' }}>{from}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: '900', color: 'gray' }}>{id}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Price *
                                    </Text>
                                </View>
                                <View style={{ width: "90%", backgroundColor: 'white', borderRadius: 6 }}>
                                    <TextInput style={{ width: "100%", height: 45, paddingLeft: 10, borderColor: 'gray', borderRadius: 5, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: "90%", alignItems: 'center' }}>

                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? '#eb304f' : undefined}
                                    />
                                    <Text style={styles.paragraph}>Negotiable</Text>
                                </View>
                            </View>
                            <View style={{ width: "100%", height: 100, alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Type *
                                    </Text>
                                </View>
                                <View style={{ width: '90%' }}>
                                    <ScrollView horizontal={true} >
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                CLINIC
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                FACTORY
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                FULL COMMERCIAL BUILDING
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                GARAGE
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                OFFICE SPACE
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                RESTAURANT & CAFE
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                RETAIL
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                WAREHOUSE
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                OTHER
                                            </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Down Payment
                                    </Text>
                                </View>
                                <View style={{ width: "90%", backgroundColor: 'white', borderRadius: 6 }}>
                                    <TextInput style={{ width: "100%", height: 45, paddingLeft: 10, borderColor: 'gray', borderRadius: 5, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} />
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Area (m2)*
                                    </Text>
                                </View>
                                <View style={{ width: "90%", backgroundColor: 'white', borderRadius: 6 }}>
                                    <TextInput style={{ width: "100%", height: 45, paddingLeft: 10, borderColor: 'gray', borderRadius: 5, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} />
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Amenities
                                    </Text>
                                </View>
                                <View style={{ width: "90%" }}>
                                    <MultipleSelectList
                                        data={data_amenities}
                                        setSelected={(val) => SetAmenities(val)}
                                        save="value"
                                        label='Categories'
                                        boxStyles={{ alignItems: 'center', backgroundColor: "white" }}
                                        dropdownStyles={{ backgroundColor: 'white' }}
                                        arrowicon={<Image tintColor={(color == 'light') ? 'black' : '#888888'} source={require('../../src/assets/right-arrow.png')} style={{
                                            width: 10, height: 10, transform: [{
                                                rotate: '90deg'
                                            }]
                                        }} />}
                                    />
                                </View>
                            </View>

                            <View style={{ width: "100%", height: 100, alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Furnished
                                    </Text>
                                </View>
                                <View style={{ width: '90%' }}>
                                    <ScrollView horizontal={true} >
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                NO
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                YES
                                            </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            </View>

                            <View style={{ width: "100%", height: 100, alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Payment Option
                                    </Text>
                                </View>
                                <View style={{ width: '90%' }}>
                                    <ScrollView horizontal={true} >
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                CASH
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                CASH OR INSTALLMENT
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.Chooses}>
                                            <Text>
                                                INSTALLMENT
                                            </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            </View>

                            <View style={{ width: "100%", height: 100, alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Location *
                                    </Text>
                                </View>

                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Ad title *
                                    </Text>
                                </View>
                                <View style={{ width: "90%", backgroundColor: 'white', borderRadius: 6 }}>
                                    <TextInput style={{ width: "100%", height: 45, paddingLeft: 10, borderColor: 'gray', borderRadius: 5, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} />
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10, marginBottom: 150 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Describe what you are selling *
                                    </Text>
                                </View>
                                <View style={{ width: "90%", backgroundColor: 'white', borderRadius: 6 }}>
                                    <TextInput style={{ width: "100%", height: 45, paddingLeft: 10, borderColor: 'gray', borderRadius: 5, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ width: '100%', height: "10%", justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, }}>
                        <TouchableOpacity style={styles.ButtonContainer} >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    imageContainer: {
        marginTop: 10,
        width: "90%",
        height: 50
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },
    addImage: {
        width: "49%",
        height: 35,
        backgroundColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addImageText: {
        color: 'white',
        fontSize: 25,
    },
    ImageCamera: {
        width: 25,
        height: 25
    },
    paragraph: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 8
    },
    checkbox: {
        marginTop: 8,
        marginRight: 8
    },
    ButtonContainer: {
        width: "85%",
        height: 50,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#e93333",
        borderRadius: 5,
    },
    Chooses: {
        height: 35,
        margin: 10,
        paddingRight: 10,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 20
    }
});