import React, { useState, useRef, useContext } from 'react';
import { FlatList, Modal, Pressable, ScrollView, Switch, Text, TextInput, View, } from 'react-native';
import entryModal from "../components/partials/entryModal";
import Themes from "../data/colorTheme.json";
import DateTimePicker from "react-native-ui-datepicker/src/DateTimePicker";
import dayjs from "dayjs";
import routeData from "../data/routeData.json";
import RenderItemSuggestions from "../components/RenderItemSuggestions";
import RenderItemSearchResult from "../components/RenderItemSearchResult";
import { FontAwesome6 } from "@expo/vector-icons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { ThemeContext } from "../context.js";


export default function HomeScreen({ route }) {

    const [destination, setDestination] = useState('');
    const [adults, setAdults] = useState('1');
    const [children, setChildren] = useState('0');
    const [dateFrom, setDateFrom] = useState(dayjs());
    const [dateFromVisible, setDateFromVisible] = useState(false);
    const [dateTo, setDateTo] = useState(dayjs().add(4, 'day'));
    const [dateToVisible, setDateToVisible] = useState(false);
    const [duration, setDuration] = useState(1);
    const flatListRef = useRef();
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);

    const [priceStart, setPriceStart] = useState(0);
    const [priceEnd, setPriceEnd] = useState(5000);

    const [foot, setFoot] = useState(true);
    const [biking, setBiking] = useState(true);
    const [train, setTrain] = useState(true);
    const [car, setCar] = useState(false);
    const [bus, setBus] = useState(true)
    const [ship, setShip] = useState(false);
    const [plane, setPlane] = useState(false);

    const [cities, setCities] = useState([]);
    const [beach, setBeach] = useState(false);
    const [nature, setNature] = useState(false);
    const [mountain, setMountain] = useState(false);

    const [hiking, setHiking] = useState(false);
    const [sightseeing, setSightseeing] = useState(false);
    const [swimming, setSwimming] = useState(false);
    const [art, setArt] = useState(false);
    const [sports, setSports] = useState(false);
    const [food, setFood] = useState(false);

    const [climate, setClimate] = useState(false);
    const [vegetarian, setVegetarian] = useState(false);
    const [vegan, setVegan] = useState(false);
    const [accessibility, setAccessibility] = useState(false);
    const { colorScheme, setColorScheme } = useContext(ThemeContext);


    //Rendering entries to the list of suggestions on home screen
    const renderSuggestions = () => {
        return (
            <FlatList
                ref={flatListRef}
                data={routeData}
                keyExtractor={(item) => item.title}
                renderItem={props => <RenderItemSuggestions {...props} />}
            />
        )
    };

    //Rendering entries to the list of search results
    const renderSearchResults = () => {
        return (
            <FlatList
                ref={flatListRef}
                data={routeData}
                keyExtractor={(item) => item.title}
                renderItem={props => <RenderItemSearchResult {...props} />}
            />
        )
    };

    //Rendering filter modal
    const renderFilterModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={filterVisible}
                onRequestClose={() => {
                    setFilterVisible(!filterVisible);
                }}
            >
                <ScrollView className={'bg-white w-fit p-2.5 max-h-screen'}>
                    <View>
                        <Pressable
                            accessibilityLabel={"Apply"}
                            className={'flex-row items-center justify-end'}
                            onPress={() => setFilterVisible(!filterVisible)}>
                            <Text className={'mr-2 text-gray-500'}>Apply</Text>
                            <FontAwesome6 name="circle-check" size={24} color="black" />
                        </Pressable>
                    </View>
                    <View className={'flex-row w-full mt-5'}>
                        <View className={'flex w-1/2'}>
                            <Text className={'font-semibold text-xl'}>Destinations: </Text>
                            <View className={'flex-row items-center'}>
                                <Switch
                                    accessibilityLabel={'Switch to turn on cities'}
                                    trackColor={{ false: '#767577', true: Themes[colorScheme].bgPrimary }}
                                    thumbColor={Themes[colorScheme].tabPrimary}
                                    value={cities}
                                    onValueChange={(value) => setCities(value)}
                                />
                                <Text className="text-lg">Cities</Text>
                            </View>
                            <View className={'flex-row items-center '}>
                                <Switch
                                    accessibilityLabel={'Switch to turn on beach'}
                                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                    thumbColor={Themes[colorScheme].tabPrimary}
                                    value={beach}
                                    onValueChange={(value) => setBeach(value)}
                                />
                                <Text className="text-lg">Beach</Text>
                            </View>
                            <View className={'flex-row items-center'}>
                                <Switch
                                    accessibilityLabel={'Switch to turn on nature'}
                                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                    thumbColor={Themes[colorScheme].tabPrimary}
                                    value={nature}
                                    onValueChange={(value) => setNature(value)}
                                />
                                <Text className="text-lg">Nature</Text>
                            </View>
                            <View className={'flex-row items-center'}>
                                <Switch
                                    accessibilityLabel={'Switch to turn on mountains'}
                                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                    thumbColor={Themes[colorScheme].tabPrimary}
                                    value={mountain}
                                    onValueChange={(value) => setMountain(value)}
                                />
                                <Text className="text-lg">Mountains</Text>
                            </View>
                        </View>
                        <View className={'flex w-1/2'}>
                            <Text className={'font-semibold text-xl'}>Activities: </Text>
                            <View className={'flex-row items-center'}>
                                <Switch
                                    accessibilityLabel={'Switch to turn on hiking'}
                                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                    thumbColor={Themes[colorScheme].tabPrimary}
                                    value={hiking}
                                    onValueChange={(value) => setHiking(value)}
                                />
                                <Text className="text-lg">Hiking</Text>
                            </View>
                            <View className={'flex-row items-center '}>
                                <Switch
                                    accessibilityLabel={'Switch to turn on sightseeing'}
                                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                    thumbColor={Themes[colorScheme].tabPrimary}
                                    value={sightseeing}
                                    onValueChange={(value) => setSightseeing(value)}
                                />
                                <Text className="text-lg">Sightseeing</Text>
                            </View>
                            <View className={'flex-row items-center'}>
                                <Switch
                                    accessibilityLabel={'Switch to turn on diving'}
                                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                    thumbColor={Themes[colorScheme].tabPrimary}
                                    value={swimming}
                                    onValueChange={(value) => setSwimming(value)}
                                />
                                <Text className="text-lg">Swimming/Diving</Text>
                            </View>
                            <View className={'flex-row items-center'}>
                                <Switch
                                    accessibilityLabel={'Switch to turn on art'}
                                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                    thumbColor={Themes[colorScheme].tabPrimary}
                                    value={art}
                                    onValueChange={(value) => setArt(value)}
                                />
                                <Text className="text-lg">Art and Culture</Text>
                            </View>
                            <View className={'flex-row items-center'}>
                                <Switch
                                    accessibilityLabel={'Switch to turn on sports'}
                                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                    thumbColor={Themes[colorScheme].tabPrimary}
                                    value={sports}
                                    onValueChange={(value) => setSports(value)}
                                />
                                <Text className="text-lg">Sports</Text>
                            </View>
                            <View className={'flex-row items-center'}>
                                <Switch
                                    accessibilityLabel={'Switch to turn on food'}
                                    trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                    thumbColor={Themes[colorScheme].tabPrimary}
                                    value={food}
                                    onValueChange={(value) => setFood(value)}
                                />
                                <Text className="text-lg">Food</Text>
                            </View>
                        </View>
                    </View>
                    <View className='border-b-2 mt-5 border-gray-200' />
                    <View className={'flex w-full mt-2'}>
                        <Text className={'font-semibold text-xl'}>Other Preferences: </Text>
                        <View className={'flex-row items-center mt-1'}>
                            <Switch
                                accessibilityLabel={'Switch to turn on climate'}
                                trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                thumbColor={Themes[colorScheme].tabPrimary}
                                value={climate}
                                onValueChange={(value) => setClimate(value)}
                            />
                            <Text className="text-lg">Low CO2-Footprint</Text>
                        </View>
                        <View className={'flex-row items-center '}>
                            <Switch
                                accessibilityLabel={'Switch to turn on vegetarian'}
                                trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                thumbColor={Themes[colorScheme].tabPrimary}
                                value={vegetarian}
                                onValueChange={(value) => setVegetarian(vegetarian)}
                            />
                            <Text className="text-lg">Vegetarian Food</Text>
                        </View>
                        <View className={'flex-row items-center'}>
                            <Switch
                                accessibilityLabel={'Switch to turn on vegan'}
                                trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                thumbColor={Themes[colorScheme].tabPrimary}
                                value={vegan}
                                onValueChange={(value) => setVegan(value)}
                            />
                            <Text className="text-lg">Vegan Food</Text>
                        </View>
                        <View className={'flex-row items-center'}>
                            <Switch
                                accessibilityLabel={'Switch to turn on accessibility'}
                                trackColor={{ false: '#767577', true: Themes[colorScheme].tabPrimary }}
                                thumbColor={Themes[colorScheme].tabPrimary}
                                value={accessibility}
                                onValueChange={(value) => setAccessibility(value)}
                            />
                            <Text className="text-lg">Accessible Systems and Entries</Text>
                        </View>
                    </View>
                    <View className='border-b-2 mt-5  border-gray-200' />
                    <View className={"items-center mt-2"}>
                        <Text className={'w-full font-semibold text-xl'}>Price per Person:</Text>
                        <MultiSlider
                            accessibilityLabel={'Multislider to choose price range. Currently: ' + priceStart + ' - ' + priceEnd + '€'}
                            values={[priceStart, priceEnd]}
                            max={5000}
                            markerSize={10}
                            markerStyle={{ 'height': 18, 'width': 18, 'backgroundColor': Themes[colorScheme].tabPrimary }}
                            trackStyle={{ height: 4 }}
                            selectedStyle={{ backgroundColor: Themes[colorScheme].tabPrimary }}
                            onValuesChange={(values) => {
                                setPriceStart(values[0]);
                                setPriceEnd(values[1]);
                            }}
                        />
                    </View>
                    <View className={'flex-row justify-center mx-3'}>
                        <View className={'flex-row items-center w-1/2 justify-start'}>
                            <Text className={'font-semibold text-gray-500 text-sm'}>From: </Text>
                            <Text className={'bg-gray-200 py-2 px-3 rounded-full w-1/2 text-center'}>
                                {priceStart} €
                            </Text>
                        </View>
                        <View className={'flex-row items-center w-1/2 justify-end'}>
                            <Text className={'font-semibold text-gray-500 text-sm'}>To: </Text>
                            <Text className={'bg-gray-200 py-2 px-3 rounded-full w-1/2 text-center'}>
                                {priceEnd === 10000 ? '∞' : priceEnd} €
                            </Text>
                        </View>
                    </View>
                    <View className='border-b-2 mt-5 border-gray-200' />
                    <Text className={'font-semibold mt-2 mb-3 text-xl'}>Transportation: </Text>
                    <View className={'flex-row mx-2 justify-between mb-8'}>
                        <Pressable
                            onPress={() => {
                                setFoot(!foot);
                            }}
                        >
                            <FontAwesome6 name="person-walking" size={24} color={foot ? 'black' : 'gray'} />
                        </Pressable>
                        <Pressable
                            accessibilityLabel={'Pressable to turn on bike'}
                            className={'ml-5'}
                            onPress={() => {
                                setBiking(!biking);
                            }}
                        >
                            <FontAwesome6 name="person-biking" size={24} color={biking ? 'black' : '#c3c3c3'} />
                        </Pressable>
                        <Pressable
                            accessibilityLabel={'Pressable to turn on train'}
                            className={'ml-5'}
                            onPress={() => {
                                setTrain(!train);
                            }}
                        >
                            <FontAwesome6 name="train" size={24} color={train ? 'black' : '#c3c3c3'} />
                        </Pressable>
                        <Pressable
                            accessibilityLabel={'Pressable to turn on car'}
                            className={'ml-5'}
                            onPress={() => {
                                setCar(!car);
                            }}
                        >
                            <FontAwesome6 name="car" size={24} color={car ? 'black' : '#c3c3c3'} />
                        </Pressable>
                        <Pressable
                            accessibilityLabel={'Pressable to turn on bus'}
                            className={'ml-5'}
                            onPress={() => {
                                setBus(!bus);
                            }}
                        >
                            <FontAwesome6 name="bus" size={24} color={bus ? 'black' : '#c3c3c3'} />
                        </Pressable>
                        <Pressable
                            accessibilityLabel={'Pressable to turn on ship'}
                            className={'ml-5'}
                            onPress={() => {
                                setShip(!ship);
                            }}
                        >
                            <FontAwesome6 name="ship" size={24} color={ship ? 'black' : '#c3c3c3'} />
                        </Pressable>
                        <Pressable
                            accessibilityLabel={'Pressable to turn on plane'}
                            className={'ml-5'}
                            onPress={() => {
                                setPlane(!plane);
                            }}
                        >
                            <FontAwesome6 name="plane" size={24} color={plane ? 'black' : '#c3c3c3'} />
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>
        );
    }

    //Rendering Home Screen with search mask and also embedding Filter and Entry modal
    return (
        <View className={Themes[colorScheme].bgPrimary + ' flex-1 items-center px-5'}>
            {entryModal(colorScheme)}
            {renderFilterModal()}

            <TextInput
                className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full w-full'}
                placeholder={"Destination"}
                onChangeText={text => setDestination(text)}
            />
            <View className='flex-row justify-between mt-3'>
                <View className={'w-1/2 pr-1'}>
                    <Text className="text-xl">Adults:</Text>
                    <TextInput
                        accessibilityLabel={'Entry of number of adults'}
                        className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full w-full'}
                        value={adults}
                        keyboardType={"numeric"}
                        onChangeText={text => setAdults(text)}
                    />
                </View>
                <View className={'w-1/2 pl-1'}>
                    <Text className="text-xl">Children:</Text>
                    <TextInput
                        accessibilityLabel={'Entry of number of children'}
                        className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full w-full'}
                        value={children}
                        keyboardType={"numeric"}
                        onChangeText={text => setChildren(text)}
                    /></View>
            </View>
            <View className='flex-row justify-between mt-3'>
                <View className={'w-1/2 pr-1'}>
                    <Text className="text-xl" >From:</Text>
                    <Pressable
                        accessibilityLabel={"Date Picker for start date. Currently set to: " + dateFrom.toDate().toDateString()}
                        onPress={() => {
                            setDateFromVisible(true)
                        }}
                    >
                        <Text
                            className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full w-full'}>{dateFrom.toDate().toDateString()}</Text>
                    </Pressable>
                </View>
                <View className={'w-1/2 pl-1'}>
                    <Text className="text-xl">To:</Text>
                    <Pressable
                        accessibilityLabel={"Date Picker for end date. Currently set to: " + dateTo.toDate().toDateString()}
                        onPress={() => {
                            setDateToVisible(true)
                        }}>
                        <Text
                            className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full w-full'}>{dateTo.toDate().toDateString()}</Text>
                    </Pressable>
                </View>
                <Modal
                    animationType={"fade"}
                    visible={dateFromVisible}
                    transparent={true}
                >
                    <View className={'flex-1 items-center justify-center'}>
                        <View className={'items-center bg-white'}>
                            <DateTimePicker
                                mode="single"
                                minDate={dayjs()}
                                date={dateFrom}
                                onChange={({ date }) => {
                                    setDateFrom(date);
                                    setDateFromVisible(false);
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType={"fade"}
                    visible={dateToVisible}
                    transparent={true}
                >
                    <View className={'flex-1 items-center justify-center'}>
                        <View className={'items-center bg-white'}>
                            <DateTimePicker
                                mode="single"
                                minDate={dayjs().add(1, 'day')}
                                date={dateTo}
                                onChange={({ date }) => {
                                    setDateTo(date >= dateFrom ? date : dateFrom);
                                    setDateToVisible(false);
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
            <View className='flex-row justify-between items-end mt-3'>
                <View className={'flex-1 px-1'}>
                    <Text className='text-xl'>Duration in days:</Text>
                    <TextInput
                        accessibilityLabel={'Entry of duration in days'}
                        className={(colorScheme === 'highContrast' ? 'bg-white border-2 border-black' : 'bg-gray-200') + ' py-2 px-4 rounded-full w-full'}
                        value={duration}
                        keyboardType={"numeric"}
                        onChangeText={text => setDuration(text)}
                    />
                </View>
                <View className={'flex-1 px-1'}>
                    <Pressable className={'w-full rounded-full py-2 items-center justify-center' + Themes[colorScheme].bgSecondary}
                        onPress={() => setSearchResultsVisible(!searchResultsVisible)}>
                        <Text className={'text-xl font-semibold'}>Search</Text>
                    </Pressable>
                </View>
            </View>
            <View className={'flex-row justify-between items-center w-full'}>
                <Text className="text-lg mt-3">{searchResultsVisible ? 'Search Results' : 'Suggestions based on your preferences'}:</Text>
                <Pressable className={'flex-row items-end z-10 translate-y-5'}
                    onPress={() => setFilterVisible(true)}>
                    <Text className={'text-base mr-1 font-semibold'}>Filters</Text>
                    <View className={'rounded-full p-3 ' + Themes[colorScheme].bgSecondary}>
                        <FontAwesome6 name="filter" size={20} color="black" />
                    </View>
                </Pressable>
            </View>
            <View className={'h-0.5 w-full bg-gray-300'}></View>
            <View className={'flex-1 w-full mt-7'}>
                {searchResultsVisible ? renderSearchResults() : renderSuggestions()}
            </View>
        </View>
    );
};