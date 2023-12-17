import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useBatteryLevel, useBatteryState } from "expo-battery";
import { FontAwesome as IconFA } from 'react-native-vector-icons';
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Activity = () => {
    const batteryLevel = useBatteryLevel();
    const batteryState = useBatteryState();
    const navigation = useNavigation();

    const handleNavigation = (item) => {
        navigation.navigate(item)
    }

    const priseData = [
        {
            id: 1,
            image: "https://us.123rf.com/450wm/chrisdorney/chrisdorney1403/chrisdorney140300040/26453776-gratuit-gratuit-dans-la-langue-fran%C3%A7aise-tampon-rouge-sur-un-fond-blanc.jpg",
            nom: "AsterX",
            fonction: "Chargeur",
            icon: "power-off",
            screen: "PhoneCharging"
        },
        {
            id: 2,
            image: "https://us.123rf.com/450wm/chrisdorney/chrisdorney1403/chrisdorney140300040/26453776-gratuit-gratuit-dans-la-langue-fran%C3%A7aise-tampon-rouge-sur-un-fond-blanc.jpg",
            nom: "ObelX",
            fonction: "Lampe"
        },
    ]

    const PriseList = ({ item }) => {
        return (
            <TouchableOpacity style={stylesRec.card} onPress={() => handleNavigation(item.screen)}>
                <View style={stylesRec.image}>
                    <IconFA name={item.icon} size={20} />
                </View>
                <View style={stylesRec.butonDetails}>
                    <View style={stylesRec.buttonInfo}>
                        <View>
                            <Text style={stylesRec.buttonName}>{item.nom}</Text>
                            <Text style={stylesRec.buttonFonction}>{item.fonction}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={ActivityBody.body}>
            <Text>Toutes les fonctionnalites: </Text>
            <FlatList
                data={priseData}
                keyExtractor={(item) => item.id}
                renderItem={PriseList}
            />
        </View>
    )
}

const ActivityBody = StyleSheet.create({
    body: {
        marginHorizontal: 15
    }
})

const stylesRec = StyleSheet.create({
    card: {
        width: 400,
        height: 50,
        borderRadius: 10,
        elevation: 1,
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-berween",
        alignContent: "center",
        alignItems: "center",
        marginBottom: 5,
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 10,
    },
    butonDetails: {
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',
    },
    buttonName: {
        color: "black",
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonFonction: {
        color: "black",
        fontSize: 16,
    },
    activationButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: "blue",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center"
    },
    activationButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,

    },
});
export default Activity;