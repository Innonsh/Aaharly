import React, { useState, useContext } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import BackIcon from "../../assets/Icons/back_arrow.svg";
import AppText from "../../components/AppText";
import { styles } from "./explorePlansStyle";
import { LocalizationContext } from "../../contexts/LocalizationContext";
import { MealService } from "../../services/MealServices";
import { MealCard } from "../../common/cards/mealCard";

export default function ExploreMeals() {
  const navigation = useNavigation();
  const { translations } = useContext(LocalizationContext);
  const strings = translations as any;

  const [activeCategory, setActiveCategory] = useState("starter");

  const categories = [
    { key: "starter", label: strings.exploreMeals.categories.starter },
    { key: "balanced", label: strings.exploreMeals.categories.balanced },
    { key: "essential", label: strings.exploreMeals.categories.essential },
    { key: "premium", label: strings.exploreMeals.categories.premium },
  ];

  const { data: meals = [] } = useQuery({
    queryKey: ["meal-plans"],
    queryFn: MealService.getAllMealPlans,
  });

  return (
    <SafeAreaView style={styles.safe}>
      {/* 🔒 FIXED HEADER (DOES NOT SCROLL) */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <BackIcon width={16} height={16} />
        </TouchableOpacity>

        <AppText variant="title" style={styles.headerTitle}>
          {strings.exploreMeals.title}
        </AppText>

        <View style={{ width: wp("12%") }} />
      </View>

      {/* 📜 SCROLLING CONTENT */}
      <FlatList
        data={meals}
        keyExtractor={(it) => it.id || it._id}
        renderItem={({ item }) => <MealCard item={item} />}

        /* ✅ CATEGORY TABS MOVE HERE */
        ListHeaderComponent={
          <View>
            <View style={styles.categoryContainer}>
              {categories.map((item) => {
                const isActive = activeCategory === item.key;
                return (
                  <TouchableOpacity
                    key={item.key}
                    style={[
                      styles.categoryBox,
                      isActive && styles.categoryBoxActive,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setActiveCategory(item.key)}
                  >
                    <AppText
                      variant="chip"
                      style={[
                        styles.categoryText,
                        isActive && styles.categoryTextActive,
                      ]}
                    >
                      {item.label}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ✅ 18px RESPONSIVE GAP */}
            <View style={{ height: hp("2.2%") }} />
          </View>
        }

        ItemSeparatorComponent={() => (
          <View style={{ height: hp("2%") }} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
