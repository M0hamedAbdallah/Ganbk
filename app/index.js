import { Redirect } from "expo-router";
import React from "react";
// import { firebase } from "../firebase/config/firebase-config";
// import messaging from "@react-native-firebase/messaging";


export default function Page() {
    // firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
    //     console.log('Message handled in the background!', remoteMessage);
    // });
    return (
        <Redirect href={"/LoadingScreen"} />
    );
}
