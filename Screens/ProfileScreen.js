import React, { useState, useEffect, useRef, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import Themes from "../data/colorTheme.json";
import { ThemeContext } from "../context";
import { FontAwesome6 } from "@expo/vector-icons";


export default function ProfileScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activities, setActivities] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [other, setOther] = useState([]);

    const { colorScheme, setColorScheme } = useContext(ThemeContext);

    const [tempUsername, setTempUsername] = useState('');
    const [tempFirstname, setTempFirstname] = useState('');
    const [tempLastname, setTempLastname] = useState('');
    const [tempEmail, setTempEmail] = useState('');

    const loadUserData = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            const firstname = await AsyncStorage.getItem('firstname');
            const lastname = await AsyncStorage.getItem('lastname');
            const email = await AsyncStorage.getItem('email');
            const password = await AsyncStorage.getItem('password');
            const activities = await AsyncStorage.getItem('activities');
            const destinations = await AsyncStorage.getItem('destinations');
            const other = await AsyncStorage.getItem('other');

            if (username !== null) setUsername(username);
            if (firstname !== null) setFirstname(firstname);
            if (lastname !== null) setLastname(lastname);
            if (email !== null) setEmail(email);
            if (password !== null) setPassword(password);
            if (activities !== null) setActivities(JSON.parse(activities));
            if (destinations !== null) setDestinations(JSON.parse(destinations));
            if (other !== null) setOther(JSON.parse(other));
        } catch (error) {
            console.log(error.toString());
        }
    };

    const handleSaveChanges = async () => {
        try {
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('firstname', firstname);
            await AsyncStorage.setItem('lastname', lastname);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('password', password);
            await AsyncStorage.setItem('activities', JSON.stringify(activities));
            await AsyncStorage.setItem('destinations', JSON.stringify(destinations));
            await AsyncStorage.setItem('other', JSON.stringify(other));

            if (tempUsername.length !== 0) setUsername(tempUsername);
            if (tempFirstname.length !== 0) setFirstname(tempFirstname);
            if (tempLastname.length !== 0) setLastname(tempLastname);
            if (tempEmail.length !== 0) setEmail(tempEmail);

            setTempUsername('');
            setTempFirstname('');
            setTempLastname('');
            setTempEmail('');

        } catch (error) {
            console.log(error.toString());
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <ScrollView className={"flex-1 px-2" + Themes[colorScheme].bgPrimary}>
            <View className={"flex-row items-center flex-shrink" + Themes[colorScheme].bgPrimary}>
                <View className="justify-left" >
                    <FontAwesome6 name="circle-user" size={110} className="m-5" />
                </View>
                <View className={"flex-shrink" + Themes[colorScheme].bgPrimary}>
                    <Text className={"text-xl mt-2" + Themes[colorScheme].textPrimary}>{firstname}</Text>
                    <Text className={"text-xl" + Themes[colorScheme].textPrimary}>{lastname}</Text>
                    <Text className={"text-xl" + Themes[colorScheme].textPrimary}>{email}{"\n"}</Text>
                    <Text className={"italic font-bold text-xl" + Themes[colorScheme].textPrimary}>@{username} </Text>
                </View>
            </View>
            <View className={'h-0.5 w-full bg-gray-300 mt-5'}></View>

            <Text className={"mt-2 mx-2 text-2xl font-bold" + Themes[colorScheme].textPrimary}>Your Preferences</Text>

            <View className={'flex-row justify-between items-baseline px-2'}>
                <View>
                    <Text className={"mt-2 mx-2 text-xl font-semibold" + Themes[colorScheme].textPrimary}>Activities: </Text>
                    {activities.map((item, index) => (
                        <View key={index} className={"flex-row ml-5 items-center mt-2"}>
                            <FontAwesome6 name={item[0]} size={20} color="black" />
                            <Text className="text-xl ml-2"> {item[1]}</Text>
                        </View>
                    ))}
                </View>

                <View>
                    <Text className={"mt-2 mx-2 text-xl font-semibold" + Themes[colorScheme].textPrimary}>Destinations: </Text>
                    {destinations.map((item, index) => (
                        <View key={index} className={"flex-row ml-5 items-center mt-2"}>
                            <FontAwesome6 name={item[0]} size={20} color="black" />
                            <Text className="text-xl ml-2"> {item[1]}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <Text className={"mt-2 mx-2 text-xl font-semibold ml-4" + Themes[colorScheme].textPrimary}>Other: </Text>
            {other.map((item, index) => (
                <View key={index} className={"flex-row ml-5 pl-4 items-center mt-2"}>
                    <FontAwesome6 name={item[0]} size={20} color="black" />
                    <Text className="text-xl ml-2"> {item[1]}</Text>
                </View>
            ))}

            <TouchableOpacity>
                <View className={"flex-row mt-4 pl-4 items-center"}>
                    <FontAwesome6 name="plus" size={20} color="black" />
                    <Text className="text-xl ml-1" > add preferences</Text>
                </View>

            </TouchableOpacity>

            <View className={'h-0.5 w-full bg-gray-300 mt-5'}></View>

            <Text className={"mt-2 mx-2 text-2xl font-bold" + Themes[colorScheme].textPrimary}>Change Profile</Text>

            <View className={'flex justify-center items-center'}><TextInput
                className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full  p-2 mt-5 w-11/12'}
                onChangeText={setTempFirstname}
                placeholder={'First Name: ' + firstname}
                value={tempFirstname}
                maxLength={15}
            />

                <TextInput
                    className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full  p-2 mt-5 w-11/12'}
                    onChangeText={setTempLastname}
                    placeholder={'Last Name: ' + lastname}
                    value={tempLastname}
                    maxLength={30}
                />

                <TextInput
                    className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full  p-2 mt-5 w-11/12'}
                    onChangeText={setTempUsername}
                    placeholder={'Username: ' + username}
                    value={tempUsername}
                    maxLength={30}
                />

                <TextInput
                    className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full  p-2 mt-5 w-11/12'}
                    onChangeText={setTempEmail}
                    placeholder={'E-Mail: ' + email}
                    value={tempEmail}
                    inputMode='email'
                /></View>
            <View className="flex-1 justify-center items-center">
                <Pressable className={'px-5 py-2 rounded-full mt-5 ' + Themes[colorScheme].bgSecondary}
                    onPress={handleSaveChanges}>
                    <Text className="text-lg font-semibold">Save changes</Text>
                </Pressable>
            </View>

            <View className={'h-0.5 w-full bg-gray-300 mt-5'}></View>
            <Pressable className={'px-5 py-2 rounded-full mt-5 bg-red-600 items-center'}
                onPress={handleSaveChanges}>
                <Text className="text-lg font-semibold">DELETE PROFILE</Text>
            </Pressable>

        </ScrollView>
    );
};