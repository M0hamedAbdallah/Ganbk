import React, { useContext } from 'react';
import {
    StyleSheet,
    ScrollView,
    Animated,
    TextInput,
    Pressable,
} from 'react-native';
import { View, TouchableOpacity, Text, ImageEdit as Image } from '../../components/Themed';
import WordsContext from '../../src/lang/wordsContext';
import directionContext from '../../src/direction/directionContext';




const MultipleSelectList = ({
    fontFamily,
    setSelected,
    placeholder,
    boxStyles,
    inputStyles,
    dropdownStyles,
    dropdownItemStyles,
    dropdownTextStyles,
    maxHeight,
    data,
    searchicon = false,
    arrowicon = false,
    closeicon = false,
    search = true,
    searchPlaceholder = "search",
    onSelect = () => { },
    label,
    notFoundText = "No data found",
    disabledItemStyles,
    disabledTextStyles,
    disabledCheckBoxStyles,
    labelStyles,
    badgeStyles,
    badgeTextStyles,
    checkBoxStyles,
    save = 'key',
    dropdownShown = false
}) => {
    const Languages = useContext(WordsContext);
    const direction = useContext(directionContext);
    const oldOption = React.useRef(null)
    const [_firstRender, _setFirstRender] = React.useState(true);
    const [dropdown, setDropdown] = React.useState(dropdownShown);
    const [selectedval, setSelectedVal] = React.useState([]);
    const [height, setHeight] = React.useState(350)
    const animatedvalue = React.useRef(new Animated.Value(0)).current;
    const [filtereddata, setFilteredData] = React.useState(data);


    const slidedown = () => {
        setDropdown(true)

        Animated.timing(animatedvalue, {
            toValue: height,
            duration: 500,
            useNativeDriver: false,

        }).start()
    }
    const slideup = () => {

        Animated.timing(animatedvalue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,

        }).start(() => setDropdown(false))
    }

    React.useEffect(() => {
        if (maxHeight)
            setHeight(maxHeight)
    }, [maxHeight])


    React.useEffect(() => {
        setFilteredData(data);
    }, [data])


    React.useEffect(() => {
        if (_firstRender) {
            _setFirstRender(false);
            return;
        }
        onSelect()

    }, [selectedval])

    React.useEffect(() => {
        if (!_firstRender) {
            if (dropdownShown)
                slidedown();
            else
                slideup();

        }

    }, [dropdownShown])






    return (
        <View>
            {
                (dropdown && search)
                    ?
                    <View style={[styles.wrapper, boxStyles]}>
                        <View style={{ flexDirection: direction.direction, alignItems: 'center', flex: 1 }}>
                            {
                                (!searchicon)
                                    ?
                                    <Image
                                        source={require('../assets/asset/search.png')}
                                        resizeMode='contain'
                                        style={{ width: 20, height: 20, marginRight: 10, marginLeft: 10 }}
                                    />
                                    :
                                    searchicon
                            }

                            <TextInput
                                placeholder={searchPlaceholder}
                                placeholderTextColor='gray'
                                onChangeText={(val) => {
                                    let result = data.filter((item) => {
                                        val.toLowerCase();
                                        let row = item.value.toLowerCase()
                                        return row.search(val.toLowerCase()) > -1;
                                    });
                                    setFilteredData(result)
                                }}
                                style={[{ padding: 0, height: 20, flex: 1, fontFamily }, inputStyles]}
                            />
                            <TouchableOpacity onPress={() => {
                                slideup()
                                // setTimeout(() => setFilteredData(data), 800)
                            }} >
                                {
                                    (!closeicon)
                                        ?
                                        <Image
                                            source={require('../assets/asset/close.png')}
                                            resizeMode='contain'
                                            style={{ width: 17, height: 17, marginLeft: 10, marginRight: 10 }}
                                        />
                                        :
                                        closeicon
                                }
                            </TouchableOpacity>


                        </View>

                    </View>
                    :

                    (selectedval?.length > 0)

                        ?
                        <TouchableOpacity style={[styles.wrapper, boxStyles, { flexDirection: direction.direction }]} onPress={() => { if (!dropdown) { slidedown() } else { slideup() } }} >
                            <View>
                                <Text style={[{ fontWeight: '600', fontFamily }, labelStyles]}>{label}</Text>
                                <View style={{ flexDirection: direction.direction, marginBottom: 8, flexWrap: 'wrap' }}>
                                    {
                                        selectedval?.map((item, index) => {
                                            return (
                                                <View key={index} style={[{ backgroundColor: 'gray', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 50, marginRight: 10, marginTop: 10 }, badgeStyles]}>
                                                    <Text style={[{ color: 'white', fontSize: 12, fontFamily }, badgeTextStyles]}>{item}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={[styles.wrapper, boxStyles, { flexDirection: direction.direction }]} onPress={() => { if (!dropdown) { slidedown() } else { slideup() } }}>
                            <Text style={[{ fontFamily }, inputStyles]}>{(selectedval == "") ? (placeholder) ? placeholder : Languages.Selectoption : selectedval}</Text>
                            {
                                (!arrowicon)
                                    ?
                                    <Image
                                        source={require('../assets/asset/chevron.png')}
                                        resizeMode='contain'
                                        style={{ width: 20, height: 20 }}
                                    />
                                    :
                                    arrowicon
                            }

                        </TouchableOpacity>
            }

            {
                (dropdown)
                    ?
                    <Animated.View style={[{ maxHeight: animatedvalue }, styles.dropdown, dropdownStyles]}>
                        <View style={[{ maxHeight: height }]}>
                            <ScrollView contentContainerStyle={{ paddingVertical: 10 }} nestedScrollEnabled={true}>

                                {
                                    (filtereddata.length >= 1)
                                        ?
                                        filtereddata.map((item, index) => {
                                            let key = item.key ?? item.value ?? item;
                                            let value = item.value ?? item;
                                            let disabled = item.disabled ?? false;
                                            if (disabled) {
                                                return (
                                                    <TouchableOpacity style={[styles.disabledoption, disabledItemStyles]} key={index}>
                                                        <View style={[{ width: 15, height: 15, marginRight: 10, marginLeft: 10, borderRadius: 3, justifyContent: 'center', alignItems: 'center' }, disabledCheckBoxStyles]}>

                                                            {
                                                                (selectedval?.includes(value))
                                                                    ?

                                                                    <Image
                                                                        key={index}
                                                                        source={require('../assets/asset/check.png')}
                                                                        resizeMode='contain'
                                                                        style={[{ width: 8, height: 8, paddingLeft: 7 }]}
                                                                    />

                                                                    :
                                                                    null

                                                            }
                                                        </View>
                                                        <Text style={[{ fontFamily, color: '#c4c5c6' }, disabledTextStyles]}>{value}</Text>
                                                    </TouchableOpacity>
                                                )
                                            } else {
                                                return (
                                                    <TouchableOpacity style={[styles.option, dropdownItemStyles, { flexDirection: direction.direction }]} key={index} onPress={() => {


                                                        let existing = selectedval?.indexOf(value)


                                                        // console.log(existing);

                                                        if (existing != -1 && existing != undefined) {

                                                            let sv = [...selectedval];
                                                            sv.splice(existing, 1)
                                                            setSelectedVal(sv);


                                                            setSelected((val) => {
                                                                let temp = [...val];
                                                                temp.splice(existing, 1)
                                                                return temp;
                                                            });

                                                            // onSelect()
                                                        } else {
                                                            if (save === 'value') {
                                                                setSelected((val) => {
                                                                    let temp = [...new Set([...val, value])];
                                                                    return temp;
                                                                })
                                                            } else {
                                                                setSelected((val) => {
                                                                    let temp = [...new Set([...val, key])];
                                                                    return temp;
                                                                })
                                                            }

                                                            setSelectedVal((val) => {
                                                                let temp = [...new Set([...val, value])];
                                                                return temp;
                                                            })


                                                            // onSelect()
                                                        }



                                                    }}>
                                                        <View style={[{ width: 15, height: 15, borderWidth: 1, marginRight: 10, marginLeft: 10, borderColor: 'gray', borderRadius: 3, justifyContent: 'center', alignItems: 'center' }, checkBoxStyles]}>

                                                            {
                                                                (selectedval?.includes(value))
                                                                    ?

                                                                    <Image
                                                                        key={index}
                                                                        source={require('../assets/asset/check.png')}
                                                                        resizeMode='contain'
                                                                        style={{ width: 8, height: 8, paddingLeft: 7 }}
                                                                    />

                                                                    :
                                                                    null

                                                            }




                                                        </View>
                                                        <Text style={[{ fontFamily }, dropdownTextStyles]}>{value}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }

                                        })
                                        :
                                        <TouchableOpacity style={[styles.option, dropdownItemStyles]} onPress={() => {
                                            setSelected(undefined)
                                            setSelectedVal("")
                                            slideup()
                                            setTimeout(() => setFilteredData(data), 800)
                                        }}>
                                            <Text style={dropdownTextStyles}>{notFoundText}</Text>
                                        </TouchableOpacity>
                                }



                            </ScrollView>

                            {
                                (selectedval?.length > 0)
                                    ?
                                    <Pressable>
                                        <View style={{ flexDirection: direction.direction, justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20 }}>
                                            <Text style={{ marginRight: 10, marginLeft: 10, fontWeight: '600', fontFamily }}>{Languages.Selected}</Text>
                                            <View style={{ height: 1, flex: 1, backgroundColor: 'gray' }} />
                                        </View>
                                        <View style={{ flexDirection: direction.direction, paddingHorizontal: 20, marginBottom: 20, flexWrap: 'wrap' }}>

                                            {
                                                selectedval?.map((item, index) => {
                                                    return (
                                                        <View key={index} style={[{ backgroundColor: 'gray', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 50, marginRight: 10, marginTop: 10 }, badgeStyles]}>
                                                            <Text style={[{ color: 'white', fontSize: 12, fontFamily }, badgeTextStyles]}>{item}</Text>
                                                        </View>
                                                    )
                                                })
                                            }

                                        </View>
                                    </Pressable>
                                    :
                                    null
                            }



                        </View>

                    </Animated.View>
                    :
                    null
            }


        </View>
    )
}

export default MultipleSelectList;

const styles = StyleSheet.create({
    wrapper: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    dropdown: { borderWidth: 1, borderRadius: 10, borderColor: 'gray', overflow: 'hidden' },
    option: { paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' },
    disabledoption: { paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', backgroundColor: 'whitesmoke' }

})
