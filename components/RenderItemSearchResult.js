import React, {useContext, useRef} from "react";
import {FlatList, Image, ImageBackground, Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import napoli from "../assets/img/routes/napoli.jpg";
import salzburg from "../assets/img/routes/salzburg.jpg";
import prague from "../assets/img/routes/prague.jpg";
import hamburg from "../assets/img/routes/hamburg.jpg";
import bodensee from "../assets/img/routes/bodensee.jpg";
import {FontAwesome6} from "@expo/vector-icons";
import {ThemeContext} from "../context";

export default function RenderItemSearchResult({item}){
    const navigation = useNavigation();
    const images = {"napoli": napoli, "salzburg": salzburg, "prague": prague, "hamburg": hamburg, "bodensee": bodensee};
    const {colorScheme, setColorScheme} = useContext(ThemeContext);

    //Renders Items for Flatlist of Search Results on HomeScreen

    return (
        <View className={'w-full p-1 overflow-hidden'}>
            <Pressable
            onPress={() => navigation.navigate('Details', {item: item})}
            >
                <View className={'flex-row items-center justify-start'}>
                        <Image source={images[item.image]} className={'w-1/4 h-24'} imageStyle={{resizeMode: 'cover'}} />
                        <View className={(colorScheme==='highContrast' ? 'border-2 ' : 'bg-gray-200 ')+'flex justify-between h-24 w-3/4 p-1'}>
                            <View className={'flex flex-row justify-between'}>
                                <View className={'flex flex-row'}>
                                    <Text className={'text-black text-xl font-bold'}>{item.title}</Text>
                                    <FontAwesome6 className={'ml-1'} name={item.isAccessible ? 'accessible-icon' : ''} size={15} color="black" />
                                </View>
                                <Text className={'text-black text-lg font-semibold mr-1'}>{item.price}</Text>

                            </View>
                            <View className={'flex-row justify-between mt-3 items-center'}>
                                <View className={'flex-row w-2/3'}>
                                    <FlatList horizontal={true} data={item.associatedPreferences.Transportation} keyExtractor={(icon) => icon.name} renderItem={(icon) => {
                                        return (<FontAwesome6 className={'mx-1'} name={icon.item.FontAwesome6Icon} size={15} color="black" />);}
                                    }/>
                                    <FlatList horizontal={true} data={item.associatedPreferences.Destinations} keyExtractor={(icon) => icon.name} renderItem={(icon) => {
                                        return (<FontAwesome6 className={'mx-1'} name={icon.item.FontAwesome6Icon} size={15} color="black" />);}
                                    }/>
                                    <FlatList horizontal={true} data={item.associatedPreferences.Activities} keyExtractor={(icon) => icon.name} renderItem={(icon) => {
                                        return (<FontAwesome6 className={'mx-1'} name={icon.item.FontAwesome6Icon} size={15} color="black" />);}
                                    }/>
                                </View>
                            </View>
                        </View>
                </View>
                </Pressable>
        </View>
    );
};