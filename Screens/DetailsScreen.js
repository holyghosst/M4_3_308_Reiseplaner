import { React, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Themes from "../data/colorTheme.json"
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome6 } from "@expo/vector-icons";

import napoli from "../assets/img/routes/napoli.jpg";
import salzburg from "../assets/img/routes/salzburg.jpg";
import prague from "../assets/img/routes/prague.jpg";
import bodensee from "../assets/img/routes/bodensee.jpg";
import hamburg from "../assets/img/routes/hamburg.jpg";
import { ThemeContext } from "../context.js";
import Friends from "../data/friends.json"


export default function DetailsScreen({ route }) {
    const { item } = route.params;
    const images = { "napoli": napoli, "salzburg": salzburg, "prague": prague, "bodensee": bodensee, "hamburg": hamburg };
    const { colorScheme, setColorScheme } = useContext(ThemeContext);
    const [friends, setFriends] = useState(Friends)

    return (
        <ScrollView className={"px-2" + Themes[colorScheme].bgPrimary}>
            <View className="items-center flex-row justify-between">
                <Text className={"text-2xl font-bold" + Themes[colorScheme].textPrimary}>{item.title}</Text>
                <TouchableOpacity>
                    <FontAwesome6 name="bookmark" size={25} />
                </TouchableOpacity>

            </View>

            <View className="flex-1 items-center my-4">
                <Image source={images[item.image]} className={'h-48 w-full'} imageStyle={{ resizeMode: 'cover' }} />
            </View>

            <Text className={"text-xl mt-2 ml-2 font-bold" + Themes[colorScheme].textPrimary}>Quick Overview</Text>

            <View className="flex-row flex-1 items-center justify-between">
                <View className={'flex w-1/3 m-4'}>
                    <View className={'flex-row items-center'}>
                        <FontAwesome6 name="calendar-days" size={25} color="black" />
                        <Text className={'text-xl ml-2'}>{item.arrivalDate}</Text>
                    </View>
                    <View className={'flex-row items-center mt-3'}>
                        <FontAwesome6 name="clock" size={25} color="black" />
                        <Text className={'text-xl ml-2'}>{item.duration}</Text>
                    </View>
                </View>

                <View className={"flex w-1/3  m-4"}>
                    <View className={"flex-row items-center"}>
                        <FontAwesome6 name="money-bill" size={25} />
                        <Text className={"text-xl ml-2"}>{item.price}</Text>
                    </View>
                    <View className={"flex-row items-center mt-3"}>
                        <FontAwesome6 name="accessible-icon" size={25} />
                        <Text accessibilityLabel={"accessible entries and transportation"} className={"text-xl ml-4"}>{item.isAccessible ? "yes" : "no"}</Text>
                    </View>
                </View>

            </View>

            <View className={'h-0.5 w-full bg-gray-300 mt-5'}></View>

            <View className="flex-row items-center justify-between ml-2">
                <Text className={"text-xl mt-2 font-bold" + Themes[colorScheme].textPrimary}>Arrival</Text>
                <TouchableOpacity>
                    <FontAwesome6 className="mt-2" name="wrench" size={20} />
                </TouchableOpacity>
            </View>


            <View>
                <View className="flex-row items-center m-4 justify-between">
                    <View className={"flex-row items-center"}>
                        <FontAwesome6 name="clock" size={25} color="black" />
                        <Text className={"text-xl ml-4" + Themes[colorScheme].textPrimary}>{item.arrival.startTime} - {item.arrival.endTime}</Text>
                    </View>
                    <View className={"flex-row items-center"}>
                        <FontAwesome6 name="calendar-days" size={25} color="black" />
                        <Text className={"text-xl ml-4" + Themes[colorScheme].textPrimary}>{item.arrivalDate}</Text>
                    </View>

                </View>
            </View>

            <View>
                {item.arrival.details.map((detail, index) => (
                    <View key={index} className={(colorScheme === "highContrast" ? ' bg-white border-2 border-black' : Themes[colorScheme].bgSecondary) + ' mt-2 p-4 rounded-lg'}>
                        <View className="flex-row items-center">
                            <FontAwesome6 name={detail.meansOfTransport} size={25} color="black" />
                            <Text className={"text-xl ml-4 flex-1 italic" + Themes[colorScheme].textPrimary}> You will be going by {detail.meansOfTransport}</Text>
                        </View>
                        <View className="flex-row items-center mt-2">
                            <FontAwesome6 name="clock" size={25} color="black" />
                            <Text className={"text-xl ml-4 flex-1 italic" + Themes[colorScheme].textPrimary}>{detail.startTime} - {detail.endTime}</Text>
                        </View>
                        <View className="flex-row items-center mt-2">
                            <FontAwesome6 name="map-location" size={25} color="black" />
                            <Text className={"text-xl ml-4 italic flex-1" + Themes[colorScheme].textPrimary}>{detail.startStation} → {detail.endStation}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View className={'h-0.5 w-full bg-gray-300 mt-5'}></View>


            <View className="flex-row items-center justify-between ml-2">
                <Text className={"text-xl mt-2 font-bold" + Themes[colorScheme].textPrimary}>Suggested Hotel</Text>
                <TouchableOpacity>
                    <FontAwesome6 className="mt-2" name="wrench" size={20} />
                </TouchableOpacity>
            </View>

            <View className={(colorScheme === "highContrast" ? ' bg-white border-2 border-black' : Themes[colorScheme].bgSecondary) + ' mt-2 p-4 rounded-lg'}>
                <View className="flex-row items-center mt-2">
                    <FontAwesome6 name="hotel" size={25} color="black" />
                    <Text className={"text-xl ml-4 flex-1 italic" + Themes[colorScheme].textPrimary}>{item.suggestedHotel.name}</Text>
                </View>
                <TouchableOpacity onPress={() => Linking.openURL(item.suggestedHotel.homepage)}>
                    <Text className="text-blue-500 mt-2">{item.suggestedHotel.homepage}</Text>
                </TouchableOpacity>

            </View>


            <View className={'h-0.5 w-full bg-gray-300 mt-5'}></View>

            <View className="flex-row items-center justify-between ml-2">
                <Text className={"text-xl mt-2 font-bold" + Themes[colorScheme].textPrimary}>Suggested Activities</Text>
                <TouchableOpacity>
                    <FontAwesome6 className="mt-2" name="wrench" size={20} />
                </TouchableOpacity>
            </View>

            {item.suggestedActivities.map((activity, index) => (
                <View key={index} className={(colorScheme === "highContrast" ? ' bg-white border-2 border-black' : Themes[colorScheme].bgSecondary) + ' mt-2 p-4 rounded-lg'}>
                    <View className="flex-row items-center mt-2">
                        <FontAwesome6 name="person-biking" size={25} color="black" />
                        <Text className={"text-xl ml-4 italic flex-1" + Themes[colorScheme].textPrimary}>{activity.name}</Text>
                    </View>
                    {activity.homepage !== 'NA' && (
                        <TouchableOpacity onPress={() => Linking.openURL(activity.homepage)}>
                            <Text className="text-blue-500 mt-2">{activity.homepage}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ))}

            <View className={'h-0.5 w-full bg-gray-300 mt-5'}></View>

            <View className="flex-row items-center justify-between ml-2">
                <Text className={"text-xl mt-2 font-bold" + Themes[colorScheme].textPrimary}>Suggested Restaurants</Text>
                <TouchableOpacity>
                    <FontAwesome6 className="mt-2" name="wrench" size={20} />
                </TouchableOpacity>
            </View>
            <View>
                {item.suggestedRestaurants.map((restaurant, index) => (
                    <View key={index} className={(colorScheme === "highContrast" ? ' bg-white border-2 border-black' : Themes[colorScheme].bgSecondary) + ' mt-2 p-4 rounded-lg'}>
                        <View className="flex-row items-center mt-2">
                            <FontAwesome6 name="utensils" size={25} color="black" />
                            <Text className={"text-xl ml-4 flex-1 italic" + Themes[colorScheme].textPrimary}>{restaurant.name}</Text>
                        </View>

                        <TouchableOpacity onPress={() => Linking.openURL(restaurant.mapsLink)}>
                            <Text className="text-blue-500 mt-2">{restaurant.mapsLink}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View className={'h-0.5 w-full bg-gray-300 mt-5'}></View>
            <View className="flex-row items-center justify-between ml-2">
                <Text className={"text-xl mt-2 font-bold" + Themes[colorScheme].textPrimary}>Departure</Text>
                <TouchableOpacity>
                    <FontAwesome6 className="mt-2" name="wrench" size={20} />
                </TouchableOpacity>
            </View>

            <View>
                <View className="flex-row items-center justify-between m-4">
                    <View className={"flex-row items-center"}>
                        <FontAwesome6 name="clock" size={25} color="black" />
                        <Text className={"text-xl ml-4" + Themes[colorScheme].textPrimary}>{item.departure.startTime} - {item.departure.endTime}</Text>
                    </View>
                    <View className={"flex-row items-center"}>
                        <FontAwesome6 name="calendar-days" size={25} color="black" />
                        <Text className={"text-xl ml-4" + Themes[colorScheme].textPrimary}>{item.departureDate}</Text>
                    </View>
                </View>
            </View>

            <View className="mb-2">
                {item.departure.details.map((detail, index) => (
                    <View key={index} className={(colorScheme === "highContrast" ? ' bg-white border-2 border-black' : Themes[colorScheme].bgSecondary) + ' mt-2 p-4 rounded-lg'}>
                        <View className="flex-row items-center">
                            <FontAwesome6 name={detail.meansOfTransport} size={25} color="black" />
                            <Text className={"text-xl ml-4 flex-1 italic" + Themes[colorScheme].textPrimary}> You will be going by {detail.meansOfTransport}</Text>
                        </View>
                        <View className="flex-row items-center mt-2">
                            <FontAwesome6 name="clock" size={25} color="black" />
                            <Text className={"text-xl ml-4 flex-1 italic" + Themes[colorScheme].textPrimary}>{detail.startTime} - {detail.endTime}</Text>
                        </View>
                        <View className="flex-row items-center mt-2">
                            <FontAwesome6 name="map-location" size={25} color="black" />
                            <Text className={"text-xl ml-4 italic flex-1" + Themes[colorScheme].textPrimary}>{detail.startStation} → {detail.endStation}</Text>
                        </View>
                    </View>
                ))}
            </View>


            <Text className={"text-xl mt-2 ml-2 font-bold" + Themes[colorScheme].textPrimary}>Invite friends to travel with you!</Text>
            <View className="mb-4">
                {friends.map((friend) => (
                    <View key={friend.id} className={"mt-4 p-4 rounded-lg flex-row items-center justify-between" + Themes[colorScheme].bgSecondary}>
                        <View className="flex-row items-center">
                            <FontAwesome6 name="user" size={30} color="black" />
                            <Text className={"text-2xl ml-4" + Themes[colorScheme].textPrimary}>{friend.name}</Text>
                        </View>
                        <TouchableOpacity>
                            <View className="flex-row items-center">
                                <FontAwesome6 name="share-nodes" size={30} />
                                <Text className="text-2xl ml-2"> Share</Text>
                            </View>

                        </TouchableOpacity>

                    </View>
                ))}
            </View>

        </ScrollView >
    );
};