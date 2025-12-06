import React, { useState } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
    Alert,
    Platform,
    UIManager,
    LayoutAnimation,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppText from "../../components/AppText";
import { Colors } from "../../theme/Colors";
import { fonts } from "../../theme/Fonts";
import { NavigationRoutes, RootStackParamList } from "../../navigation/NavigationRoutes";


import BackIcon from "../../assets/HomePage/backicon.svg"; 
import MealIllustration from "../../assets/HomePage/home2.svg";

const SCREEN_WIDTH = Dimensions.get("window").width;

type ExplorePlansNavProp = NativeStackNavigationProp<RootStackParamList, NavigationRoutes.EXPLORE_PLANS>;


type Meal = {
    id: string;
    title: string;
    pricePerWeek: string;
    subtitle?: string;
    image?: any;
};

const DUMMY_MEALS: Meal[] = [
    {
        id: "1",
        title: "Weekly Fat Loss Plan",
        pricePerWeek: "₹1439/Week",
        subtitle: "Includes 2 meals/day",
        image: null,
    },
    {
        id: "2",
        title: "Weekly Balanced Plan",
        pricePerWeek: "₹1499/Week",
        subtitle: "Includes 3 meals/day",
        image: null,
    },
    {
        id: "3",
        title: "Weekly Muscle Gain Plan",
        pricePerWeek: "₹1559/Week",
        subtitle: "Includes 4 meals/day",
        image: null,
    },
];

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
                <MealIllustration width={359} height={216} />
            </View>

            <View style={[
                styles.largeMealDetails,
                {
                    height: expanded ? undefined : 135,
                    gap: expanded ? 20 : 12,
                }
            ]}>
                <View>
                    <AppText variant="title" numberOfLines={1} style={{ fontSize: 18 }}>
                        {item.title}
                    </AppText>
                    <AppText variant="subtitle" style={{ marginTop: 4, color: "#666", fontSize: 14 }}>
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
                        <AppText variant="labels" style={{ textDecorationLine: "line-through", color: "#999", fontSize: 12 }}>
                            ₹1799/Week
                        </AppText>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <AppText variant="title" style={{ fontSize: 18 }}>
                                {item.pricePerWeek}
                            </AppText>
                            <AppText variant="labels" style={{ color: "#FF5722", marginLeft: 8, fontWeight: "bold" }}>
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

const FILTERS = ["Starter", "Balanced", "Essential", "Premium", "All"];

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
                    <AppText variant="title" style={{ fontSize: 24 }}>←</AppText>
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
            <FlatList
                data={DUMMY_MEALS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MealCard item={item} />}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: 393,
        height: 44, 
        marginTop: 56, 
        paddingHorizontal: 24, 
        gap: 71,
    },
    backButton: {
    },
    headerTitle: {
        fontSize: 18, 
        fontFamily: fonts.SemiBold,
    },
    filterContainer: {
        marginTop: 21, 
        marginLeft: 16,
        height: 38,
        width: 361,
    },
    filterContent: {
        gap: 8,
        alignItems: 'center',
    },
    filterButton: {
        width: 87,
        height: 38,
        borderRadius: 16,
        paddingVertical: 12, 
        paddingHorizontal: 18, 
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0", 
        backgroundColor: "transparent",
    },
    filterButtonActive: {
        backgroundColor: "#FF5722", 
        borderColor: "#FF5722",
    },
    filterText: {
        fontSize: 12,
        color: "#666",
        fontFamily: fonts.Regular,
    },
    filterTextActive: {
        color: "#FFF",
        fontFamily: fonts.SemiBold,
    },
    listContent: {
        padding: 16,
        paddingTop: 24,
        paddingBottom: 32,
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
        bottom: 0,
        width: 361,
        backgroundColor: "#FFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        padding: 16,
        justifyContent: "space-between",
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
});
