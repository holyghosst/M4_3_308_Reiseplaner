import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator, DrawerToggleButton} from "@react-navigation/drawer";

import {NavigationContainer, useFocusEffect} from "@react-navigation/native";
import DetailsScreen from "./Screens/DetailsScreen";
import HomeScreen from "./Screens/HomeScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import MyRoutes from "./Screens/MyRoutes";
import FriendsScreen from "./Screens/FriendsScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {Feather, FontAwesome, FontAwesome5, Ionicons} from "@expo/vector-icons";
import AccessibilityScreen from "./Screens/AccessibilityScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useContext, useEffect, useState} from "react";
import UserData from './data/userdata.json';

import Themes from './data/colorTheme.json';
import {ThemeContext} from "./context";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
import "./global.css";

const HomeStackNavigator = ({route}) => {
    const {colorScheme, setColorScheme} = useContext(ThemeContext);
    useEffect(() => {
        setColorScheme(route.params["colorScheme"]);
    }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Tab" component={TabNavigator} initialParams={{colorScheme: colorScheme}} options={{headerShown: false}}/>
            <Stack.Screen name="Details" component={DetailsScreen} options={{title: ''}}/>
        </Stack.Navigator>
    );
}

const TabNavigator = ({route}) => {
    const {colorScheme, setColorScheme} = useContext(ThemeContext);
    useEffect(() => {
        setColorScheme(route.params["colorScheme"]);
    }, []);
    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
            <Tab.Screen
                name="Home1"
                component={HomeScreen}
                initialParams={{colorScheme: colorScheme}}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" size={size} color={color}/>
                    ),
                    tabBarActiveTintColor: Themes[colorScheme].tabPrimary,
                    tabBarInactiveTintColor: Themes[colorScheme].tabSecondary,
                    tabBarAccessibilityLabel: "Home",
                }}
            />
            <Tab.Screen
                name="Friends"
                component={FriendsScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="users" size={size} color={color}/>
                    ),
                    tabBarActiveTintColor: Themes[colorScheme].tabPrimary,
                    tabBarInactiveTintColor: Themes[colorScheme].tabSecondary,
                    tabBarAccessibilityLabel: "Friends",
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="user" size={size} color={color}/>
                    ),
                    tabBarActiveTintColor: Themes[colorScheme].tabPrimary,
                    tabBarInactiveTintColor: Themes[colorScheme].tabSecondary,
                    tabBarAccessibilityLabel: "Profile",
                }}
            />
        </Tab.Navigator>
    );
}

const storeData = async(key,value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e.toString());
    }
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log(e.toString());
    }
};



const ThemeProvider = ({children}) => {
    const [colorScheme, setColorScheme] = useState('dichromacy');
    return (
        <ThemeContext.Provider value={{colorScheme, setColorScheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default function App(navigation) {
    const [colorScheme, setColorScheme] = useState('default');
    useEffect(() => {
        storeData("username", UserData.Username);
        storeData("firstname", UserData.Firstname)
        storeData("lastname", UserData.Lastname)
        storeData("email", UserData.EMail)
        storeData("password", UserData.Password)
        storeData("activities", JSON.stringify(UserData.Preferences.Activities))
        storeData("destinations", JSON.stringify(UserData.Preferences.Destinations))
        storeData("other", JSON.stringify(UserData.Preferences.Other))
    }, []);

    return (
        <ThemeProvider>
        <NavigationContainer accessibilityLanguage="it-IT">
            <Drawer.Navigator
                screenOptions={{
                    drawerPosition: 'right',
                    headerLeft: false,
                    headerRight: () => <DrawerToggleButton accessibilityLabel={"Menu"} />
                }}
            >
                <Drawer.Screen name="Planner" component={HomeStackNavigator} initialParams={{colorScheme: colorScheme}} options={{
                    headerTitle: 'Travel Planner',
                    drawerIcon: ({color, size}) => (
                        <FontAwesome5 name="route" size={size} color={color}/>
                    )
                }}/>
                <Drawer.Screen name="My Routes" component={MyRoutes} options={{
                    drawerIcon: ({color, size}) => (
                        <Feather name="bookmark" size={size} color={color}/>
                    )
                }}/>
                <Drawer.Screen name="Accessibility" component={AccessibilityScreen} initialParams={{colorScheme: colorScheme}} options={{
                    drawerIcon: ({color, size}) => (
                        <FontAwesome5 name="accessible-icon" size={size} color={color}/>
                    )
                }}/>
            </Drawer.Navigator>
        </NavigationContainer>
        </ThemeProvider>
    );
}