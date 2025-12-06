import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import { Colors } from '../../theme/Colors';
import { fonts } from '../../theme/Fonts';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import InfoIcon from '../../assets/planDetails/information.svg';
import DrinkSausageImage from '../../assets/delivery/drinksausage.svg';
import FoodItemsImage from '../../assets/delivery/fooditems.svg';
import { NavigationRoutes } from '../../navigation/NavigationRoutes';

const { width } = Dimensions.get('window');

// --- Components ---

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
                        <AppText style={styles.dayText}>{day}</AppText>
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
                                <AppText style={[
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

interface MealCardProps {
    type: 'Lunch' | 'Dinner';
    image: React.FC<any>;
}

const MealCard = ({ type, image: SvgImage }: MealCardProps) => {
    return (
        <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
                <AppText style={styles.mealType}>{type}</AppText>
                <InfoIcon width={14} height={14} style={{ marginTop: 2 }} />
            </View>

            <View style={styles.mealContentRow}>
                <View style={styles.mealInfo}>
                    <AppText style={styles.mealName}>Chole Chawal</AppText>
                    <AppText style={styles.deliveryTime}>Will be delivered around 11AM today</AppText>

                    <View style={styles.mealActions}>
                        <TouchableOpacity style={styles.skipButton}>
                            <AppText style={styles.skipButtonText}>Skip {type}</AppText>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AppText style={styles.changeAddressText}>Change Address</AppText>
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

interface AddressCardProps {
    type: 'Home' | 'Office' | 'College';
    address: string;
}

const AddressCard = ({ type, address }: AddressCardProps) => {
    return (
        <View style={styles.addressCard}>
            <AppText style={styles.addressType}>{type}</AppText>
            <AppText style={styles.addressText}>{address}</AppText>
            <TouchableOpacity style={styles.deliverHereButton}>
                <AppText style={styles.deliverHereText}>Deliver Here</AppText>
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
                <AppText style={styles.headerTitle}>Delivery Settings</AppText>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Calendar Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <AppText style={styles.sectionTitle}>Your Delivery Calendar</AppText>
                        <InfoIcon width={14} height={14} />
                    </View>
                    <AppText style={styles.sectionSubtitle}>Select a day to manage delivery.</AppText>
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
                        <AppText style={styles.sectionTitle}>Your Saved Addresses</AppText>
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
                        <AppText style={styles.addNewAddressText}>+ Add New Address</AppText>
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
        gap: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
        color: '#000',
        flex: 1,
        textAlign: 'center',
        marginRight: 40,
    },
    scrollContent: {
        paddingBottom: 100,
        paddingHorizontal: 16,
    },
    sectionContainer: {
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    sectionSubtitle: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#666',
        marginBottom: 16,
    },
    calendarContainer: {
        width: '100%', 
        height: 140, 
        borderRadius: 20, 
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 16,
        gap: 16,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayHeaderCell: {
        flex: 1,
        alignItems: 'center',
    },
    dayText: {
        color: '#999',
        fontSize: 14,
        fontFamily: fonts.Regular,
    },
    calendarRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    dateCellWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    dateCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDateCircle: {
        backgroundColor: Colors.primary,
    },
    dateText: {
        fontSize: 16,
        color: '#666',
        fontFamily: fonts.Medium,
    },
    selectedDateText: {
        color: '#fff',
        fontFamily: fonts.SemiBold,
    },

    mealsWrapper: {
        marginTop: 24,
        gap: 20,
    },
    mealCard: {
        width: '100%',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 20,
    },
    mealHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    mealType: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    mealContentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mealInfo: {
        flex: 1,
        paddingRight: 10,
    },
    mealName: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#666',
        marginBottom: 4,
    },
    deliveryTime: {
        fontSize: 14,
        fontFamily: fonts.SemiBold, 
        color: '#000',
        marginBottom: 16,
    },
    mealActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    skipButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    skipButtonText: {
        color: Colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 14,
    },
    changeAddressText: {
        color: Colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 14,
    },
    mealImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    savedAddressesContainer: {
        marginTop: 24,
        width: '100%',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 20,
    },
    addressesList: {
        gap: 16,
    },
    addressCard: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 16,
        position: 'relative',
    },
    addressType: {
        fontSize: 14,
        fontFamily: fonts.SemiBold, 
        color: '#999',
        marginBottom: 8,
    },
    addressText: {
        fontSize: 14,
        fontFamily: fonts.Medium,
        color: '#000',
        lineHeight: 20,
        width: '70%', 
    },
    deliverHereButton: {
        position: 'absolute',
        right: 16,
        bottom: 16, 
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    deliverHereText: {
        color: Colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 12,
    },
    addNewAddressButton: {
        alignSelf: 'flex-end',
        marginTop: 8,
    },
    addNewAddressText: {
        color: Colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 14,
    },

    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    paymentButton: {
        width: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 6,
        height: 56,
    }
});
