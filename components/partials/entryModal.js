import react, { useContext, useEffect, useState } from "react";
import { Image, LayoutAnimation, Modal, Pressable, Switch, Text, TextInput, View } from "react-native";
import UserData from "../../data/userdata.json";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import Themes from "../../data/colorTheme.json";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ThemeContext } from "../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const entryModal = () => {
    const [ModalVisible, setModalVisible] = useState(true);
    const [AccessibilityVisible, setAccessibilityVisible] = useState(false);

    const [activeStep, setActiveStep] = useState(1);
    const { colorScheme, setColorScheme } = useContext(ThemeContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [firstactive, setFirstActive] = useState(false);
    const [secondactive, setSecondActive] = useState(false);
    const [thirdactive, setThirdActive] = useState(false);

    const [dichromasie, setDichromasie] = useState(false);
    const [tritanomalien, setTritanomalien] = useState(false);
    const [highcontrast, setHighcontrast] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

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



    //Action to Skip Intro Modal
    function skipEntry() {
        setModalVisible(false);
    }

    //Action to Switch Color Scheme
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

    //Action to go to the next step in the intro
    function nextStep() {
        LayoutAnimation.easeInEaseOut();
        if (activeStep > 8) {
            setModalVisible(false);
            return;
        }
        if (activeStep === 1) {
            setAccessibilityVisible(true);
        }
        setActiveStep(activeStep + 1);
        if (activeStep >= 5) {
            setFirstActive(false);
            setSecondActive(false);
            setThirdActive(false);
        }
    }

    //Action to handle Login. Does only perform a clear text check with UserData loaded from a JSON-file
    function handleLogin() {
        if (email === UserData["E-Mail"] && password === UserData.Password) {
            LayoutAnimation.spring();
            setModalVisible(false);
        } else {
            setErrorMessage('Wrong password or email');
        }
    }

    //Action to handle SignUp. Does only show an Alert informing that SignUp is not implemented
    function handleFakeSignUp() {
        nextStep();
        alert("Sign Up is not implemented!\nYou are logged in with testuser@localhost.at\nAnyway you can experience intro-path to set your preferences. Let's go!");
    }

    //Action to close the Accessibility-Modal in the intro
    function CloseAndSaveAccessibility() {
        setAccessibilityVisible(false);
        saveSettings()
    }

    //Collection of texts shown in the intro
    const entryTexts = {
        1: "Welcome! I am Travis!\nYour personal travel assistant.\nI will help you generate your individual travel route.",
        2: "Just before we start:\nAfter this short introduction, you can adjust your accessibility options at the menu to the right. If you need anything right now, you can activate it at the top!",
        5: "I am pleased to welcome you as our newest member. To learn you preferences in regards of traveling I will show you a few pictures. You choose one or more pictures that comply with your preferences."
    }

    //Rendering of different parts of the intro based on current step and loading different texts form the collection above
    const renderEntryText = () => {
        return ((activeStep <= 2 || activeStep === 5) ?
            <View className={'flex-1 justify-center items-center' + Themes[colorScheme].bgPrimary}>
                <View className={'rounded-2xl p-5 m-5 ml-20' + Themes[colorScheme].bgSecondary}
                    accessible={true}>
                    <Text className="text-2xl">
                        {entryTexts[activeStep]}
                    </Text>
                </View>
                <Pressable
                    accessibilityLabel={"This is the Button to continue"}
                    onPress={nextStep}
                    className="bg-primary p-2 rounded-2xl mt-5 absolute bottom-10 right-5 flex-row"
                >
                    <View className="flex-row justify-center">
                        <Text className={'text-2xl' + Themes[colorScheme].textPrimary}>Next</Text>
                        <AntDesign name="caretright" size= {30} color={Themes[colorScheme].tabPrimary} />
                    </View>

                </Pressable>
                {renderSkip()}
            </View> : null
        );
    };

    //Rendering the Skip-Button on the first step of the intro
    const renderSkip = () => {
        return (activeStep < 2 ?
            <Pressable
                className={'absolute top-10 right-5'}
                onPress={skipEntry}
            >
                <Text>skip</Text>
            </Pressable> : null
        )
    }

    //Rendering the Accessibility-Modal in the intro
    const renderAccessibilityOptions = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={AccessibilityVisible}
                onRequestClose={() => setAccessibilityVisible(false)}
            >
                <View className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200 ') + 'w-full  items-center p-5'}>
                    <View className={'flex-row items-center mt-1'}>
                        <Switch
                            accessibilityLabel={"Switch to turn on dichromacy"}
                            trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                            thumbColor={Themes[colorScheme].tabPrimary}
                            value={dichromasie}
                            onValueChange={(value) => switchColorScheme("dichromacy", value)}
                        />
                        <Text accessible={true} className={'text-lg' + Themes[colorScheme].textPrimary}>Dichromacy   </Text>
                    </View>
                    <View className={'flex-row items-center mt-1'}>
                        <Switch
                            accessibilityLabel={"Switch to turn on tritanomalies"}
                            trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                            thumbColor={Themes[colorScheme].tabPrimary}
                            value={tritanomalien}
                            onValueChange={(value) => switchColorScheme("tritanomaly", value)}
                        />
                        <Text accessible={true} className={'text-lg' + Themes[colorScheme].textPrimary}>Tritanomalies</Text>
                    </View>
                    <View className={'flex-row items-center mt-1'}>
                        <Switch
                            accessibilityLabel={"Switch to turn on high contrast"}
                            trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                            thumbColor={Themes[colorScheme].tabPrimary}
                            value={highcontrast}
                            onValueChange={(value) => switchColorScheme("highContrast", value)}
                        />
                        <Text accessible={true} className={'text-lg' + Themes[colorScheme].textPrimary}>High Contrast</Text>
                    </View>
                    <View className={'w-full flex-row justify-end mt-1 mr-2'}>
                        <Pressable
                            onPress={CloseAndSaveAccessibility}
                            accessible={true}
                            accessibilityLabel={"Close Button"}
                        >
                            <View className={'flex-row items-center'}>
                                <Text className={'text-lg font-semibold' + Themes[colorScheme].textPrimary}>Close</Text>
                                <AntDesign className={'ml-2'} name="closecircleo" size={24} color="black" />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        );
    };

    //Rendering the Login-Screen in the intro
    const renderLoginScreen = () => {
        return (activeStep === 3 ?
            <View className={'flex-1' + Themes[colorScheme].bgPrimary}>
                <View className={'flex-1 justify-start mt-32 items-center'}>
                    <Text accessible={true} className={'text-4xl' + Themes[colorScheme].textPrimary}>Sign In</Text>
                    <TextInput
                        className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full  p-2 mt-5 w-2/3'}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full p-2 mt-5 mb-4 w-2/3'}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errorMessage ? (
                        <Text className={Themes[colorScheme].textError}>
                            {errorMessage}
                        </Text>
                    ) : null}
                    <Pressable
                        hitSlop={30}
                        className={'px-5 py-2 rounded-full mt-5 ' + Themes[colorScheme].bgSecondary}
                        accessible={true}
                        onPress={handleLogin}
                    >
                        <Text className={'text-lg font-semibold' + Themes[colorScheme].textPrimary}>Login</Text>
                    </Pressable>
                    <Pressable
                        className={'mt-14'}
                        accessible={true}
                        accessibilityLabel={"Not a member yet? Sign Up now!"}
                        onPress={nextStep}
                    >
                        <View className={'items-center'}>
                            <Text className={'text-xl' + Themes[colorScheme].textPrimary}>Not a member yet? </Text>
                            <Text className={'text-xl font-semibold ' + Themes[colorScheme].textSecondary}>Sign Up now!</Text>
                        </View>
                    </Pressable>
                </View>

            </View> : null
        );
    }

    //Rendering the Register-Screen in the intro
    const renderRegisterScreen = () => {
        return (activeStep === 4 ?
            <View className={'flex-1 justify-start mt-32 items-center'}>
                <Text accessible={true} className={'text-4xl' + Themes[colorScheme].textPrimary}>Register</Text>
                <TextInput
                    accessibilityLabel={"Username"}
                    className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full p-2 mt-5 w-2/3'}
                    placeholder="Username (required)"
                />
                <TextInput
                    accessibilityLabel={"Email"}
                    className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full p-2 mt-5 w-2/3'}
                    placeholder="Email (required)"
                />
                <TextInput
                    accessibilityLabel={"Firstname"}
                    className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full p-2 mt-5 w-2/3'}
                    placeholder="Firstname"
                />
                <TextInput
                    accessibilityLabel={"Lastname"}
                    className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full p-2 mt-5 w-2/3'}
                    placeholder="Lastname"
                />
                <TextInput
                    accessibilityLabel={"Password"}
                    className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full p-2 mt-5 w-2/3'}
                    placeholder="Password (required)"
                    secureTextEntry
                />
                <TextInput
                    accessibilityLabel={"Password"}
                    className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full p-2 mt-5 w-2/3'}
                    placeholder="Confirm Password"
                    secureTextEntry
                />

                <Pressable
                    hitSlop={30}
                    className={'px-5 py-2 rounded-full mt-5 ' + Themes[colorScheme].bgSecondary}
                    accessible={true}
                    accessibilityLabel={"SignUp Button"}
                    onPress={handleFakeSignUp}
                >
                    <Text className={'text-lg' + Themes[colorScheme].textPrimary}>Sign Up</Text>
                </Pressable>
            </View> : null
        );
    }

    //Collection of images for the preferences questioner in the intro
    const imageSet = {
        1: {
            1: {
                "path": require("../../assets/img/preferences/aircraft-1362586_640.jpg"),
                "alt": "Traveling by plane",
            },
            2: {
                "path": require("../../assets/img/preferences/animal-1812211_640.jpg"),
                "alt": "Exotic animals",
            },
            3: {
                "path": require("../../assets/img/preferences/audience-1853662_640.jpg"),
                "alt": "Musical and Concerts",
            }
        },
        2: {
            1: {
                "path": require("../../assets/img/preferences/beach-666122_640.jpg"),
                "alt": "Summer, Beach and Sand",
            },
            "2": {
                "path": require("../../assets/img/preferences/camper-2260094_640.jpg"),
                "alt": "Camping",
            },
            "3": {
                "path": require("../../assets/img/preferences/lasagna-5994612_640.jpg"),
                "alt": "Good Food from Good Chefs",
            }
        },
        3: {
            1: {
                "path": require("../../assets/img/preferences/mountains-3959204_640.jpg"),
                "alt": "Mountains and Skiing",
            },
            2: {
                "path": require("../../assets/img/preferences/roman-2419702_640.jpg"),
                "alt": "Archeological Sites",
            },
            3: {
                "path": require("../../assets/img/preferences/tiber-river-4529605_640.jpg"),
                "alt": "City Trips",
            }
        },
        4: {
            1: {
                "path": require("../../assets/img/preferences/train-5450300_640.jpg"),
                "alt": "Traveling by trains",
            },
            2: {
                "path": require("../../assets/img/preferences/wine-rack-3698774_640.jpg"),
                "alt": "Fine Wines",
            },
            3: {
                "path": require("../../assets/img/preferences/woman-1283009_640.jpg"),
                "alt": "Culture and Modern Art",
            }
        }
    };

    //Rendering of the preferences questioner
    function renderPrefIntro() {
        return (activeStep > 5 ?
            <View className={'flex-1 justify-top items-center' + Themes[colorScheme].bgPrimary}>
                <Text className={'text-xl font-semibold mt-5' + Themes[colorScheme].textPrimary}>Choose as many as you want:</Text>
                <Pressable className={'rounded-full mt-5 overflow-hidden' + (firstactive ? ' border-4 ' + Themes[colorScheme].borderPrimary : '')}
                    onPress={() => setFirstActive(!firstactive)}>
                    <Image source={imageSet[activeStep - 5][1].path} alt={imageSet[activeStep - 5][1].alt} className={'w-96 h-52'} resizeMode={'cover'} />
                </Pressable>
                <Pressable className={'rounded-full mt-5 overflow-hidden' + (secondactive ? ' border-4 ' + Themes[colorScheme].borderPrimary : '')}
                    onPress={() => setSecondActive((!secondactive))}>
                    <Image source={imageSet[activeStep - 5][2].path.toString()} alt={imageSet[activeStep - 5][2].alt} className={'w-96 h-52'} resizeMode={'cover'} />
                </Pressable>
                <Pressable className={'rounded-full mt-5 overflow-hidden' + (thirdactive ? ' border-4 ' + Themes[colorScheme].borderPrimary : '')}
                    onPress={() => setThirdActive((!thirdactive))}>
                    <Image source={imageSet[activeStep - 5][3].path} alt={imageSet[activeStep - 5][3].alt} className={'w-96 h-52'} resizeMode={'cover'} />
                </Pressable>
                <Pressable
                    accessibilityLabel={"This is the Button to continue"}
                    onPress={nextStep}
                    className="mt-5 absolute bottom-10 right-5 flex-row"
                >
                    <View className="flex-row justify-center">
                        <Text className={'text-2xl' + Themes[colorScheme].textPrimary}>Next</Text>
                        <AntDesign name="caretright" size= {30} color={Themes[colorScheme].tabPrimary} />
                    </View>
                </Pressable>
            </View> : null

        )
    }


    //Rendering the Intro Modal for first entry to the App
    return (
        <Modal
            animationType={"slide"}
            visible={ModalVisible}
        >
            {renderAccessibilityOptions()}
            {renderEntryText()}
            {renderLoginScreen()}
            {renderRegisterScreen()}
            {renderPrefIntro()}

            <HideWithKeyboard className={'absolute bottom-0'}
                behavior={'padding'}>
                <Image source={require('../../assets/img/travis.png')} className={'w-52 h-52'} resizeMode={'contain'} />
            </HideWithKeyboard>

        </Modal>
    )
}

export default entryModal;