import React, { memo, useEffect, useState } from "react";
import { TouchableOpacity } from "../../components/Themed";
import { Image, useColorScheme, } from "react-native";
import auth, { db } from "../../firebase/config/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { router } from "expo-router";

function Love({ likeArray, dataSort, num }) {
    const [user,setUser] = useState(auth.currentUser);
    const [like, setLike] = useState(false);
    const [theNumValue, setTheNumValue] = useState();
    const color = useColorScheme();

    useEffect(() => {
        setUser(auth.currentUser)
        for (let index = 0; index < likeArray.length; index++) {
            if (dataSort[num] == likeArray[index]) {
                if (auth.currentUser) {
                    setLike(true);
                    setTheNumValue(dataSort[num]);
                }else{
                    setLike(false);
                }
            }
        }
        console.log(0)
    },[user])

    const update = async (value) => {
        if (!auth.currentUser) {
            router.push('/Login')
        } else {
            const UserRefLike = doc(db, "Users", user.uid);
            const docSnapLike = await getDoc(UserRefLike);
            if (value === false) {
                if (docSnapLike.data() != null) {
                    const LikeArray = docSnapLike.data().Love;
                    await updateDoc(UserRefLike, {
                        Love: [...LikeArray, dataSort[num]]
                    })
                }
            } else {
                if (docSnapLike.data() != null) {
                    const LikeArray = docSnapLike.data().Love;
                    const index = LikeArray?.indexOf(dataSort[num]);
                    console.log(index)
                    LikeArray.splice(index, 1);
                    await updateDoc(UserRefLike, {
                        Love: LikeArray
                    })
                }
            }
        }
        console.log(user)
    }

    return (
        <>
            <TouchableOpacity style={{ width: "10%" }} onPress={async () => {
                await update(like).then((res) => {
                    if (auth.currentUser) {
                        setLike(!like);
                    }else{
                        setLike(false)
                    }
                })
            }}>
                {(like) ? (
                    <Image style={{ width: 15, height: 15 }} source={require('../../src/assets/heart1.png')} />
                ) : (
                    <Image style={{ width: 15, height: 15 }} source={require('../../src/assets/heart.png')} tintColor={(color == "light") ? "black" : 'white'} />
                )}
            </TouchableOpacity>
        </>
    )
}

export default memo(Love);