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
        paddingBottom: hp('2.8%'),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        paddingTop: hp('2%'),
        paddingBottom: hp('1.5%'),
        gap: wp('4%'),
        backgroundColor: '#fff',
    },
    backButton: {
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('5%'),
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
    headerTitle: {
        fontSize: wp('4.6%'),
        fontFamily: fonts.SemiBold,
        color: '#000',
        flex: 1,
        textAlign: 'center',
        marginRight: wp('10%'), // balancing the back button width
    },
    formContainer: {
        marginTop: hp('3%'),
        paddingHorizontal: wp('4%'),
        width: '100%',
        gap: hp('2%'),
        alignSelf: 'center',
    },
    inputGroup: {
        gap: hp('1%'),
    },
    label: {
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
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
        borderRadius: wp('2%'),
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipSelected: {
        backgroundColor: Colors.primary,
    },
    chipText: {
        fontFamily: fonts.Medium,
        fontSize: wp('3.6%'),
        color: '#000',
    },
    chipTextSelected: {
        color: '#fff',
    },
    defaultContainer: {
        marginTop: hp('1.5%'),
        gap: hp('1%'),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    defaultLabel: {
    },
    saveButtonContainer: {
        padding: wp('5%'),
        paddingBottom: wp('5%'), // Ensure bottom padding matches prompt request for "neat" stickiness
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    saveButton: {
        width: '100%',
        height: hp('6.6%'), // Matches plan.tsx button height
        backgroundColor: '#FF6B35',
        borderRadius: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        fontFamily: fonts.SemiBold,
        fontSize: wp('4%'),
        color: '#fff',
    },
});
