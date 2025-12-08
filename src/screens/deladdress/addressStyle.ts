import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../theme/Fonts';
import { Colors } from '../../theme/Colors';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: hp('5%'),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('8.125%'), // approx 65
        paddingHorizontal: wp('4.44%'), // 16px
        justifyContent: 'center', // Center title relative to screen usually better, or use space-between
        width: wp('100%'),
        height: hp('2.8%'),
        position: 'relative',
    },
    backButton: {
        padding: wp('1%'),
        position: 'absolute',
        left: wp('4.44%'),
        zIndex: 1,
    },
    headerTitle: {
        fontSize: wp('5%'), // 18px
        fontFamily: fonts.SemiBold,
        color: '#000',
        alignSelf: 'center',
    },
    formContainer: {
        marginTop: hp('3%'), // 24px
        paddingHorizontal: wp('6%'),
        width: wp('100%'), // 361px
        gap: hp('1.5%'), // 12px
        alignSelf: 'center',
    },
    inputGroup: {
        gap: hp('1%'), // 8px
    },
    label: {
        fontSize: wp('3.5%'), // 14px
        fontFamily: fonts.Medium,
        color: '#000',
        marginBottom: hp('0.5%'),
    },
    input: {
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipsContainer: {
        flexDirection: 'row',
        gap: wp('2%'),
        marginVertical: hp('0.5%'),
    },
    chip: {
        paddingHorizontal: wp('4%'), // 16px
        paddingVertical: hp('1%'), // 8px
        borderRadius: wp('2%'), // 8px
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipSelected: {
        backgroundColor: Colors.primary,
    },
    chipText: {
        fontFamily: fonts.Medium,
        fontSize: wp('3.6%'), // 14px
        color: '#000',
    },
    chipTextSelected: {
        color: '#fff',
    },
    defaultContainer: {
        marginTop: hp('1.4%'),
        gap: hp('1%'),
        justifyContent: 'center',
    },
    defaultLabel: {
        fontSize: wp('4%'), // 16px
        fontFamily: fonts.Medium,
        color: '#000',
    },
    saveButtonContainer: {
        marginTop: hp('11%'), // 187px
        paddingHorizontal: wp('4%'),
        alignItems: 'center',
    },
    saveButton: {
        width: wp('92%'), // 361px
        height: hp('6.6%'), // 56px
        backgroundColor: '#FF6B35',
        borderRadius: wp('3%'), // 12px
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        fontFamily: fonts.SemiBold,
        fontSize: wp('4%'), // 16px
        color: '#fff',
    },
});
