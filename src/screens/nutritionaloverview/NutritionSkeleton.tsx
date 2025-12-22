import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styles } from './nutritionStyle';
import ShimmerPlaceholder from '../../components/ShimmerPlaceholder';

export default function NutritionSkeleton() {

    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    {/* Back Button Skeleton */}
                    <ShimmerPlaceholder width={44} height={44} borderRadius={22} />

                    {/* Header Title Skeleton */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <ShimmerPlaceholder width={100} height={20} borderRadius={4} />
                    </View>

                    <View style={{ width: 44 }} />
                </View>

                {/* Title Section */}
                <View style={[styles.titleSection, { marginTop: hp('3%') }]}>
                    <ShimmerPlaceholder width="70%" height={30} borderRadius={4} style={{ marginBottom: 10 }} />
                    <ShimmerPlaceholder width="50%" height={16} borderRadius={4} />
                </View>

                {/* Profile Summary Card Skeleton */}
                <View style={[styles.card, { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#F3F4F6' }]}>
                    <View style={styles.cardContent}>
                        <ShimmerPlaceholder width={140} height={24} borderRadius={4} style={{ marginBottom: hp('2.5%') }} />

                        <View style={styles.summaryList}>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <View key={item} style={[styles.summaryItem, { borderBottomWidth: 0 }]}>
                                    <View style={styles.summaryLeft}>
                                        <View style={styles.summaryIconContainer}>
                                            <ShimmerPlaceholder width={40} height={40} borderRadius={20} />
                                        </View>
                                        <ShimmerPlaceholder width={80} height={16} borderRadius={4} style={{ marginLeft: wp('2%') }} />
                                    </View>
                                    <ShimmerPlaceholder width={50} height={16} borderRadius={4} />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Body Composition Card Skeleton */}
                <View style={[styles.card, { marginTop: hp('2.5%'), backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#F3F4F6' }]}>
                    <View style={styles.cardContent}>
                        <ShimmerPlaceholder width={160} height={24} borderRadius={4} style={{ marginBottom: hp('2.5%') }} />

                        <View style={styles.bmiSection}>
                            <View style={styles.bmiValueContainer}>
                                <ShimmerPlaceholder width={80} height={60} borderRadius={8} />
                                <ShimmerPlaceholder width={40} height={16} borderRadius={4} style={{ marginTop: 8 }} />
                            </View>
                            <View style={styles.bmiMessageContainer}>
                                <ShimmerPlaceholder width={100} height={80} borderRadius={8} />
                                <ShimmerPlaceholder width={120} height={16} borderRadius={4} style={{ marginTop: 8 }} />
                            </View>
                        </View>

                        <ShimmerPlaceholder width={100} height={20} borderRadius={4} style={{ marginTop: hp('4%'), marginBottom: hp('2.5%') }} />

                        <View style={styles.needsContainer}>
                            {[1, 2, 3].map((item) => (
                                <View key={item} style={styles.needItem}>
                                    <ShimmerPlaceholder width={60} height={24} borderRadius={4} style={{ marginBottom: 4 }} />
                                    <ShimmerPlaceholder width={40} height={14} borderRadius={4} />
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Sample Meal Plan Skeleton (Optional but good for consistency) */}
                <View style={styles.mealPlanSection}>
                    <ShimmerPlaceholder width="60%" height={24} borderRadius={4} style={{ marginBottom: 8 }} />
                    <ShimmerPlaceholder width="80%" height={16} borderRadius={4} style={{ marginBottom: hp('2.5%') }} />

                    <View style={[styles.largeMealCard, { height: hp('45%'), borderWidth: 0 }]}>
                        <ShimmerPlaceholder width="100%" height={hp('22%')} borderRadius={0} />
                        <View style={{ padding: wp('5%') }}>
                            <ShimmerPlaceholder width="50%" height={20} borderRadius={4} style={{ marginBottom: 8 }} />
                            <ShimmerPlaceholder width="90%" height={14} borderRadius={4} />

                            <View style={styles.badgesContainer}>
                                <ShimmerPlaceholder width={60} height={24} borderRadius={12} />
                                <ShimmerPlaceholder width={60} height={24} borderRadius={12} />
                                <ShimmerPlaceholder width={60} height={24} borderRadius={12} />
                            </View>

                            <View style={styles.cardBottom}>
                                <View style={{ flex: 1 }}>
                                    <ShimmerPlaceholder width={40} height={14} borderRadius={4} style={{ marginBottom: 4 }} />
                                    <ShimmerPlaceholder width={80} height={24} borderRadius={4} />
                                </View>
                                <ShimmerPlaceholder width={100} height={44} borderRadius={20} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}
