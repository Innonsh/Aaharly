import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../theme/Fonts';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    scrollContent: {
        paddingBottom: hp('4%'),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp('100%'), // 393px
        height: hp('5.2%'), // 44px
        marginTop: hp('1.6%'), // 56px
        paddingHorizontal: wp('6.1%'), // 24px
    },
    backButton: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerTitle: {
        fontSize: wp('5.5%'), // 18px
        fontFamily: fonts.SemiBold,
    },
    titleSection: {
        marginTop: hp('2.9%'), // Top 125px approx (56+44+25 = 125)
        marginLeft: wp('4.1%'), // Left 16px
        width: wp('91.9%'), // 361px
    },
    mainTitle: {
        fontSize: wp('5.3%'), // 22px
        marginBottom: hp('0.6%'),
        fontFamily: fonts.SemiBold,
    },
    subtitle: {
        color: '#666',
        fontSize: wp('3.6%'), // 14px
    },
    card: {
        backgroundColor: '#F8FAFC', // Profile Summary Color
        borderRadius: wp('5.1%'), // 20px
        padding: wp('5.1%'), // 20px
        marginTop: hp('2.6%'), // Top 73px
        width: wp('91.9%'), // 361px
        height: hp('36.4%'), // 302px
        alignSelf: 'center', // Center it since we use width
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    bodyCompCard: {
        backgroundColor: '#FFF7F3', // Body Composition Color
    },
    cardTitle: {
        fontSize: wp('4.4%'), // 16px
        fontFamily: fonts.SemiBold,
        marginBottom: hp('1.8%'), // 15px
    },
    profileGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileItem: {
        alignItems: 'center',
        width: '30%',
    },
    profileValue: {
        fontSize: wp('4.6%'), // 18px
        fontFamily: fonts.Bold,
    },
    iconPlaceholder: {
        marginVertical: hp('0.6%'),
    },
    profileLabel: {
        color: '#888',
        fontSize: wp('3%'), // 12px
    },
    bmiSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: hp('1.2%'),
    },
    bmiValueContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bmiMessageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    crushingItText: {
        fontSize: wp('3.6%'), // 14px
        fontFamily: fonts.Medium,
        color: '#555',
        marginTop: hp('0.6%'),
    },
    crushingItSubText: {
        fontSize: wp('2.5%'), // 10px
        color: '#888',
        textAlign: 'center',
    },
    needsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp('1.2%'),
    },
    needItem: {
        alignItems: 'center',
        width: '30%',
    },
    needValue: {
        fontSize: wp('4.1%'), // 16px
        fontFamily: fonts.SemiBold,
    },
    needLabel: {
        color: '#666',
        marginTop: hp('0.5%'),
    },
    mealPlanSection: {
        marginTop: hp('2.1%'), // Consistent with spacing
        width: wp('91.9%'),
        alignSelf: 'center',
    },
    sectionTitle: {
        fontSize: wp('4.6%'), // 18px
        fontFamily: fonts.SemiBold,
        marginBottom: hp('0.6%'),
    },
    sectionSubtitle: {
        fontSize: wp('3.3%'), // 13px
        color: '#666',
        marginBottom: hp('1.8%'),
    },
    largeMealCard: {
        backgroundColor: "transparent",
        borderRadius: wp('5.1%'), // 20px
        padding: 0,
        flexDirection: "column",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        alignItems: "center",
        width: wp('91.9%'), // 361px
        height: hp('40.2%'), // 317px
        alignSelf: "center",
        position: "relative",
    },
    largeMealImage: {
        width: wp('91.9%'),
        height: hp('40.2%'),
        borderRadius: wp('5.1%'), // 20px
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#fff",
    },
    largeMealDetails: {
        position: "absolute",
        bottom: 0,
        width: wp('91.9%'), // 361px
        backgroundColor: "#FFF",
        borderRadius: wp('4.6%'), // 18px
        borderWidth: 1,
        borderColor: "#F0F0F0",
        padding: wp('4.1%'), // 16px
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
        paddingHorizontal: wp('5.1%'), // 20px
        paddingVertical: hp('1.2%'), // 10px
        borderRadius: 25,
    },
    badgesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: wp('2%'), // 8px
        marginTop: hp('1.4%'), // 12px
    },
    badge: {
        backgroundColor: "#F8F8F8",
        paddingHorizontal: wp('3%'), // 12px
        paddingVertical: hp('0.7%'), // 6px
        borderRadius: 100,
    },
    badgeText: {
        fontSize: wp('3%'), // 12px
        color: "#333",
        fontWeight: "500",
    },
    viewAllButton: {
        width: wp('14.5%'), // 57px
        height: hp('2.2%'), // 19px
        marginTop: hp('2%'),
        alignSelf: 'flex-end', // Left 320px relative to container
        padding: 0, // Reset padding
        justifyContent: 'center',
        alignItems: 'center',
    },
});
