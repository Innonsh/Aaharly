import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../theme/Fonts';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: hp('2.5%'),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('6%'),
        marginTop: hp('1.2%'),
        height: hp('6%'),
        backgroundColor: '#fff',
    },
    backButton: {
        padding: hp('0.8%'),
        backgroundColor: '#F7F7F7',
        borderRadius: wp('6%'),
    },
    headerTitle: {
        fontSize: wp('4.5%'),
        fontFamily: fonts.SemiBold,
    },
    titleSection: {
        marginTop: hp('2.5%'),
        paddingHorizontal: wp('4%'),
        gap: hp('0.8%'),
    },
    mainTitle: {
        fontSize: wp('5.5%'),
        fontFamily: fonts.SemiBold,
    },
    subtitle: {
        color: '#666',
        fontSize: wp('3.5%'),
    },
    calendarContainer: {
        marginTop: hp('2%'),
        marginHorizontal: wp('6%'),
        paddingVertical: hp('3%'),
        paddingHorizontal: wp('5%'),
        borderRadius: wp('5%'),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#fff',
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },
    dayHeaderCell: {
        flex: 1,
        alignItems: 'center',
    },
    dayText: {
        color: '#999',
        textAlign: 'center',
        fontSize: wp('3%'),
    },
    calendarGrid: {
        gap: hp('2%'),
    },
    calendarRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateCellWrapper: {
        flex: 1,
        height: hp('4.5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateCellStrip: {
        width: '100%',
        height: hp('4.5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    inRangeStrip: {
        backgroundColor: '#FFF0E6',
    },
    startStrip: {
        borderTopLeftRadius: hp('2.5%'),
        borderBottomLeftRadius: hp('2.5%'),
    },
    endStrip: {
        borderTopRightRadius: hp('2.5%'),
        borderBottomRightRadius: hp('2.5%'),
    },
    dateCircle: {
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: wp('4%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDateCircle: {
        borderWidth: 1,
        borderColor: '#FF5722',
    },
    dateText: {
        color: '#333',
        fontSize: wp('3.8%'),
    },
    inRangeText: {
        color: '#FF5722',
    },
    selectedDateText: {
        fontWeight: 'bold',
        color: '#FF5722',
    },
    mealDateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        marginTop: hp('3%'),
        marginBottom: hp('2%'),
    },
    mealDateTitle: {
        fontSize: wp('4.5%'),
        fontFamily: fonts.SemiBold,
    },
    arrowControls: {
        flexDirection: 'row',
        gap: wp('2.5%'),
    },
    arrowButton: {
        padding: hp('0.8%'),
        backgroundColor: '#F7F7F7',
        borderRadius: wp('6%'),
        width: wp('8.5%'),
        height: wp('8.5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mealsContainer: {
        marginHorizontal: wp('1.7%'),
        padding: wp('4%'),
        gap: hp('3%'),
        borderRadius: wp('4%'),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    mealCardContainer: {
        width: '100%',
    },
    mealTypeTitle: {
        fontSize: wp('4.5%'),
        fontFamily: fonts.SemiBold,
        marginBottom: hp('1.5%'),
        alignSelf: 'flex-start',
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    cardExpanded: {
        height: hp('55%'),
    },
    imageContainer: {
        width: '100%',
        height: hp('22%'),
        overflow: 'hidden',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardContent: {
        padding: wp('4%'),
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    mealTitle: {
        fontSize: wp('4.5%'),
        fontFamily: fonts.SemiBold,
    },
    mealSubtitle: {
        color: '#666',
        fontSize: wp('3.5%'),
        marginTop: hp('0.5%'),
    },
    editIcon: {
        padding: wp('1%'),
    },
    badgesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: wp('2%'),
        marginTop: hp('1.5%'),
    },
    badge: {
        backgroundColor: '#F8F8F8',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.7%'),
        borderRadius: 100,
    },
    badgeText: {
        fontSize: wp('3%'),
        color: '#333',
        fontWeight: '500',
    },
    swapSection: {
        marginTop: hp('2%'),
    },
    swapSummary: {
        fontSize: wp('3.5%'),
        color: '#333',
        marginBottom: hp('1%'),
    },
    hiddenContent: {
        overflow: 'hidden',
    },
    swapItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('3%'),
        marginTop: hp('1%'),
        padding: wp('3%'),
        backgroundColor: '#FAFAFA',
        borderRadius: wp('3%'),
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    rotiImageContainer: {
        width: wp('32%'),
        height: hp('10%'),
        borderRadius: wp('2%'),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    swapItemText: {
        fontSize: wp('3.5%'),
        color: '#333',
        flex: 1,
    },
    footerCard: {
        marginHorizontal: wp('1.7%'),
        marginTop: hp('4%'),
        padding: wp('4%'),
        backgroundColor: '#fff',
        borderRadius: wp('5%'),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    saveBadge: {
        backgroundColor: '#FFF0E6',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.5%'),
        borderRadius: wp('2%'),
    },
    footer: {
        padding: wp('0.5%'),
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    paymentButton: {
        width: '100%',
        backgroundColor: Colors.primary,
        borderRadius: wp('2%'),
        height: hp('7%'),
    },
});
