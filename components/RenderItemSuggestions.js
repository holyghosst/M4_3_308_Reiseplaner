import React, {useContext, useRef} from "react";
import {FlatList, ImageBackground, Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import napoli from "../assets/img/routes/napoli.jpg";
import salzburg from "../assets/img/routes/salzburg.jpg";
import prague from "../assets/img/routes/prague.jpg";
import hamburg from "../assets/img/routes/hamburg.jpg";
import bodensee from "../assets/img/routes/bodensee.jpg";
import {FontAwesome6} from "@expo/vector-icons";
import {ThemeContext} from "../context";

export default function RenderItemSuggestions({item}){
    const navigation = useNavigation();
    const images = {"napoli": napoli, "salzburg": salzburg, "prague": prague, "hamburg": hamburg, "bodensee": bodensee};
    const {colorScheme, setColorScheme} = useContext(ThemeContext);

    //Renders Items for Flatlist of Suggestions on HomeScreen

    return (
        <View className={'w-full p-1 overflow-hidden'}>
            <Pressable
            onPress={() => navigation.navigate('Details', {item: item})}
            >
            <ImageBackground source={images[item.image]} className={'w-full h-56 flex justify-end'} imageStyle={{resizeMode: 'cover'}}>
                <View style={{ backgroundColor: colorScheme==='highContrast' ? 'white' : 'rgba(255, 255, 255, 0.5)'}} className={colorScheme==='highContrast' ? 'p-2 border-2' : 'p-2'}>
                    <View className={'flex flex-row justify-between'}>
                        <View className={'flex flex-row'}>
                            <Text className={'text-black text-xl font-bold'}>{item.title}</Text>
                            <FontAwesome6 className={'ml-1'} name={item.isAccessible ? 'accessible-icon' : ''} size={15} color="black" />
                        </View>
                        <Text className={'text-black text-lg font-semibold'}>{item.price}</Text>

                    </View>
                    <View className={'flex flex-row justify-between mt-3 items-center'}>
                        <View className={'flex-row w-2/3'}>
                            <FlatList horizontal={true} data={item.associatedPreferences.Transportation} keyExtractor={(icon) => icon.name} renderItem={(icon) => {
                                return (<FontAwesome6 className={'mx-1'} name={icon.item.FontAwesome6Icon} size={20} color="black" />);}
                            }/>
                            <FlatList horizontal={true} data={item.associatedPreferences.Destinations} keyExtractor={(icon) => icon.name} renderItem={(icon) => {
                                return (<FontAwesome6 className={'mx-1'} name={icon.item.FontAwesome6Icon} size={20} color="black" />);}
                            }/>
                            <FlatList horizontal={true} data={item.associatedPreferences.Activities} keyExtractor={(icon) => icon.name} renderItem={(icon) => {
                                return (<FontAwesome6 className={'mx-1'} name={icon.item.FontAwesome6Icon} size={20} color="black" />);}
                            }/>
                            <FontAwesome6 className={'mx-1'} name={item.isAccessible ? 'accessible-icon' : ''} size={20} color="black" />
                        </View>
                        <View className={'flex w-1/3 items-end'}>
                            <View className={'flex-row items-center'}>
                                <FontAwesome6 name="calendar-days" size={15} color="black" />
                                <Text className={'ml-1'}>{item.arrivalDate}</Text>
                            </View>
                            <View className={'flex-row items-center'}>
                                <FontAwesome6 name="clock" size={15} color="black" />
                                <Text className={'ml-1'}>{item.duration}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ImageBackground>
            </Pressable>
        </View>
    );
};