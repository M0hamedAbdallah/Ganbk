import React, { useState, useEffect, useContext } from 'react';
import { useLocalSearchParams } from 'expo-router';
import DuplexForSale from '../../components/Properties/DuplexForSale';
import DuplexForRent from '../../components/Properties/DuplexForRent';
import VillasForSale from '../../components/Properties/VillasForSale';
import VillasForRent from '../../components/Properties/VillasForRent';
import HomesForSale from '../../components/Properties/HomesForSale';
import HomesForRent from '../../components/Properties/HomesForRent';
import CommercialForSale from '../../components/Properties/CommercialForSale';
import CommercialForRent from '../../components/Properties/CommercialForRent';
import BuildingsAndLands from '../../components/Properties/BuildingsAndLands';
import WordsContext from '../../src/lang/wordsContext';

export default function AddPhotosScreen() {
    const Languages = useContext(WordsContext);
    const { id, from } = useLocalSearchParams();


    if (id == Languages.ApartmentsDuplexforSale) {
        return (
            <DuplexForSale id={id} from={from} />
        )
    }

    if (id == Languages.ApartmentsDuplexforRent) {
        return (
            <DuplexForRent id={id} from={from} />
        )
    }

    if (id == Languages.VillasForSale) {
        return (
            <VillasForSale id={id} from={from} />
        )
    }

    if (id == Languages.VillasForRent) {
        return (
            <VillasForRent id={id} from={from} />
        )
    }

    if (id == Languages.VacationHomesforSale) {
        return (
            <HomesForSale id={id} from={from} />
        )
    }

    if (id == Languages.VacationHomesforRent) {
        return (
            <HomesForRent id={id} from={from} />
        )
    }

    if (id == Languages.CommercialforSale) {
        return (
            <CommercialForSale id={id} from={from} />
        )
    }

    if (id == Languages.CommercialforRent) {
        return (
            <CommercialForRent id={id} from={from} />
        )
    }

    if (id == Languages.BuildingsLands) {
        return (
            <BuildingsAndLands id={id} from={from} />
        )
    }

}
