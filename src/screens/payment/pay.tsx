import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import { Colors } from '../../theme/Colors';
import { fonts } from '../../theme/Fonts';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import LockIcon from '../../assets/payments/lock.svg';

const { width } = Dimensions.get('window');

export default function PaymentScreen() {
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
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
                    <AppText style={styles.planTitle}>Weekly fat loss plan</AppText>
                    <View style={{ gap: 4 }}>
                        <AppText style={styles.planSubtitle}>Includes 2 meals/day</AppText>
                        <AppText style={styles.planDetail}>Start Date: 1 Nov</AppText>
                        <AppText style={styles.planDetail}>Delivery Address: Home</AppText>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.priceRow}>
                        <AppText style={styles.priceLabel}>Plan Price:</AppText>
                        <AppText style={styles.priceValue}>₹ 1439</AppText>
                    </View>
                    <View style={styles.priceRow}>
                        <AppText style={styles.priceLabel}>Discount:</AppText>
                        <AppText style={styles.discountValue}>₹ -360</AppText>
                    </View>
                    <View style={styles.priceRow}>
                        <AppText style={styles.totalLabel}>Total Payable:</AppText>
                        <AppText style={styles.totalValue}>₹ 1079</AppText>
                    </View>
                </View>

                {/* Payment Methods */}
                <View style={styles.methodSection}>
                    <AppText style={styles.sectionTitle}>Select Payment Method</AppText>

                    <TouchableOpacity
                        style={[styles.methodCard, selectedMethod === 'UPI' && styles.selectedMethod]}
                        onPress={() => setSelectedMethod('UPI')}
                        activeOpacity={0.7}
                    >
                        <AppText style={styles.methodTitle}>UPI</AppText>
                        <AppText style={styles.methodSubtitle}>Pay Via Google PAY, Phone Pay, Paytm</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.methodCard, selectedMethod === 'Card' && styles.selectedMethod]}
                        onPress={() => setSelectedMethod('Card')}
                        activeOpacity={0.7}
                    >
                        <AppText style={styles.methodTitle}>Credit / Debit Card</AppText>
                        <AppText style={styles.methodSubtitle}>Pay Via any Credit or Debit Card</AppText>
                    </TouchableOpacity>
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
                    title="Pay ₹ 1079 Securely"
                    onPress={() => { }}
                    variant="primary"
                    style={styles.payButton}
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
    secureHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 16,
        marginBottom: 16,
    },
    secureHeaderText: {
        fontSize: 14,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    planCard: {
        width: '100%',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        padding: 16,
        gap: 12,
        backgroundColor: '#fff',
    },
    planTitle: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000',
        marginBottom: 4,
    },
    planSubtitle: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#666',
    },
    planDetail: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#666',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 4,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    priceLabel: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#666',
    },
    priceValue: {
        fontSize: 14,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    discountValue: {
        fontSize: 14,
        fontFamily: fonts.SemiBold,
        color: '#27AE60',
    },
    totalLabel: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    totalValue: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    methodSection: {
        marginTop: 24,
        gap: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000',
        marginBottom: 8,
    },
    methodCard: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        gap: 4,
        backgroundColor: '#fff',
    },
    selectedMethod: {
        borderColor: Colors.primary,
        backgroundColor: '#FFF5F2', 
    },
    methodTitle: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    methodSubtitle: {
        fontSize: 12,
        fontFamily: fonts.Regular,
        color: '#666',
    },
    promoSection: {
        marginTop: 24,
        gap: 12,
    },
    promoTitle: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    promoInputContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    promoInput: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontFamily: fonts.Regular,
        color: '#000',
        backgroundColor: '#FAFAFA',
    },
    applyButton: {
        height: 48,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    applyButtonText: {
        color: Colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 14,
    },
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        gap: 12,
    },
    secureFooter: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    secureFooterText: {
        fontSize: 12,
        fontFamily: fonts.Regular,
        color: '#666',
    },
    secureFooterSubText: {
        fontSize: 10,
        fontFamily: fonts.Regular,
        color: '#999',
    },
    payButton: {
        width: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 6,
        height: 54,
    }
});
