import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/AppText';
import { Colors } from '../../theme/Colors';
import { NavigationRoutes } from '../../navigation/NavigationRoutes';
import GymGirl from '../../assets/nutrition/gymgirl.svg';
import MealIllustration from '../../assets/HomePage/home2.svg';
import AgeIcon from '../../assets/nutrition/mealgen1.svg';
import HeightIcon from '../../assets/nutrition/mealgen2.svg';
import WeightIcon from '../../assets/nutrition/mealgen3.svg';
import GenderIcon from '../../assets/nutrition/mealgen4.svg';
import ActivityIcon from '../../assets/nutrition/mealgen5.svg';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import { useProfile } from '../../hooks/useAccount';

import { styles } from './nutritionStyle';
import { MEALS_DATA } from './nutritionMock';
import { Meal } from '../../types/nutritionaloverview/nutrition';

const MealCard = ({ item }: { item: Meal }) => {
    const navigation = useNavigation<any>();
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleExpand}
            style={styles.largeMealCard}
        >
            <View style={styles.largeMealImage}>
                <MealIllustration width={wp('91.9%')} height={wp('86%')} />
            </View>

            <View style={[
                styles.largeMealDetails,
                {
                    gap: expanded ? wp('4%') : wp('2.5%'),
                }
            ]}>
                <View>
                    <AppText variant="title" numberOfLines={1} style={{ fontSize: wp('4.6%') }}>
                        {item.title}
                    </AppText>
                    <AppText variant="subtitle" style={{ marginTop: hp('0.5%'), color: "#666", fontSize: wp('3.6%') }}>
                        {item.desc}
                    </AppText>

                    {expanded && (
                        <View style={styles.badgesContainer}>
                            <View style={styles.badge}>
                                <AppText variant="labels" style={styles.badgeText}>{item.tag1}</AppText>
                            </View>
                            <View style={styles.badge}>
                                <AppText variant="labels" style={styles.badgeText}>{item.tag2}</AppText>
                            </View>
                            <View style={styles.badge}>
                                <AppText variant="labels" style={styles.badgeText}>{item.tag3}</AppText>
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.cardBottom}>
                    <View>
                        <AppText variant="labels" style={{ textDecorationLine: "line-through", color: "#999", fontSize: wp('3%') }}>
                            {item.originalPrice}
                        </AppText>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <AppText variant="title" style={{ fontSize: wp('4.6%') }}>
                                {item.currentPrice}
                            </AppText>
                            <AppText variant="labels" style={{ color: "#FF5722", marginLeft: wp('2%'), fontWeight: "bold" }}>
                                20% OFF
                            </AppText>
                        </View>
                        <AppText variant="caption" style={{ marginTop: 2, color: "#999" }}>
                            {item.subtitle}
                        </AppText>
                    </View>

                    <TouchableOpacity style={styles.buyBtn} activeOpacity={0.85} onPress={() => navigation.navigate(NavigationRoutes.WEEKLY_PLAN)}>
                        <AppText variant="button" color="#fff">
                            Buy Plan
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity >
    );
};

