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
    sectionContainer: {
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    sectionSubtitle: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#666',
        marginBottom: 16,
    },
    calendarContainer: {
        width: '100%',
        height: 140,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 16,
        gap: 16,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayHeaderCell: {
        flex: 1,
        alignItems: 'center',
    },
    dayText: {
        color: '#999',
        fontSize: 14,
        fontFamily: fonts.Regular,
    },
    calendarRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    dateCellWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    dateCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDateCircle: {
        backgroundColor: Colors.primary,
    },
    dateText: {
        fontSize: 16,
        color: '#666',
        fontFamily: fonts.Medium,
    },
    selectedDateText: {
        color: '#fff',
        fontFamily: fonts.SemiBold,
    },

    mealsWrapper: {
        marginTop: 24,
        gap: 20,
    },
    mealCard: {
        width: '100%',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 20,
    },
    mealHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    mealType: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    mealContentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mealInfo: {
        flex: 1,
        paddingRight: 10,
    },
    mealName: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#666',
        marginBottom: 4,
    },
    deliveryTime: {
        fontSize: 14,
        fontFamily: fonts.SemiBold,
        color: '#000',
        marginBottom: 16,
    },
    mealActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    skipButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    skipButtonText: {
        color: Colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 14,
    },
    changeAddressText: {
        color: Colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 14,
    },
    mealImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    savedAddressesContainer: {
        marginTop: 24,
        width: '100%',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 20,
    },
    addressesList: {
        gap: 16,
    },
    addressCard: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 16,
        position: 'relative',
    },
    addressType: {
        fontSize: 14,
        fontFamily: fonts.SemiBold,
        color: '#999',
        marginBottom: 8,
    },
    addressText: {
        fontSize: 14,
        fontFamily: fonts.Medium,
        color: '#000',
        lineHeight: 20,
        width: '70%',
    },
    deliverHereButton: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    deliverHereText: {
        color: Colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 12,
    },
    addNewAddressButton: {
        alignSelf: 'flex-end',
        marginTop: 8,
    },
    addNewAddressText: {
        color: Colors.primary,
        fontFamily: fonts.SemiBold,
        fontSize: 14,
    },

    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    paymentButton: {
        width: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 6,
        height: 56,
    }
});
