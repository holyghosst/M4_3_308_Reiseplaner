import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Switch } from 'react-native';
import Themes from "../data/colorTheme.json";
import { ThemeContext } from "../context.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccessibilityScreen({ navigation, route }) {
    const { colorScheme, setColorScheme } = useContext(ThemeContext);
    const [dichromasie, setDichromasie] = useState(false);
    const [tritanomalien, setTritanomalien] = useState(false);
    const [highcontrast, setHighcontrast] = useState(false);

    useEffect(() => {
        const loadSettings = async () => {
            try { 
                const savedDichromasie = await AsyncStorage.getItem('dichromasie');
                const savedTritanomalien = await AsyncStorage.getItem('tritanomalien');
                const savedHighcontrast = await AsyncStorage.getItem('highcontrast');

                if (savedDichromasie !== null) setDichromasie(savedDichromasie === 'true');
                if (savedTritanomalien !== null) setTritanomalien(savedTritanomalien === 'true');
                if (savedHighcontrast !== null) setHighcontrast(savedHighcontrast === 'true');
            } catch (error) {
                console.error('Failed to load accessibility settings:', error);
            }
        };

        loadSettings();
    }, []);

    const saveSettings = async () => {
        try {
            await AsyncStorage.setItem('dichromasie', dichromasie.toString());
            await AsyncStorage.setItem('tritanomalien', tritanomalien.toString());
            await AsyncStorage.setItem('highcontrast', highcontrast.toString());
        } catch (error) {
            console.error('Failed to save accessibility settings:', error);
        }
    };




    //Action to switch color scheme
    function switchColorScheme(source, value) {
        setDichromasie(false);
        setHighcontrast(false);
        setTritanomalien(false);
        if (value === false) {
            setColorScheme("default");
            return;
        }
        if (source === "dichromacy") {
            setDichromasie(true);
            setColorScheme("dichromacy");
        }
        if (source === "tritanomaly") {
            setTritanomalien(true);
            setColorScheme("tritanomaly");
        }
        if (source === "highContrast") {
            setHighcontrast(true);
            setColorScheme("highContrast");
        }
        saveSettings()

    }

    //Render of AccessibilityScreen to show the three Options for Colorblindness and impaired sight.

    return (
        <View className={'flex-1 justify-start p-7'}>
            <Text className={'text-xl ' + Themes[colorScheme].textPrimary}>
                Here you can adjust the accessibility of the application by activating different color schemes for
                several different kinds of color blindness. {'\n'}
                This application also fully supports Screenreaders like Talkback on Android. To use it just activate the
                screen reader option globally on your device.
            </Text>
            <View className={'h-0.5 w-full bg-gray-300 mt-5'}></View>
            <View className={'flex-row items-center mt-1'}>
                <Switch
                    accessibilityLabel={"Switch to turn on dichromasies"}
                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                    thumbColor={Themes[colorScheme].tabPrimary}
                    value={dichromasie}
                    onValueChange={(value) => switchColorScheme("dichromacy", value)}
                />
                <Text accessible={true} className={'text-lg font-bold' + Themes[colorScheme].textPrimary}>Dichromacy</Text>
            </View>
            <Text className={'text-base' + Themes[colorScheme].textPrimary}>
                Dichromacy modes help users who have difficulty distinguishing between two colors, such as red and green.
            </Text>
            <View className={'flex-row items-center mt-1'}>
                <Switch
                    accessibilityLabel={"Switch to turn on tritanomalies"}
                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                    thumbColor={Themes[colorScheme].tabPrimary}
                    value={tritanomalien}
                    onValueChange={(value) => switchColorScheme("tritanomaly", value)}
                />
                <Text accessible={true} className={'text-lg font-bold' + Themes[colorScheme].textPrimary}>Tritanomalies</Text>
            </View>

            <Text className={'text-base' + Themes[colorScheme].textPrimary}>
                Tritanomaly mode assists users who have a reduced sensitivity to blue light, making blue and yellow hues easier to distinguish.
            </Text>
            <View className={'flex-row items-center mt-1'}>
                <Switch
                    accessibilityLabel={"Switch to turn on high contrast"}
                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                    thumbColor={Themes[colorScheme].tabPrimary}
                    value={highcontrast}
                    onValueChange={(value) => switchColorScheme("highContrast", value)}
                />
                <Text accessible={true} className={'text-lg font-bold' + Themes[colorScheme].textPrimary}>High Contrast</Text>
            </View>
            <Text className={'text-base' + Themes[colorScheme].textPrimary}>
                High Contrast mode increases the contrast between text and background, making content more readable for users with visual impairments.
            </Text>
        </View>
    );
};