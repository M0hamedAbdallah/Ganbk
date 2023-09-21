import { Redirect } from "expo-router";
import React from "react";
import { I18nManager } from "react-native";


export default function Page() {
    
    return (
        <Redirect href={"/LoadingScreen"} />
    );
}
