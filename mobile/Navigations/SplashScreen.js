// SplashScreen.js
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from 'react-native-progress/Bar';

const SplashScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        checkLoggedIn();
    }, [navigation]);

    const checkLoggedIn = async () => {
        // Check if the user is already logged in
        const access_token = await AsyncStorage.getItem('access_token');
        const role = await AsyncStorage.getItem('role');

        const updateProgress = () => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + 0.1; // Ajustez selon vos besoins
                return newProgress > 1 ? 1 : newProgress; // Limitez à 1
            });
        };

        // Simulez une charge pendant 3 secondes même si les données sont chargées instantanément
        const interval = setInterval(updateProgress, 300);

        setTimeout(() => {
            clearInterval(interval);
            setLoading(false);
            if (access_token && role) {
                // Redirect the user to the appropriate page based on their role
                if (role === 'client') {
                    navigation.navigate('Client');
                } else if (role === 'vendeur') {
                    navigation.navigate('Vendeur');
                }
            }
            else {
                navigation.navigate('Login');
            }
        }, 3000);
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/Chargement.png')} style={styles.logo} />
            <View style={styles.loadingContainer}>
                {loading ? (
                    <ProgressBar
                        indeterminate={false}
                        progress={progress}
                        borderRadius={4}
                        height={6}
                        width={200}
                        color="#600150"
                        animationType="spring"
                        useNativeDriver={false}
                        animationConfig={{ bounciness: 0 }}
                    />
                ) : (
                    // Contenu de votre écran après le chargement
                    <View>
                        {/* Le contenu de votre écran après le chargement */}
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250, // Ajustez la largeur de votre logo selon vos besoins
        height: 250, // Ajustez la hauteur de votre logo selon vos besoins
        resizeMode: 'contain',
    },
    loadingContainer: {
        marginTop: 2, // Ajustez la marge selon vos besoins
    },
});

export default SplashScreen;