export default function NutritionalOverviewScreen() {
    const navigation = useNavigation<any>();
    const { data: profile } = useProfile();
    const user = profile?.data?.basic || {};
    const stats = profile?.data?.physicalStats || {};
    // const goals = profile?.data?.goalPref || {};

    const displayAge = user.age || "--";
    const displayHeight = stats.height || "--";
    const displayWeight = stats.weight || "--";
    const displayGender = user.gender ? (user.gender.charAt(0).toUpperCase() + user.gender.slice(1)) : "--";
    const displayActivity = stats.activityLevel ? (stats.activityLevel.charAt(0).toUpperCase() + stats.activityLevel.slice(1)) : "--";

    // Calculate BMI if height and weight exist
    const bmi = (stats.height && stats.weight)
        ? (stats.weight / ((stats.height / 100) * (stats.height / 100))).toFixed(1)
        : "--";

    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);

    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <BackArrow width={16} height={16} />
                    </TouchableOpacity>
                    <AppText variant="title" style={styles.headerTitle}>Overview</AppText>
                    <View style={{ width: 40 }} />
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <AppText variant="title1" style={styles.mainTitle}>Your Nutritional Overview</AppText>
                    <AppText variant="body" style={styles.subtitle}>Quick insights into your overall dietary balance.</AppText>
                </View>

                {/* Profile Summary Card */}
                <View style={styles.card}>
                    <AppText variant="title" style={styles.cardTitle}>Profile Summary</AppText>

                    <View style={styles.profileGrid}>
                        <View style={styles.profileItem}>
                            <AppText variant="title1" style={styles.profileValue}>{displayAge}</AppText>
                            <View style={styles.iconPlaceholder}>
                                <AgeIcon width={40} height={40} />
                            </View>
                            <AppText variant="labels" style={styles.profileLabel}>Age</AppText>
                        </View>
                        <View style={styles.profileItem}>
                            <AppText variant="title1" style={styles.profileValue}>{displayHeight}</AppText>
                            <View style={styles.iconPlaceholder}>
                                <HeightIcon width={40} height={40} />
                            </View>
                            <AppText variant="labels" style={styles.profileLabel}>height</AppText>
                        </View>
                        <View style={styles.profileItem}>
                            <AppText variant="title1" style={styles.profileValue}>{displayWeight}</AppText>
                            <View style={styles.iconPlaceholder}>
                                <WeightIcon width={40} height={40} />
                            </View>
                            <AppText variant="labels" style={styles.profileLabel}>Weight</AppText>
                        </View>
                    </View>

                    <View style={[styles.profileGrid, { marginTop: 20 }]}>
                        <View style={styles.profileItem}>
                            <AppText variant="title1" style={styles.profileValue}>{displayGender}</AppText>
                            <View style={styles.iconPlaceholder}>
                                <GenderIcon width={40} height={40} />
                            </View>
                            <AppText variant="labels" style={styles.profileLabel}>Gender</AppText>
                        </View>
                        <View style={styles.profileItem}>
                            <AppText variant="title1" style={styles.profileValue}>{displayActivity}</AppText>
                            <View style={styles.iconPlaceholder}>
                                <ActivityIcon width={40} height={40} />
                            </View>
                            <AppText variant="labels" style={styles.profileLabel}>Activity Level</AppText>
                        </View>
                        <View style={styles.profileItem} />
                    </View>
                </View>

                {/* Body Composition Card */}
                <View style={[styles.card, styles.bodyCompCard]}>
                    <AppText variant="title" style={styles.cardTitle}>Body Composition</AppText>

                    <View style={styles.bmiSection}>
                        <View style={styles.bmiValueContainer}>
                            <AppText variant="title1" style={{ fontSize: 32 }}>{bmi}</AppText>
                            <AppText variant="body" style={{ color: Colors.secondary }}>BMI</AppText>
                        </View>
                        <View style={styles.bmiMessageContainer}>
                            <GymGirl width={100} height={80} />
                            <AppText variant="caption" style={styles.crushingItText}>Crushing it!</AppText>
                            <AppText variant="caption" style={styles.crushingItSubText}>Stay consistent with our plans.</AppText>
                        </View>
                    </View>

                    <AppText variant="title" style={[styles.cardTitle, { marginTop: 20 }]}>Your needs</AppText>
                    <View style={styles.needsContainer}>
                        <View style={styles.needItem}>
                            <AppText variant="title" style={styles.needValue}>High</AppText>
                            <AppText variant="labels" style={styles.needLabel}>Protein</AppText>
                        </View>
                        <View style={styles.needItem}>
                            <AppText variant="title" style={styles.needValue}>Moderate</AppText>
                            <AppText variant="labels" style={styles.needLabel}>Carb</AppText>
                        </View>
                        <View style={styles.needItem}>
                            <AppText variant="title" style={styles.needValue}>Low</AppText>
                            <AppText variant="labels" style={styles.needLabel}>Fat</AppText>
                        </View>
                    </View>
                </View>

                {/* Sample Meal Plan */}
                <View style={styles.mealPlanSection}>
                    <AppText variant="title" style={styles.sectionTitle}>Sample meal plan for you</AppText>
                    <AppText variant="body" style={styles.sectionSubtitle}>Move toward our healthier balanced meal plans.</AppText>

                    {MEALS_DATA.map((meal) => (
                        <View key={meal.id} style={{ marginBottom: 16 }}>
                            <MealCard item={meal} />
                        </View>
                    ))}

                    <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate(NavigationRoutes.EXPLORE_PLANS)}>
                        <AppText variant="button" style={{ color: Colors.primary, textDecorationLine: 'underline' }}>View all</AppText>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    backButton: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
    titleSection: {
        marginTop: 20,
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 22,
        marginBottom: 5,
        fontFamily: fonts.SemiBold,
    },
    subtitle: {
        color: '#666',
        fontSize: 14,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    bodyCompCard: {
        backgroundColor: '#FFF5F0',
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        marginBottom: 15,
    },
    profileGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileItem: {
        alignItems: 'center',
        width: '30%',
    },
    profileValue: {
        fontSize: 18,
        fontFamily: fonts.Bold,
    },
    iconPlaceholder: {
        marginVertical: 5,
    },
    profileLabel: {
        color: '#888',
        fontSize: 12,
    },
    bmiSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
    },
    bmiValueContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bmiMessageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    crushingItText: {
        fontSize: 14,
        fontFamily: fonts.Medium,
        color: '#555',
        marginTop: 5,
    },
    crushingItSubText: {
        fontSize: 10,
        color: '#888',
        textAlign: 'center',
    },
    needsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    needItem: {
        alignItems: 'center',
        width: '30%',
    },
    needValue: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
    },
    needLabel: {
        color: '#666',
        marginTop: 4,
    },
    mealPlanSection: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: 13,
        color: '#666',
        marginBottom: 15,
    },
    largeMealCard: {
        backgroundColor: "transparent",
        borderRadius: 20,
        padding: 0,
        flexDirection: "column",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        alignItems: "center",
        width: 350,
        height: 315,
        alignSelf: "center",
        position: "relative",
    },
    largeMealImage: {
        width: 361,
        height: 317,
        borderRadius: 20,
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#fff",
    },
    largeMealDetails: {
        position: "absolute",
        top: 182,
        width: 361,
        height: 135,
        backgroundColor: "#FFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        padding: 16,
    },
    cardBottom: {
        marginTop: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    buyBtn: {
        backgroundColor: "#FF5722",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    badgesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 12,
    },
    badge: {
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
    },
    badgeText: {
        fontSize: 12,
        color: "#333",
        fontWeight: "500",
    },
    viewAllButton: {
        alignSelf: 'center',
        marginTop: 16,
        padding: 8,
    },
});
