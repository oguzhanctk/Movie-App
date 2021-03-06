import AsyncStorage from "@react-native-community/async-storage";
import { checkDataExistence } from "./helpers";
import { ToastAndroid } from "react-native";

export const storeData = async (value, f, username) => {
    try {
        let existingData = await AsyncStorage.getItem(`@library_item_${username}`);
        if(existingData === null) {
            try {
                await AsyncStorage.setItem(`@library_item_${username}`, JSON.stringify([value]));
                f(true);
                ToastAndroid.show("Kütüphaneye eklendi", ToastAndroid.SHORT);
            } catch (error) {
                console.log(error, "MovieCard -> 30");                    
            }
        } else {
            try {
                let toArray = JSON.parse(existingData);
                if(checkDataExistence(toArray, value) === false) {
                    toArray.push(value);
                    await AsyncStorage.setItem(`@library_item_${username}`, JSON.stringify(toArray));
                    f(true);
                    ToastAndroid.show("Kütüphaneye eklendi", ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show("Bu film zaten kütüphanede", ToastAndroid.SHORT);
                }
            } catch (error) {
                console.log(error, "MovieCard -> 37")
            }
        }
    } catch (error) {
        console.log(error, "MovieCard -> 41");
    }
}

export const removeData = async (id, username) => {
        try {
            let data = await AsyncStorage.getItem(`@library_item_${username}`);
            let res = JSON.parse(data).filter(item => item.id !== id);
            try {
                await AsyncStorage.setItem(`@library_item_${username}`, JSON.stringify(res));
                ToastAndroid.show("Kütüphaneden kaldırıldı", ToastAndroid.SHORT);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
}