import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import AppText from '../../components/AppText';
import { Colors } from '../../theme/Colors';
import { fonts } from '../../theme/Fonts';

import BackArrow from '../../assets/Icons/back_arrow.svg';
import PencilIcon from '../../assets/planDetails/pencil.svg';
import RotiImage from '../../assets/planDetails/roti.svg';
import ThaliImage from '../../assets/planDetails/thali.svg';
import InfoIcon from '../../assets/planDetails/information.svg';
import { NavigationRoutes, RootStackParamList } from '../../navigation/NavigationRoutes';
import Button from '../../components/Button';

const { width } = Dimensions.get('window');

interface MealCardProps {
    title: string;
    subtitle: string;
    badges: string[];
    type: 'Lunch' | 'Dinner';
}

const MealCard = ({ title, subtitle, badges, type }: MealCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const expandHeight = useSharedValue(0);

    const toggleExpand = () => {
        const target = !isExpanded;
        setIsExpanded(target);
        expandHeight.value = withTiming(target ? 1 : 0, {
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: expandHeight.value * 140, 
            opacity: expandHeight.value,
            marginTop: expandHeight.value * 12,
        };
    });

    return (
        <View style={styles.mealCardContainer}>
            <AppText variant="title" style={styles.mealTypeTitle}>{type}</AppText>

            <View style={[styles.card, isExpanded && styles.cardExpanded]}>
                <View style={styles.imageContainer}>
                    <ThaliImage width={329} height={180} style={styles.mainImage} />
                </View>

                <View style={styles.cardContent}>
                    <View style={styles.headerRow}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <AppText variant="title" style={styles.mealTitle}>{title}</AppText>
                                <InfoIcon width={16} height={16} />
                            </View>
                            <AppText variant="caption" style={styles.mealSubtitle}>{subtitle}</AppText>
                        </View>
                        <TouchableOpacity onPress={toggleExpand} style={styles.editIcon}>
                            <PencilIcon width={24} height={24} fill="#FF5722" color="#FF5722" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.badgesContainer}>
                        {badges.map((badge, index) => (
                            <View key={index} style={styles.badge}>
                                <AppText variant="labels" style={styles.badgeText}>{badge}</AppText>
                            </View>
                        ))}
                    </View>

                    <View style={styles.swapSection}>
                        <TouchableOpacity onPress={toggleExpand}>
                            <AppText variant="body" style={styles.swapSummary}>
                                Swap items at no extra cost
                            </AppText>
                        </TouchableOpacity>

                        <Animated.View style={[styles.hiddenContent, animatedStyle]}>
                            <View style={styles.swapItemContainer}>
                                <View style={styles.rotiImageContainer}>
                                    <RotiImage width={119} height={82} />
                                </View>
                                <AppText variant="body" style={styles.swapItemText}>
                                    Swap Rice With 2 Roti
                                </AppText>
                            </View>
                        </Animated.View>
                    </View>
                </View>
            </View>
        </View>
    );
};

interface CalendarDate {
    date: number | null;
    inRange?: boolean;
    isStart?: boolean;
    isEnd?: boolean;
    isSelected?: boolean;
    disabled?: boolean;
}

const Calendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const weeks: CalendarDate[][] = [
        [
            { date: null },
            { date: 1, inRange: true, isStart: true },
            { date: 2, inRange: true, isSelected: true },
            { date: 3, inRange: true },
            { date: 4, inRange: true },
            { date: 5, inRange: true },
            { date: 6, inRange: true, isEnd: true },
        ],
        [
            { date: 7 }, { date: 8 }, { date: 9 }, { date: 10 }, { date: 11 }, { date: 12 }, { date: 13 }
        ],
        [
            { date: 14, disabled: true }, { date: 15, disabled: true }, { date: 16, disabled: true },
            { date: 17, disabled: true }, { date: 18, disabled: true }, { date: 19, disabled: true }, { date: 20, disabled: true }
        ]
    ];

    return (
        <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
                {days.map((day, index) => (
                    <View key={index} style={styles.dayHeaderCell}>
                        <AppText variant="caption" style={styles.dayText}>{day}</AppText>
                    </View>
                ))}
            </View>
            <View style={styles.calendarGrid}>
                {weeks.map((week, weekIndex) => (
                    <View key={weekIndex} style={styles.calendarRow}>
                        {week.map((item, index) => (
                            <View key={index} style={styles.dateCellWrapper}>
                                {item.date ? (
                                    <View style={[
                                        styles.dateCellStrip,
                                        item.inRange && styles.inRangeStrip,
                                        item.isStart && styles.startStrip,
                                        item.isEnd && styles.endStrip,
                                    ]}>
                                        <View style={[
                                            styles.dateCircle,
                                            item.isSelected && styles.selectedDateCircle
                                        ]}>
                                            <AppText variant="body" style={[
                                                styles.dateText,
                                                item.inRange && styles.inRangeText,
                                                item.isSelected && styles.selectedDateText,
                                                item.disabled && { color: '#D3D3D3' }
                                            ]}>
                                                {item.date}
                                            </AppText>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.dateCellStrip} />
                                )}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default function WeeklyPlanScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header - Fixed at top */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <BackArrow width={16} height={16} />
                </TouchableOpacity>
                <AppText variant="title" style={styles.headerTitle}>Plan Details</AppText>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Weekly Plan Title */}
                <View style={styles.titleSection}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <AppText variant="title1" style={styles.mainTitle}>Your Weekly Plan</AppText>
                        <InfoIcon width={16} height={16} />
                    </View>
                    <AppText variant="body" style={styles.subtitle}>
                        Select a day to view meals or make adjustments.
                    </AppText>
                </View>

                {/* Calendar */}
                <Calendar />

                {/* Date Header for Meals */}
                <View style={styles.mealDateHeader}>
                    <AppText variant="title" style={styles.mealDateTitle}>Your Meal for 2nd of Nov</AppText>
                    <View style={styles.arrowControls}>
                        <TouchableOpacity style={styles.arrowButton}>
                            <BackArrow width={12} height={12} style={{ transform: [{ rotate: '180deg' }] }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.arrowButton}>
                            <BackArrow width={12} height={12} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Meals */}
                <View style={styles.mealsContainer}>
                    <MealCard
                        type="Lunch"
                        title="Chole Chawal"
                        subtitle="Chole + Rice + Salad"
                        badges={['High Proteins', 'Low Carbs', 'Low Fat']}
                    />
                    <MealCard
                        type="Dinner"
                        title="Chole Chawal"
                        subtitle="Chole + Rice + Salad"
                        badges={['High Proteins', 'Low Carbs', 'Low Fat']}
                    />
                </View>

                {/* Footer / CTA Card */}
                <View style={styles.footerCard}>
                    <View>
                        <AppText variant="title" style={{ fontSize: 16 }}>Weekly fat loss plan</AppText>
                        <AppText variant="caption" style={{ color: '#666' }}>Includes 2 Meals/Day</AppText>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                            <AppText variant="body" style={{ textDecorationLine: 'line-through', color: '#999', marginRight: 8 }}>₹1799/Week</AppText>

                            <AppText variant="title" style={{ fontSize: 18 }}>₹ 1439/Week</AppText>
                            <AppText variant="labels" style={{ color: '#FF5722', marginLeft: 8, fontWeight: 'bold' }}>20% OFF</AppText>
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        {/* <View style={styles.saveBadge}>
                            <AppText variant="labels" style={{ color: '#FF5722' }}>Save 360</AppText>
                        </View> */}
                    </View>
                </View>

                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Footer Button - Fixed at bottom */}
            <View style={styles.footer}>
                <Button
                    title="Add Delivery Address"
                    onPress={() => navigation.navigate(NavigationRoutes.DELIVERY_ADDRESS)}
                    variant="primary"
                    style={styles.paymentButton}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginTop: 10,
        height: 44,
        backgroundColor: '#fff', 
    },
    backButton: {
        padding: 8,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
    titleSection: {
        marginTop: 21, 
        paddingHorizontal: 16,
        gap: 6,
    },
    mainTitle: {
        fontSize: 22,
        fontFamily: fonts.SemiBold,
    },
    subtitle: {
        color: '#666',
        fontSize: 14,
    },
    calendarContainer: {
        marginTop: 17,
        marginHorizontal: 23,
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#fff',
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    dayHeaderCell: {
        flex: 1,
        alignItems: 'center',
    },
    dayText: {
        color: '#999',
        textAlign: 'center',
    },
    calendarGrid: {
        gap: 16,
    },
    calendarRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateCellWrapper: {
        flex: 1,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateCellStrip: {
        width: '100%',
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inRangeStrip: {
        backgroundColor: '#FFF0E6',
    },
    startStrip: {
        borderTopLeftRadius: 18,
        borderBottomLeftRadius: 18,
    },
    endStrip: {
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
    },
    dateCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDateCircle: {
        borderWidth: 1,
        borderColor: '#FF5722',
    },
    dateText: {
        color: '#333',
        fontSize: 16,
    },
    inRangeText: {
        color: '#FF5722',
    },
    selectedDateText: {
        fontWeight: 'bold',
        color: '#FF5722',
    },
    mealDateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 16,
    },
    mealDateTitle: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
    arrowControls: {
        flexDirection: 'row',
        gap: 10,
    },
    arrowButton: {
        padding: 8,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mealsContainer: {
        marginHorizontal: 36,
        padding: 16,
        gap: 24, 
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    mealCardContainer: {
        width: '100%',
    },
    mealTypeTitle: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
        marginBottom: 12,
        alignSelf: 'flex-start',
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    cardExpanded: {
        height: 437, 
    },
    imageContainer: {
        width: '100%',
        height: 180, 
        overflow: 'hidden',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    mealTitle: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
    mealSubtitle: {
        color: '#666',
        fontSize: 14,
        marginTop: 4,
    },
    editIcon: {
        padding: 4,
    },
    badgesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 12,
    },
    badge: {
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
    },
    badgeText: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
    swapSection: {
        marginTop: 16,
    },
    swapSummary: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    hiddenContent: {
        overflow: 'hidden',
    },
    swapItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 8,
        padding: 12,
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    rotiImageContainer: {
        width: 119,
        height: 82,
        borderRadius: 6,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    swapItemText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    footerCard: {
        marginHorizontal: 36,
        marginTop: 24,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
    },
    saveBadge: {
        backgroundColor: '#FFF0E6',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
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
    },
});
