import Checkbox from 'expo-checkbox';
import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageEdit } from "../../components/Themed";
import { Platform, Image, StyleSheet, useColorScheme, Animated, KeyboardAvoidingView, TextInput, SafeAreaView, ke, Alert, View as V, TouchableOpacity as T, I18nManager, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, router } from 'expo-router';
import MultipleSelectList from '../../src/components/MultipleSelectList.js';
import SelectList from '../../src/components/SelectList.js';
import lang from '../../src/lang/words';
import WordsContext from '../../src/lang/wordsContext';
import directionContext from '../../src/direction/directionContext';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DateTimePicker from "@react-native-community/datetimepicker";

export default function BuildingsAndLands({ id, from }) {
    const color = useColorScheme();
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);
    const [valueImage, setvalueImage] = useState(false);
    const [images, setImages] = useState([]);
    const [isChecked, setChecked] = useState(false);
    const [Price, setPrice] = useState('');
    const [downPayment, setdownPayment] = useState('');
    const [Area, setArea] = useState('');
    const [Adtitle, setAdtitle] = useState('');
    const [Location, setlocation] = useState('');
    const [Describewhatyouareselling, setDescribewhatyouareselling] = useState('');
    const slide = useRef(new Animated.Value(-10)).current;
    const viewHight = useRef(new Animated.Value(50)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const rotate = useRef(new Animated.Value(0)).current;
    const [type, setType] = useState(0);
    const [PaymentOption, setPaymentOption] = useState(0);
    const [SaleRent, setSaleRent] = useState(0);
    const [theProblem, setTheProblem] = useState({
        Photo: false,
        Price: false,
        Type: false,
        Downpayment: false,
        Area: false,
        PaymentOption: false,
        SaleRent: false,
        Location: false,
        Adtitle: false,
        Describewhatyouareselling: false,
    })


    const pickImage = useCallback(async () => {
        if (!(images.length > 20)) {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('permission to access media library is required');
            } else {

                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    // allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                    allowsMultipleSelection: true,
                    selectionLimit: 20,
                    base64: false
                });

                if (!result.canceled) {
                    let array = []
                    result.assets.map((i) => {
                        array.push(i.uri);
                    })
                    if (!((array.length + images.length) > 20)) {
                        setImages([...images, ...array]);
                        slideUp.start(({ finished }) => {
                            if (finished) {
                                setvalueImage(false);
                            }
                        });
                        opacityHide.start();
                        rotateDown.start();
                        viewEnd.start();
                    } else {
                        alert('you can,t add large than 20 images');
                    }
                }
            }
        }
    }, [valueImage])

    const takePhoto = useCallback(async () => {
        if (!(images.length > 20)) {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('permission to access media library is required');
            } else {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    aspect: [4, 3],
                    quality: 1,
                    allowsMultipleSelection: true,
                    selectionLimit: 20,
                    base64: false
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
            }
        }
    }, [valueImage])

    const viewStart = useCallback(Animated.timing(viewHight, {
        toValue: 80,
        duration: 1000,
        useNativeDriver: false,
    }), [viewHight]);

    const viewEnd = useCallback(Animated.timing(viewHight, {
        toValue: 50,
        duration: 1000,
        useNativeDriver: false,
    }), [viewHight]);

    const slideDown = useCallback(Animated.timing(slide, {
        toValue: 3,
        duration: 1000,
        useNativeDriver: true,
    }), [slide]);

    const opacityShow = useCallback(Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }), [opacity]);

    const slideUp = useCallback(Animated.timing(slide, {
        toValue: -10,
        duration: 1000,
        useNativeDriver: true,
    }), [slide]);

    const opacityHide = useCallback(Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
    }), [opacity]);

    const rotateUp = useCallback(Animated.timing(rotate, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
    }), [rotate]);

    const rotateDown = useCallback(Animated.timing(rotate, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
    }), [rotate]);


    const IMageVeiw = useCallback(() => {
        if (images.length == 0) {
            return (
                (theProblem.Photo) ?
                    (
                        <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                            <View style={{ flexDirection: direction.direction, alignItems: 'center', marginTop: 5 }}>
                                <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }} />
                                <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5, marginRight: 5, color: 'red' }}>
                                    لم تقم بملئ هذا الحقل
                                </Text>
                            </View>
                        </View>
                    ) : null
            )
        } else {
            return (
                <View style={{ width: "100%", alignItems: 'center', marginTop: 10, height: 90 }}>
                    <ScrollView style={[styles.imageContainer, { marginBottom: 10 }]} horizontal={true}>
                        {images.map((image, index) => (
                            <TouchableOpacity key={index} onPress={() => setImages(images.filter((img, i) => i !== index))}>
                                <Image source={{ uri: image }} style={styles.image} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )
        }
    }, [images])


    useEffect(() => {
        const lis = EventRegister.addEventListener('Loc', (data) => {
            setlocation(data);
        })
        return () => {
            EventRegister.removeEventListener('Loc');
        }
    },)

    useEffect(() => {
        setTheProblem(theProblem);
    }, [theProblem]);

    const getTextInputProps = (v) => {
        const isRTL = isTextRTL(v) || ((v === '' && Languages.lang === 'ar') ? true : false);
        return {
            textAlign: (Languages.lang === 'ar') ? ((isRTL) ? "right" : "left") : ((!isRTL) ? "left" : "right"),
            // writingDirection: isRTL ? 'rtl' : 'ltr',
        };
    };

    const isTextRTL = (inputText) => {
        return /[\u0600-\u06FF]/.test(inputText); // Regex pattern for Arabic characters
    };

    const LocationView = () => {
        if (Location.length === 0) {
            return (
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {Languages.Null}
                </Text>
            );
        } else {
            return (
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {Location}
                </Text>
            );
        }
    }

    const Check = async () => {
        let theValue = true;
        if (images.length == 0) {
            theProblem.Photo = true;
            theValue = false;
        } else {
            theProblem.Photo = false;
            if (theValue != false) {
                theValue = true;
            }
        }
        if (Price === '') {
            theProblem.Price = true;
            theValue = false;
        } else {
            theProblem.Price = false;
            if (theValue != false) {
                theValue = true;
            }
        }
        if (type == 0) {
            theProblem.Type = true;
            theValue = false;
        } else {
            theProblem.Type = false;
            if (theValue != false) {
                theValue = true;
            }
        }
        if (downPayment == 0) {
            theProblem.Downpayment = true;
            theValue = false;
        } else {
            theProblem.Downpayment = false;
            if (theValue != false) {
                theValue = true;
            }
        }
        if (Area == 0) {
            theProblem.Area = true;
            theValue = false;
        } else {
            theProblem.Area = false;
            if (theValue != false) {
                theValue = true;
            }
        }
        if (PaymentOption == 0) {
            theProblem.PaymentOption = true;
            theValue = false;
        } else {
            theProblem.PaymentOption = false;
            if (theValue != false) {
                theValue = true;
            }
        }
        if (SaleRent == 0) {
            theProblem.SaleRent = true;
            theValue = false;
        } else {
            theProblem.SaleRent = false;
            if (theValue != false) {
                theValue = true;
            }
        }
        if (Location == '') {
            theProblem.Location = true;
            theValue = false;
        } else {
            theProblem.Location = false;
            if (theValue != false) {
                theValue = true;
            }
        }
        if (Adtitle == '') {
            theProblem.Adtitle = true;
            theValue = false;
        } else {
            theProblem.Adtitle = false;
            if (theValue != false) {
                theValue = true;
            }
        }
        if (Describewhatyouareselling == '') {
            theProblem.Describewhatyouareselling = true;
            theValue = false
        }
        else {
            theProblem.Describewhatyouareselling = false;
            if (theValue != false) {
                theValue = true;
            }
        }
        if (theValue) {
            const TypeVar = TypeFunction();
            const PaymentOptionVar = PaymentOptionFunction();
            const SaleRentVar = SaleRentFunction(); 
            const data = {
                Photo: images,
                Price: Price,
                Negotiable: isChecked,
                Type: TypeVar,
                DownPayment: downPayment,
                Area: Area,
                PaymentOption: PaymentOptionVar,
                SaleRent: SaleRentVar,
                Location: Location,
                Adtitle: Adtitle,
                Describewhatyouareselling: Describewhatyouareselling,
                date: new Date().getDate(),
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                hours: new Date().getHours(),
                min: new Date().getMinutes(),
                sec: new Date().getSeconds(),
            }
            await AsyncStorage.setItem("@Data", JSON.stringify(data));
            router.push('/Confirm/BuildingsLands');
        }

        setvalueImage(valueImage);
        setvalueImage(!valueImage);
    }

    const TypeFunction = () => {
        if (type == 1) { return 'AGRICULTURAL' }
        if (type == 2) { return 'ANYUSE' }
        if (type == 3) { return 'COMMERCIAL' }
        if (type == 4) { return 'INDUSTRIAL' }
        if (type == 5) { return 'RESIDENTIAL' }
    }


    const PaymentOptionFunction = () => {
        if (PaymentOption == 1) { return 'CASH' }
        if (PaymentOption == 2) { return 'CASHORINSTALLMENT' }
        if (PaymentOption == 3) { return 'INSTALLMENT' }
    }

    const SaleRentFunction = () => {
        if (SaleRent == 1) { return 'FORRENT' }
        if (SaleRent == 2) { return 'FORSALE' }
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>


            <Stack.Screen options={{
                headerLeft: () => {
                    if (Languages.lang === 'en') {
                        return <T style={{ alignItems: 'center' }} onPress={() => router.back()}>
                            <Image source={require('../../src/assets/arrow-left.png')} tintColor={(color == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23 }} />
                        </T>
                    }
                },
                headerRight: () => {
                    if (Languages.lang === 'ar') {
                        return <T style={{ alignItems: 'center' }} onPress={() => router.back()}>
                            <Image source={require('../../src/assets/arrow-left.png')} tintColor={(color == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                        </T>
                    }
                },
                headerTitle: () => {
                    return <V style={{ width: "85%", marginLeft: 23 }}>
                        <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                            {id}
                        </Text>
                    </V>
                },
                headerBackVisible: (I18nManager.isRTL) ? true : false
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
                                }} style={{ flexDirection: direction.direction, alignItems: 'center', justifyContent: "space-between", marginBottom: 10, padding: 5, borderTopRightRadius: 5, borderTopLeftRadius: 5, width: "90%" }} lightColor="#eee" darkColor="#404040">

                                    <Text style={styles.label}>{Languages.UPLOADIMAGES}</Text>
                                    <Animated.View style={[{ transform: [{ rotate: rotate.interpolate({ inputRange: [0, 1], outputRange: ['90deg', '270deg'], }) }], marginRight: 10 }]}>
                                        <Animated.Image source={require('../../src/assets/right-arrow.png')} style={{ width: 10, height: 10 }} tintColor={color == 'dark' ? 'white' : 'black'} />
                                    </Animated.View>
                                </TouchableOpacity>

                                {
                                    valueImage ? (
                                        <Animated.View style={{ flexDirection: direction.direction, width: "90%", justifyContent: "space-between", transform: [{ translateY: slide }], opacity: opacity }}>
                                            <TouchableOpacity style={styles.addImage} onPress={pickImage}>
                                                <Image style={styles.ImageCamera} source={require('../../src/assets/plus.png')} tintColor={(color == 'dark') ? 'white' : 'black'} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.addImage} onPress={takePhoto}>
                                                <Image style={styles.ImageCamera} source={require('../../src/assets/addPhoto.png')} tintColor={(color == 'dark') ? 'white' : 'black'} />
                                            </TouchableOpacity>
                                        </Animated.View>) : (
                                        null
                                    )
                                }
                            </Animated.View>
                            <IMageVeiw />
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Languages.category}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: direction.direction, justifyContent: 'flex-start', width: "100%", alignItems: 'center', }}>
                                    <Image source={require('../../src/assets/HomeShape.png')} style={{ width: 90, height: 90 }} />
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
                                        {Languages.price}*
                                    </Text>
                                </View>

                                <View style={{ width: "90%", borderRadius: 6 }}>
                                    <TextInput style={{
                                        width: "100%",
                                        height: 45,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: (color == 'dark') ? 'white' : 'black'
                                    }}
                                        value={Price}
                                        onChangeText={setPrice}
                                        {...getTextInputProps(Price)}
                                    />
                                    {
                                        (theProblem.Price) ?
                                            (
                                                <View style={{ flexDirection: direction.direction, alignItems: 'center', marginTop: 5 }}>
                                                    <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }} />
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5, marginRight: 5, color: 'red' }}>
                                                        لم تقم بملئ هذا الحقل
                                                    </Text>
                                                </View>
                                            ) : null
                                    }
                                </View>
                                <View style={{ flexDirection: direction.direction, justifyContent: 'flex-start', width: "90%", alignItems: 'center' }}>

                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? '#eb304f' : undefined}
                                    />
                                    <Text style={styles.paragraph}>{Languages.Negotiable}</Text>
                                </View>
                            </View>
                            <View style={{ width: "100%", height: 100, alignItems: 'center', marginTop: 10, marginBottom: (theProblem.Type) ? 15 : 0 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Languages.Type}*
                                    </Text>
                                </View>
                                <View style={{ width: '90%', transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }] }}>
                                    <ScrollView horizontal={true} >
                                        <TouchableOpacity style={[styles.Chooses, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], backgroundColor: (type == 1) ? '#eb304f' : null }]} onPress={() => {
                                            setType(1);
                                        }}>
                                            <Text>
                                                {Languages.AGRICULTURAL}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.Chooses, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], backgroundColor: (type == 2) ? '#eb304f' : null }]} onPress={() => {
                                            setType(2);
                                        }}>
                                            <Text>
                                                {Languages.ANYUSE}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.Chooses, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], backgroundColor: (type == 3) ? '#eb304f' : null }]} onPress={() => {
                                            setType(3);
                                        }}>
                                            <Text>
                                                {Languages.COMMERCIAL}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.Chooses, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], backgroundColor: (type == 4) ? '#eb304f' : null }]} onPress={() => {
                                            setType(4);
                                        }}>
                                            <Text>
                                                {Languages.INDUSTRIAL}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.Chooses, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], backgroundColor: (type == 5) ? '#eb304f' : null }]} onPress={() => {
                                            setType(5);
                                        }}>
                                            <Text>
                                                {Languages.RESIDENTIAL}
                                            </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                    {
                                        (theProblem.Type) ?
                                            (
                                                <View style={{ flexDirection: direction.direction, alignItems: 'center', marginTop: 5, marginBottom: 10, transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }] }}>
                                                    <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }} />
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5, marginRight: 5, color: 'red' }}>
                                                        لم تقم بملئ هذا الحقل
                                                    </Text>
                                                </View>
                                            ) : null
                                    }
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Languages.DownPayment}
                                    </Text>
                                </View>
                                <View style={{ width: "90%", borderRadius: 6 }}>
                                    <TextInput style={{
                                        width: "100%",
                                        height: 45,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: (color == 'dark') ? 'white' : 'black'
                                    }}
                                        value={downPayment}
                                        onChangeText={setdownPayment}
                                        {...getTextInputProps(downPayment)}
                                    />
                                    {
                                        (theProblem.Downpayment) ?
                                            (
                                                <View style={{ flexDirection: direction.direction, alignItems: 'center', marginTop: 5 }}>
                                                    <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }} />
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5, marginRight: 5, color: 'red' }}>
                                                        لم تقم بملئ هذا الحقل
                                                    </Text>
                                                </View>
                                            ) : null
                                    }
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Languages.Area}*
                                    </Text>
                                </View>
                                <View style={{ width: "90%", borderRadius: 6 }}>
                                    <TextInput style={{
                                        width: "100%",
                                        height: 45,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: (color == 'dark') ? 'white' : 'black'
                                    }}
                                        value={Area}
                                        onChangeText={setArea}
                                        {...getTextInputProps(Area)}
                                    />
                                    {
                                        (theProblem.Area) ?
                                            (
                                                <View style={{ flexDirection: direction.direction, alignItems: 'center', marginTop: 5 }}>
                                                    <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }} />
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5, marginRight: 5, color: 'red' }}>
                                                        لم تقم بملئ هذا الحقل
                                                    </Text>
                                                </View>
                                            ) : null
                                    }
                                </View>
                            </View>



                            <View style={{ width: "100%", height: 100, alignItems: 'center', marginTop: 10, marginBottom: (theProblem.PaymentOption) ? 15 : 0 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Languages.PaymentOption}
                                    </Text>
                                </View>
                                <View style={{ width: '90%', transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }] }}>
                                    <ScrollView horizontal={true} >
                                        <TouchableOpacity style={[styles.Chooses, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], backgroundColor: (PaymentOption == 1) ? "#eb304f" : null }]} onPress={() => {
                                            setPaymentOption(1)
                                        }}>
                                            <Text>
                                                {Languages.CASH}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.Chooses, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], backgroundColor: (PaymentOption == 2) ? "#eb304f" : null }]} onPress={() => {
                                            setPaymentOption(2)
                                        }}>
                                            <Text>
                                                {Languages.CASHORINSTALLMENT}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.Chooses, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], backgroundColor: (PaymentOption == 3) ? "#eb304f" : null }]} onPress={() => {
                                            setPaymentOption(3)
                                        }}>
                                            <Text>
                                                {Languages.INSTALLMENT}
                                            </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                    {
                                        (theProblem.PaymentOption) ?
                                            (
                                                <View style={{ flexDirection: direction.direction, alignItems: 'center', marginTop: 5, marginBottom: 10, transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }] }}>
                                                    <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }} />
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5, marginRight: 5, color: 'red' }}>
                                                        لم تقم بملئ هذا الحقل
                                                    </Text>
                                                </View>
                                            ) : null
                                    }
                                </View>
                            </View>

                            <View style={{ width: "100%", height: 100, alignItems: 'center', marginTop: 10, marginBottom: (theProblem.SaleRent) ? 15 : 0 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Languages.SaleRent} *
                                    </Text>
                                </View>
                                <View style={{ width: '90%', transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }] }}>
                                    <ScrollView horizontal={true} >
                                        <TouchableOpacity style={[styles.Chooses, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], backgroundColor: (SaleRent == 1) ? '#eb304f' : null }]} onPress={() => {
                                            setSaleRent(1);
                                        }}>
                                            <Text>
                                                {Languages.FORRENT}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.Chooses, { transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }], backgroundColor: (SaleRent == 2) ? '#eb304f' : null }]} onPress={() => {
                                            setSaleRent(2);
                                        }}>
                                            <Text>
                                                {Languages.FORSALE}
                                            </Text>
                                        </TouchableOpacity>
                                    </ScrollView>
                                    {
                                        (theProblem.SaleRent) ?
                                            (
                                                <View style={{ flexDirection: direction.direction, alignItems: 'center', marginTop: 5, marginBottom: 10, transform: [{ scaleX: (Languages.lang == 'ar') ? -1 : 1 }] }}>
                                                    <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }} />
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5, marginRight: 5, color: 'red' }}>
                                                        لم تقم بملئ هذا الحقل
                                                    </Text>
                                                </View>
                                            ) : null
                                    }
                                </View>
                            </View>

                            <View style={{ width: "100%", height: 90, alignItems: 'center', marginTop: 10, marginBottom: (theProblem.Location) ? 15 : 0 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Languages.Location} *
                                    </Text>
                                    <TouchableOpacity style={{ width: "100%", height: 45, flexDirection: direction.direction, justifyContent: "space-between", alignItems: "center" }}
                                        onPress={() => {
                                            router.push({ pathname: 'Location', params: ["sale"] });
                                        }}
                                    >
                                        <LocationView />
                                        <ImageEdit
                                            source={require("../../src/assets/right-arrow.png")}
                                            style={{ width: 13, height: 13, transform: [{ rotate: (Languages.lang == 'en') ? '0deg' : '180deg' }] }} />
                                    </TouchableOpacity>
                                    {
                                        (theProblem.Location) ?
                                            (
                                                <View style={{ flexDirection: direction.direction, alignItems: 'center' }}>
                                                    <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }} />
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5, marginRight: 5, color: 'red' }}>
                                                        لم تقم بملئ هذا الحقل
                                                    </Text>
                                                </View>
                                            ) : null
                                    }
                                </View>

                            </View>
                            <View style={{ width: "100%", alignItems: 'center' }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Languages.Adtitle}
                                    </Text>
                                </View>
                                <View style={{ width: "90%", borderRadius: 6 }}>
                                    <TextInput style={{
                                        width: "100%",
                                        height: 45,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: (color == 'dark') ? 'white' : 'black'
                                    }}
                                        value={Adtitle}
                                        onChangeText={setAdtitle}
                                        {...getTextInputProps(Adtitle)}
                                    />
                                    {
                                        (theProblem.Adtitle) ?
                                            (
                                                <View style={{ flexDirection: direction.direction, alignItems: 'center', marginTop: 5 }}>
                                                    <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }} />
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5, marginRight: 5, color: 'red' }}>
                                                        لم تقم بملئ هذا الحقل
                                                    </Text>
                                                </View>
                                            ) : null
                                    }
                                </View>
                            </View>
                            <View style={{ width: "100%", alignItems: 'center', marginTop: 10, marginBottom: 150 }}>
                                <View style={{ width: "90%", height: 1 }} lightColor="gray" darkColor="#c1c1c1" />
                                <View style={{ width: "90%", marginBottom: 5, marginTop: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        {Languages.Describewhatyouareselling}
                                    </Text>
                                </View>
                                <View style={{ width: "90%", borderRadius: 6 }}>
                                    <TextInput style={{
                                        width: "100%",
                                        height: 45,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        borderColor: 'gray',
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: (color == 'dark') ? 'white' : 'black'
                                    }}
                                        multiline={true}
                                        value={Describewhatyouareselling}
                                        onChangeText={setDescribewhatyouareselling}
                                        {...getTextInputProps(Describewhatyouareselling)}
                                    />
                                    {
                                        (theProblem.Describewhatyouareselling) ?
                                            (
                                                <View style={{ flexDirection: direction.direction, alignItems: 'center', marginTop: 5 }}>
                                                    <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5 }} />
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 5, marginRight: 5, color: 'red' }}>
                                                        لم تقم بملئ هذا الحقل
                                                    </Text>
                                                </View>
                                            ) : null
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ width: '100%', height: "10%", justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, }}>
                        <TouchableOpacity style={styles.ButtonContainer} onPress={() => {
                            Check();
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>
                                {Languages.next}
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
        marginRight: 8,
        marginLeft: 8
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