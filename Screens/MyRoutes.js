import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {ThemeContext} from "../context";
import routeData from "../data/routeData.json";
import RenderItemMyRoutes from "../components/RenderItemMyRoutes";


export default function MyRoutes({navigation}){
    const {colorScheme, setColorScheme} = useContext(ThemeContext);

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
        </View>
    );
};