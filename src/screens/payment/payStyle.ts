import { StyleSheet } from 'react-native';
import { fonts } from '../../theme/Fonts';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
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
