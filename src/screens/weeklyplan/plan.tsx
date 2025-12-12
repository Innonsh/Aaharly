import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import AppText from '../../components/AppText';
import { Colors } from '../../theme/Colors';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import PencilIcon from '../../assets/planDetails/pencil.svg';
import RotiImage from '../../assets/planDetails/roti.svg';
import ThaliImage from '../../assets/planDetails/thali.svg';
import InfoIcon from '../../assets/planDetails/information.svg';
import { NavigationRoutes, RootStackParamList } from '../../navigation/NavigationRoutes';
import Button from '../../components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { styles } from './weeklyPlanStyle';
import { WEEK_DAYS, CALENDAR_WEEKS } from './weeklyPlanMock';
import { MealCardProps } from '../../types/weeklyplan/weeklyPlan';

const MealCard = ({ title, subtitle, badges, type }: MealCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandHeight = useSharedValue(0);

  const EXPAND_HEIGHT = hp('18%');
  const EXPAND_MARGIN = hp('1.5%');

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
      height: expandHeight.value * EXPAND_HEIGHT,
      opacity: expandHeight.value,
      marginTop: expandHeight.value * EXPAND_MARGIN,
    };
  });

  return (
    <View style={styles.mealCardContainer}>
      <AppText variant="title" style={styles.mealTypeTitle}>{type}</AppText>

      <View style={[styles.card, isExpanded && styles.cardExpanded]}>
        <View style={styles.imageContainer}>
          <ThaliImage width={wp('90%')} height={hp('22%')} style={styles.mainImage} />
        </View>

        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp('1.5%') }}>
                <AppText variant="title" style={styles.mealTitle}>{title}</AppText>
                <InfoIcon width={wp('4%')} height={wp('4%')} />
              </View>
              <AppText variant="subtitle" style={styles.mealSubtitle}>{subtitle}</AppText>
            </View>
            <TouchableOpacity onPress={toggleExpand} style={styles.editIcon}>
              <PencilIcon width={wp('6%')} height={wp('6%')} fill="#FF5722" color="#FF5722" />
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
                  <RotiImage width={wp('32%')} height={hp('10%')} />
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

const Calendar = () => {
  return (
    <View style={styles.calendarContainer}>
      <View style={styles.calendarHeader}>
        {WEEK_DAYS.map((day, index) => (
          <View key={index} style={styles.dayHeaderCell}>
            <AppText variant="labels" style={styles.dayText}>{day}</AppText>
          </View>
        ))}
      </View>
      <View style={styles.calendarGrid}>
        {CALENDAR_WEEKS.map((week, weekIndex) => (
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
                      <AppText variant="label" style={[
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
          <BackArrow width={wp('4%')} height={wp('4%')} />
        </TouchableOpacity>
        <AppText variant="title" style={styles.headerTitle}>Plan Details</AppText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Weekly Plan Title */}
        <View style={styles.titleSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp('1.5%') }}>
            <AppText variant="title1" style={styles.mainTitle}>Your Weekly Plan</AppText>
            <InfoIcon width={wp('4%')} height={wp('4%')} />
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
              <BackArrow width={wp('3%')} height={wp('3%')} style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowButton}>
              <BackArrow width={wp('3%')} height={wp('3%')} />
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
          <View style={styles.footerCardContent}>
            <AppText variant="title" style={styles.footerTitle}>Weekly fat loss plan</AppText>
            <AppText variant="caption" style={styles.footerSubtitle}>Includes 2 Meals/Day</AppText>
            <View style={styles.footerPriceRow}>
              <AppText
                variant="body"
                style={styles.footerOriginalPrice}
              >
                ₹1799/Week
              </AppText>

              <AppText variant="title" style={styles.footerDiscountedPrice}>₹ 1439/Week</AppText>
              <AppText
                variant="labels"
                style={styles.footerDiscountBadge}
              >
                20% OFF
              </AppText>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {/* Save badge commented as in your code */}
          </View>
        </View>

        <View style={{ height: hp('2.5%') }} />
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
