import React from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import InfoIcon from '../../assets/planDetails/information.svg';
import DrinkSausageImage from '../../assets/delivery/drinksausage.svg';
import FoodItemsImage from '../../assets/delivery/fooditems.svg';
import { NavigationRoutes } from '../../navigation/NavigationRoutes';

import { styles } from './delSettings2Style';
import { MealCardProps, AddressCardProps } from '../../types/deladdress/delAddress';

const Calendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = [
        { day: 'Sun', date: null },
        { day: 'Mon', date: 1, isSelected: true },
        { day: 'Tue', date: 2 },
        { day: 'Wed', date: 3 },
        { day: 'Thu', date: 4 },
        { day: 'Fri', date: 5 },
        { day: 'Sat', date: 6 },
    ];

    return (
        <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
                {days.map((day, index) => (
                    <View key={index} style={styles.dayHeaderCell}>
                        <AppText variant="labels" style={styles.dayText}>{day}</AppText>
                    </View>
                ))}
            </View>
            <View style={styles.calendarRow}>
                {dates.map((item, index) => (
                    <View key={index} style={styles.dateCellWrapper}>
                        {item.date ? (
                            <TouchableOpacity style={[
                                styles.dateCircle,
                                item.isSelected && styles.selectedDateCircle
                            ]}>
                                <AppText variant="label" style={[
                                    styles.dateText,
                                    item.isSelected && styles.selectedDateText
                                ]}>
                                    {item.date}
                                </AppText>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.dateCircle} />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

const MealCard = ({ type, image: SvgImage }: MealCardProps) => {
    return (
        <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
                <AppText variant="title" style={styles.mealType}>{type}</AppText>
                <InfoIcon width={14} height={14} style={{ marginTop: 2 }} />
            </View>

            <View style={styles.mealContentRow}>
                <View style={styles.mealInfo}>
                    <AppText variant="title" style={styles.mealName}>Chole Chawal</AppText>
                    <AppText variant="subtitle" style={styles.deliveryTime}>Will be delivered around 11AM today</AppText>

                    <View style={styles.mealActions}>
                        <TouchableOpacity style={styles.skipButton}>
                            <AppText variant="label" style={styles.skipButtonText}>Skip {type}</AppText>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AppText variant="label" style={styles.changeAddressText}>Change Address</AppText>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.mealImageContainer}>
                    <SvgImage width={80} height={80} />
                </View>
            </View>
        </View>
    );
};

const AddressCard = ({ type, address }: AddressCardProps) => {
    return (
        <View style={styles.addressCard}>
            <AppText variant="labels" style={styles.addressType}>{type}</AppText>
            <AppText variant="body" style={styles.addressText}>{address}</AppText>
            <TouchableOpacity style={styles.deliverHereButton}>
                <AppText variant="label" style={styles.deliverHereText}>Deliver Here</AppText>
            </TouchableOpacity>
        </View>
    );
};

export default function DeliverySettingsScreen2() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <BackArrow width={16} height={16} color="#000" />
                </TouchableOpacity>
                <AppText variant="title" style={styles.headerTitle}>Delivery Settings</AppText>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Calendar Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <AppText variant="title" style={styles.sectionTitle}>Your Delivery Calendar</AppText>
                        <InfoIcon width={14} height={14} />
                    </View>
                    <AppText variant="subtitle" style={styles.sectionSubtitle}>Select a day to manage delivery.</AppText>
                    <Calendar />
                </View>

                {/* Meals Section */}
                <View style={styles.mealsWrapper}>
                    <MealCard type="Lunch" image={DrinkSausageImage} />
                    <MealCard type="Dinner" image={FoodItemsImage} />
                </View>

                {/* Saved Addresses Section */}
                <View style={styles.savedAddressesContainer}>
                    <View style={styles.sectionHeader}>
                        <AppText variant="title" style={styles.sectionTitle}>Your Saved Addresses</AppText>
                        <InfoIcon width={14} height={14} />
                    </View>

                    <View style={styles.addressesList}>
                        <AddressCard
                            type="Home"
                            address="203-A, Nandan Spectra, Baner, Balevadi Highstreet, Pune, 424102, Maharashtra."
                        />
                        <AddressCard
                            type="Office"
                            address="203-A, Nandan Spectra, Baner, Balevadi Highstreet, Pune, 424102, Maharashtra."
                        />
                        <AddressCard
                            type="College"
                            address="203-A, Nandan Spectra, Baner, Balevadi Highstreet, Pune, 424102, Maharashtra."
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.addNewAddressButton}
                        onPress={() => navigation.navigate(NavigationRoutes.DELIVERY_ADDRESS as never)}
                    >
                        <AppText variant="labels" style={styles.addNewAddressText}>+ Add New Address</AppText>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Footer Payment Button */}
            <View style={styles.footer}>
                <Button
                    title="Complete your payment"
                    onPress={() => navigation.navigate(NavigationRoutes.PAYMENT as never)}
                    variant="primary"
                    style={styles.paymentButton}
                />
            </View>
        </SafeAreaView>
    );
}
