import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, StyleSheet, Image, ActivityIndicator } from 'react-native';
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
import { useProfileAnalysis } from '../../hooks/useProfileAnalysis';

import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { styles } from './nutritionStyle';
import { MEALS_DATA } from './nutritionMock';
import { Meal } from '../../types/nutritionaloverview/nutrition';



const MealCard = ({ item }: { item: Meal }) => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.largeMealCard}>
            <View style={styles.mealImageContainer}>
                <MealIllustration
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                />
            </View>

            <View style={styles.largeMealDetails}>
                <AppText variant="labels" style={styles.mealTitle}>
                    {item.title}
                </AppText>
                <AppText variant="subtitle" style={styles.mealDesc}>
                    {item.desc}
                </AppText>
                <View style={styles.badgesContainer}>
                    <View style={styles.badge}><AppText style={styles.badgeText}>{item.tag1}</AppText></View>
                    <View style={styles.badge}><AppText style={styles.badgeText}>{item.tag2}</AppText></View>
                    <View style={styles.badge}><AppText style={styles.badgeText}>{item.tag3}</AppText></View>
                </View>

                <View style={styles.cardBottom}>
                    <View style={styles.priceContainer}>
                        <AppText style={styles.originalPrice}>{item.originalPrice}</AppText>

                        <View style={styles.currentPriceRow}>
                            <AppText style={styles.currentPrice}>{item.currentPrice}</AppText>
                            <AppText style={styles.discountLabel}>20% OFF</AppText>
                        </View>

                        <AppText style={styles.includesText}>Includes 2 Meals/Day</AppText>
                    </View>
                    <TouchableOpacity
                        style={styles.buyBtn}
                        onPress={() => navigation.navigate(NavigationRoutes.WEEKLY_PLAN)}
                    >
                        <AppText variant="button" color="#fff">Buy Plan</AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const calculateBMI = (height: number, weight: number): string => {
    if (!height || !weight) return "N/A";
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

export default function NutritionalOverviewScreen() {
    const navigation = useNavigation<any>();
    const { data: profile } = useProfile();
    const { data: analysisData, isLoading: isAnalysisLoading, error: analysisError, refetch } = useProfileAnalysis();
    const user = profile?.data?.basic || {};
    const stats = profile?.data?.physicalStats || {};
    const displayAge = user.age || "24";
    const displayHeight = stats.height ? `${stats.height}cm` : "180cm";
    const displayWeight = stats.weight ? `${stats.weight}kg` : "71.3kg";
    const displayGender = user.gender ? (user.gender.charAt(0).toUpperCase() + user.gender.slice(1)) : "Male";
    const displayActivity = stats.activityLevel ? (stats.activityLevel.charAt(0).toUpperCase() + stats.activityLevel.slice(1)) : "Sedentary";

    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);

    if (isAnalysisLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <AppText variant="body" style={{ color: '#7C8394', marginTop: 16 }}>Loading analysis...</AppText>
                </View>
            </SafeAreaView>
        );
    }

    if (analysisError) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <AppText variant="title" style={{ color: Colors.secondary, marginBottom: 8 }}>Oops!</AppText>
                    <AppText variant="body" style={{ color: '#7C8394', textAlign: 'center', marginBottom: 24 }}>
                        We couldn't fetch your profile analysis. Please check your connection and try again.
                    </AppText>
                    <TouchableOpacity
                        onPress={() => refetch()}
                        style={{ paddingHorizontal: 24, paddingVertical: 12, backgroundColor: Colors.primary, borderRadius: 24 }}
                    >
                        <AppText variant="button" color="#fff">Retry</AppText>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    if (!analysisData) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <AppText variant="body" style={{ color: '#7C8394' }}>No analysis data available.</AppText>
                </View>
            </SafeAreaView>
        );
    }

    const { bmi, nutritionalNeeds } = analysisData;
    const needs = nutritionalNeeds || { protein: 'N/A', carb: 'N/A', fat: 'N/A' };

    // Calculate BMI fallback
    const calculatedBMI = calculateBMI(stats.height, stats.weight);
    const displayBMI = bmi || calculatedBMI;



    const handleGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <BackArrow width={16} height={16} />
                    </TouchableOpacity>
                    <AppText variant="title" align="center" style={styles.headerTitle}>Overview</AppText>
                    <View style={{ width: 44 }} />
                </View>

                <View style={styles.titleSection}>
                    <AppText variant="title1" style={styles.mainTitle}>Your Nutritional Overview</AppText>
                    <AppText variant="body" style={styles.subtitle}>Quick insights into your overall dietary balance.</AppText>
                </View>

                <View style={styles.card}>
                    <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                        <Defs>
                            <LinearGradient id="summaryGrad" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor="#F9FAFB" stopOpacity="1" />
                                <Stop offset="0.9999" stopColor="#FCBDA6" stopOpacity="0.57" />
                                <Stop offset="1" stopColor="#FF6B35" stopOpacity="0.01" />
                            </LinearGradient>
                        </Defs>
                        <Rect x="0" y="0" width="100%" height="100%" rx={24} ry={24} fill="url(#summaryGrad)" />
                    </Svg>
                    <View style={styles.cardContent}>
                        <AppText variant="title" style={styles.cardTitle}>Profile Summery</AppText>

                        <View style={styles.summaryList}>
                            <View style={styles.summaryItem}>
                                <View style={styles.summaryLeft}>
                                    <View style={styles.summaryIconContainer}>
                                        <AgeIcon width={24} height={24} />
                                    </View>
                                    <AppText variant="labels" style={styles.summaryLabel}>Age</AppText>
                                </View>
                                <AppText style={styles.summaryValue}>{displayAge}</AppText>
                            </View>

                            <View style={styles.summaryItem}>
                                <View style={styles.summaryLeft}>
                                    <View style={styles.summaryIconContainer}>
                                        <HeightIcon width={24} height={24} />
                                    </View>
                                    <AppText variant="labels" style={styles.summaryLabel}>height</AppText>
                                </View>
                                <AppText style={styles.summaryValue}>{displayHeight}</AppText>
                            </View>

                            <View style={styles.summaryItem}>
                                <View style={styles.summaryLeft}>
                                    <View style={styles.summaryIconContainer}>
                                        <WeightIcon width={24} height={24} />
                                    </View>
                                    <AppText variant="labels" style={styles.summaryLabel}>Weight</AppText>
                                </View>
                                <AppText style={styles.summaryValue}>{displayWeight}</AppText>
                            </View>

                            <View style={styles.summaryItem}>
                                <View style={styles.summaryLeft}>
                                    <View style={styles.summaryIconContainer}>
                                        <GenderIcon width={24} height={24} />
                                    </View>
                                    <AppText variant="labels" style={styles.summaryLabel}>Gender</AppText>
                                </View>
                                <AppText style={styles.summaryValue}>{displayGender}</AppText>
                            </View>

                            <View style={styles.summaryItem}>
                                <View style={styles.summaryLeft}>
                                    <View style={styles.summaryIconContainer}>
                                        <ActivityIcon width={24} height={24} />
                                    </View>
                                    <AppText variant="labels" style={styles.summaryLabel}>Activity Level</AppText>
                                </View>
                                <AppText style={styles.summaryValue}>{displayActivity}</AppText>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                        <Defs>
                            <LinearGradient id="bodyGrad" x1="0" y1="1" x2="0" y2="0">
                                <Stop offset="1" stopColor="#FF6B35" stopOpacity="0.01" />
                                <Stop offset="0.9999" stopColor="#FCBDA6" stopOpacity="0.57" />
                                <Stop offset="0" stopColor="#F9FAFB" stopOpacity="1" />
                            </LinearGradient>
                        </Defs>
                        <Rect x="0" y="0" width="100%" height="100%" rx={24} ry={24} fill="url(#bodyGrad)" />
                    </Svg>
                    <View style={styles.cardContent}>
                        <AppText variant="title" style={styles.cardTitle}>Body Composition</AppText>

                        <View style={styles.bmiSection}>
                            <View style={styles.bmiValueContainer}>
                                <AppText style={styles.bmiValue}>{displayBMI}</AppText>
                                <AppText style={styles.bmiLabel}>BMI</AppText>
                            </View>
                            <View style={styles.bmiMessageContainer}>
                                <GymGirl width={100} height={80} />
                                <AppText style={styles.crushingItText}>Crushing it!</AppText>
                                <AppText style={styles.crushingItSubText}>Stay consistent with our plans.</AppText>
                            </View>
                        </View>

                        <AppText variant="title" style={styles.needsSectionTitle}>Your needs</AppText>
                        <View style={styles.needsContainer}>
                            <View style={styles.needItem}>
                                <AppText style={styles.needValue}>{needs.protein}</AppText>
                                <AppText style={styles.needLabel}>Protein</AppText>
                            </View>
                            <View style={styles.needItem}>
                                <AppText style={styles.needValue}>{needs.carb}</AppText>
                                <AppText style={styles.needLabel}>Carb</AppText>
                            </View>
                            <View style={styles.needItem}>
                                <AppText style={styles.needValue}>{needs.fat}</AppText>
                                <AppText style={styles.needLabel}>Fat</AppText>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Sample Meal Plan */}
                <View style={styles.mealPlanSection}>
                    <AppText variant="title" style={styles.sectionTitle}>Sample meal plan for you</AppText>
                    <AppText variant="body" style={styles.sectionSubtitle}>Move toward our healthier balanced meal plans.</AppText>

                    {MEALS_DATA.map((meal) => (
                        <View key={meal.id}>
                            <MealCard item={meal} />
                        </View>
                    ))}

                    <TouchableOpacity style={styles.viewAllButton} onPress={() => navigation.navigate(NavigationRoutes.EXPLORE_PLANS)}>
                        <AppText style={styles.viewAllText}>View all</AppText>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView >
    );
}
