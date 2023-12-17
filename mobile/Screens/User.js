import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useBatteryLevel, useBatteryState } from "expo-battery";
import { FontAwesome as IconFA } from 'react-native-vector-icons';

const User = () => {
    const batteryLevel = useBatteryLevel();
    const batteryState = useBatteryState();

    const PriseList = () => {
        return (
            <TouchableOpacity style={stylesRec.card} >
                <View style={stylesRec.image}>
                    <Image source={{ uri: "https://us.123rf.com/450wm/chrisdorney/chrisdorney1403/chrisdorney140300040/26453776-gratuit-gratuit-dans-la-langue-fran%C3%A7aise-tampon-rouge-sur-un-fond-blanc.jpg" }} style={stylesRec.image} resizeMode='stretch' />
                </View>
                <View style={stylesRec.butonDetails}>
                    <View style={stylesRec.buttonInfo}>
                        <View>
                            <Text style={stylesRec.buttonName}>{"NomPrise"}</Text>
                            <Text style={stylesRec.buttonFonction}>{"Fonction"}</Text>
                        </View>
                        <View style={stylesRec.activationButton}>
                            <TouchableOpacity
                                style={[stylesRec.iconButton]}
                            >
                                <IconFA name="power-off" size={25} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={UserBody.body}>
            <Text>Tous mes prises: </Text>
            <PriseList />
        </View>
    )
}

const UserBody = StyleSheet.create({
    body: {
        marginHorizontal: 15
    }
})

const stylesRec = StyleSheet.create({
    card: {
        width: 400,
        height: 75,
        borderRadius: 10,
        elevation: 1,
        backgroundColor: 'green',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-berween",
        alignContent: "center",
        alignItems: "center"
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
export default User;