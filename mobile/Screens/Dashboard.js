import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useBatteryLevel, useBatteryState } from "expo-battery";
import * as Battery from "expo-battery";
import { FontAwesome as IconFA } from 'react-native-vector-icons';
import { Button } from "react-admin";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

const Dashboard = () => {
    const batteryLevel = useBatteryLevel();
    const batteryState = useBatteryState();

    const priseData = [
        {
            id: 1,
            image: "https://us.123rf.com/450wm/chrisdorney/chrisdorney1403/chrisdorney140300040/26453776-gratuit-gratuit-dans-la-langue-fran%C3%A7aise-tampon-rouge-sur-un-fond-blanc.jpg",
            nom: "AsterX",
            fonction: "Chargeur"
        },
        {
            id: 2,
            image: "https://us.123rf.com/450wm/chrisdorney/chrisdorney1403/chrisdorney140300040/26453776-gratuit-gratuit-dans-la-langue-fran%C3%A7aise-tampon-rouge-sur-un-fond-blanc.jpg",
            nom: "ObelX",
            fonction: "Lampe"
        },
    ]

    const data = {
        developerId: "-Nlm405kvoyi-rOmfyIZ",
        email: "eddy.celestin.raf@gmail.com",
        deviceId: "bffa13857490cbdb08lefs",
        switch_status: "ON"
    }

    const mamono = async () => {
        console.log("votsindry")
        console.log(data)

        let response = await axios({
            method: 'POST',
            url: `https://us-central1-boulou-functions-for-devs.cloudfunctions.net/boulou_switch_device`,
            data: data,
            responseType: "json"
        });
        console.log(response)
    }

    Battery.addBatteryLevelListener(({ batteryLevel }) => {
        if (batteryLevel === 1) {
            mamono();
        }
    });

    const infoConso = (title, value) => {
        return (
            <View style={{ borderWidth: 1, borderColor: '#600150', borderRadius: 10, padding: 20, margin: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{title}</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>{value}</Text>
            </View>
        )
    };

    const SwitchBouton = () => {
        return (
            <View>
                <TouchableOpacity onPress={() => mamono()}>
                    <Text>Appuyer</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const PriseList = ({ item }) => {
        return (
            <TouchableOpacity style={stylesRec.card} >
                <View style={stylesRec.image}>
                    <Image source={{ uri: item.image }} style={stylesRec.image} resizeMode='stretch' />
                </View>
                <View style={stylesRec.butonDetails}>
                    <View style={stylesRec.buttonInfo}>
                        <View>
                            <Text style={stylesRec.buttonName}>{item.nom}</Text>
                            <Text style={stylesRec.buttonFonction}>{item.fonction}</Text>
                        </View>
                        <View style={stylesRec.activationButton}>
                            <TouchableOpacity style={[stylesRec.iconButton]}>
                                <IconFA name="power-off" size={25} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={dashboardBody.body}>
            <Text>Mes consommations: </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {infoConso('Vidiny', "1500ar")}
                {infoConso("Puissance", "1500ar")}
                {infoConso("Tension", "1500ar")}
                {infoConso("Intensite", "1500ar")}
                {infoConso("VIdiny", "1500ar")}
            </ScrollView>
            <Text>Tous mes prises: </Text>
            <FlatList 
                data={priseData}
                keyExtractor={(item) => item.id}
                renderItem={PriseList}
            />
            <SwitchBouton />
        </View>
    )
}

const dashboardBody = StyleSheet.create({
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
export default Dashboard;