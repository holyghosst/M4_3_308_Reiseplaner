import { React, useContext, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { ThemeContext } from "../context.js";
import Themes from "../data/colorTheme.json"
import Friends from "../data/friends.json"

export default function FriendsScreen({ navigation }) {
    const { colorScheme, setColorScheme } = useContext(ThemeContext);

    const [friends, setFriends] = useState(Friends);

    return (
        <ScrollView className={"flex-1 p-4" + Themes[colorScheme].bgPrimary}>
            <View>
                <Text className={"text-2xl font-bold mt-2"+ Themes[colorScheme].textPrimary}>Friends</Text>
            </View>

            <View>
                {friends.map((friend) => (
                    <View key={friend.id} className={"mt-4 p-4 rounded-lg flex-row items-center justify-between" + Themes[colorScheme].bgSecondary}>
                        <View className="flex-row items-center">
                            <FontAwesome6 name="user" size={30} color="black" />
                            <Text className={"text-2xl ml-4"+ Themes[colorScheme].textPrimary}>{friend.name}</Text>
                        </View>
                        <Text className={"italic font-bold text-base ml-4"+ Themes[colorScheme].textPrimary}> {friend.username} </Text>

                    </View>
                ))}
            </View>

            <View className="mt-6">
                <Text className={"text-2xl font-bold"+ Themes[colorScheme].textPrimary}>Add a Friend</Text>

                <View className="mt-4 flex-row items-center">
                    <TextInput
                        className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full  p-2 flex-1'}
                        placeholder="Enter friend's name"
                        readOnly={true}
                    />
                    <TouchableOpacity className={"p-2 rounded-full ml-2" + Themes[colorScheme].bgSecondary}>
                        <Text className={"text-2xl font-semibold mx-2" + Themes[colorScheme].textPrimary}>+</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    );
};