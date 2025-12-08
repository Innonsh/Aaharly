import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import LockIcon from '../../assets/payments/lock.svg';

import { styles } from './payStyle';
import { PaymentMethodType } from '../../types/payment/payment';
import { PAYMENT_METHODS, WEEKLY_PLAN_DETAILS } from './payMock';

export default function PaymentScreen() {
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
    const [promoCode, setPromoCode] = useState('');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <BackArrow width={16} height={16} color="#000" />
                </TouchableOpacity>
                <AppText style={styles.headerTitle}>Complete Payment</AppText>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.secureHeader}>
                    <LockIcon width={16} height={16} color="#27AE60" />
                    <AppText style={styles.secureHeaderText}>Securely pay for your weekly meal plan</AppText>
                </View>

                {/* Weekly Plan Card */}
                <View style={styles.planCard}>
                    <AppText style={styles.planTitle}>{WEEKLY_PLAN_DETAILS.title}</AppText>
                    <View style={{ gap: 4 }}>
                        <AppText style={styles.planSubtitle}>{WEEKLY_PLAN_DETAILS.subtitle}</AppText>
                        <AppText style={styles.planDetail}>Start Date: {WEEKLY_PLAN_DETAILS.startDate}</AppText>
                        <AppText style={styles.planDetail}>Delivery Address: {WEEKLY_PLAN_DETAILS.deliveryAddress}</AppText>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.priceRow}>
                        <AppText style={styles.priceLabel}>Plan Price:</AppText>
                        <AppText style={styles.priceValue}>{WEEKLY_PLAN_DETAILS.price}</AppText>
                    </View>
                    <View style={styles.priceRow}>
                        <AppText style={styles.priceLabel}>Discount:</AppText>
                        <AppText style={styles.discountValue}>{WEEKLY_PLAN_DETAILS.discount}</AppText>
                    </View>
                    <View style={styles.priceRow}>
                        <AppText style={styles.totalLabel}>Total Payable:</AppText>
                        <AppText style={styles.totalValue}>{WEEKLY_PLAN_DETAILS.total}</AppText>
                    </View>
                </View>

                {/* Payment Methods */}
                <View style={styles.methodSection}>
                    <AppText style={styles.sectionTitle}>Select Payment Method</AppText>

                    {PAYMENT_METHODS.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={[styles.methodCard, selectedMethod === method.id && styles.selectedMethod]}
                            onPress={() => setSelectedMethod(method.id)}
                            activeOpacity={0.7}
                        >
                            <AppText style={styles.methodTitle}>{method.title}</AppText>
                            <AppText style={styles.methodSubtitle}>{method.subtitle}</AppText>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Promo Code */}
                <View style={styles.promoSection}>
                    <AppText style={styles.promoTitle}>Have a promo code?</AppText>
                    <View style={styles.promoInputContainer}>
                        <TextInput
                            style={styles.promoInput}
                            placeholder="Add Code here"
                            placeholderTextColor="#999"
                            value={promoCode}
                            onChangeText={setPromoCode}
                        />
                        <TouchableOpacity style={styles.applyButton}>
                            <AppText style={styles.applyButtonText}>Apply</AppText>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.secureFooter}>
                    <LockIcon width={12} height={12} color="#27AE60" />
                    <View>
                        <AppText style={styles.secureFooterText}>100% secure payments</AppText>
                        <AppText style={styles.secureFooterSubText}>We don't store your card details.</AppText>
                    </View>
                </View>
                <Button
                    title={`Pay ${WEEKLY_PLAN_DETAILS.total} Securely`}
                    onPress={() => { }}
                    variant="primary"
                    style={styles.payButton}
                />
            </View>
        </SafeAreaView>
    );
}
