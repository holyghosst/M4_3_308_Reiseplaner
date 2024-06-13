import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { ThemeContext } from "../context";
import Themes from "../data/colorTheme.json";
import routeData from "../data/routeData.json";
import RenderItemMyRoutes from "../components/RenderItemMyRoutes";


export default function MyRoutes({ navigation }) {
    const { colorScheme, setColorScheme } = useContext(ThemeContext);

    const renderSearchResults = () => {
        return (
            <FlatList
                data={routeData}
                keyExtractor={(item) => item.title}
                renderItem={props => <RenderItemMyRoutes {...props} />}
            />
        )
    };

    return (
        <View className={'flex-1 justify-start items-center p-5'}>
            {renderSearchResults()}

            <Pressable
                className={'mt-5 px-5 py-2 rounded-full items-center justify-center' + Themes[colorScheme].bgSecondary}
                onPress={() => navigation.navigate('Home')}
                accessibilityLabel="Return to Homescreen"
            >
                <Text className={"text-lg font-bold" + Themes[colorScheme].textPrimary}>Return to Home</Text>
            </Pressable>
        </View>
    );
};