import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert,
    LayoutAnimation,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import AppText from "../../components/AppText";
import { fonts } from "../../theme/Fonts";

import MealIllustration from "../../assets/HomePage/home2.svg";

import { styles } from "./explorePlansStyle";
import { DUMMY_MEALS, FILTERS } from "./explorePlansMock";
import { ExplorePlansNavProp, Meal } from "../../types/exploreplans/explorePlans";

const MealCard = ({ item }: { item: Meal }) => {
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
                <MealIllustration width={wp('91.8%')} height={hp('37.2%')} />
            </View>

            <View style={[
                styles.largeMealDetails,
                {
                    height: expanded ? undefined : hp('15.8%'), // approx 135px
                    gap: expanded ? hp('2.3%') : hp('1.4%'), // 20px : 12px
                }
            ]}>
                <View>
                    <AppText variant="title" numberOfLines={1} style={{ fontSize: wp('4.6%') }}> {/* 18px */}
                        {item.title}
                    </AppText>

                    <AppText variant="subtitle" style={{ marginTop: hp('0.5%'), color: "#666", fontSize: wp('3.6%') }}> {/* 14px */}
                        High-protein, low-carb meal
                    </AppText>

                    {expanded && (
                        <View style={styles.badgesContainer}>
                            <View style={styles.badge}>
                                <AppText variant="labels" style={styles.badgeText}>High Proteins</AppText>
                            </View>
                            <View style={styles.badge}>
                                <AppText variant="labels" style={styles.badgeText}>Low Carbs</AppText>
                            </View>
                            <View style={styles.badge}>
                                <AppText variant="labels" style={styles.badgeText}>2 Meals/day</AppText>
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.cardBottom}>
                    <View>
                        <AppText variant="labels" style={{ textDecorationLine: "line-through", color: "#999", fontSize: wp('3%') }}> {/* 12px */}
                            ₹1799/Week
                        </AppText>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <AppText variant="title" style={{ fontSize: wp('4.6%') }}> {/* 18px */}
                                {item.pricePerWeek}
                            </AppText>
                            <AppText variant="labels" style={{ color: "#FF5722", marginLeft: wp('2%'), fontWeight: "bold" }}>
                                20% OFF
                            </AppText>
                        </View>
                        <AppText variant="caption" style={{ marginTop: 2, color: "#999" }}>
                            {item.subtitle}
                        </AppText>
                    </View>

                    <TouchableOpacity style={styles.buyBtn} activeOpacity={0.85} onPress={() => Alert.alert("Buy Plan", "Purchase flow")}>
                        <AppText variant="button" color="#fff">
                            Buy Plan
                        </AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default function ExplorePlansScreen() {
    const navigation = useNavigation<ExplorePlansNavProp>();
    const [selectedFilter, setSelectedFilter] = useState("Starter");

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    {/* Placeholder for Back Icon if SVG not available, using text arrow for now if needed, but user likely has asset */}
                    {/* Assuming BackIcon is available or using a simple arrow */}
                    <AppText variant="title" style={{ fontSize: wp('6%') }}>←</AppText>
                </TouchableOpacity>
                <AppText variant="title" style={styles.headerTitle}>Explore Meals</AppText>
            </View>

            {/* Filter Bar */}
            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContent}
                >
                    {FILTERS.map((filter) => {
                        const isSelected = selectedFilter === filter;
                        return (
                            <TouchableOpacity
                                key={filter}
                                style={[
                                    styles.filterButton,
                                    isSelected && styles.filterButtonActive,
                                ]}
                                onPress={() => setSelectedFilter(filter)}
                            >
                                <AppText
                                    variant="labels"
                                    style={[
                                        styles.filterText,
                                        isSelected && styles.filterTextActive,
                                    ]}
                                >
                                    {filter}
                                </AppText>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Meal List */}
            <View style={styles.mealListContainer}>
                <FlatList
                    data={DUMMY_MEALS}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <MealCard item={item} />}
                    contentContainerStyle={styles.listContent}
                    ItemSeparatorComponent={() => <View style={{ height: hp('1.4%') }} />} // 12px
                />
            </View>
        </SafeAreaView>
    );
}
