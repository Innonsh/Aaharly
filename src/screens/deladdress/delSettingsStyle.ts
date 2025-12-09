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
    },
    introSection: {
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 24,
    },
    introTitle: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000',
        marginBottom: 8,
    },
    introSubtitle: {
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: '#666',
        lineHeight: 20,
    },
    cardsWrapper: {
        paddingHorizontal: 16,
        gap: 16,
    },
    cardContainer: {
        width: 360,
        minHeight: 114,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        paddingTop: 22,
        paddingBottom: 22,
        paddingHorizontal: 16,
        gap: 10,
        backgroundColor: '#fff',
        alignSelf: 'center',
        position: 'relative',
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    selectButton: {
        width: 328,
        height: 41,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    selectButtonText: {
        fontSize: 14,
        fontFamily: fonts.Medium,
        color: '#000',
    },
    chevronContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chevronRotated: {
        transform: [{ rotate: '180deg' }],
    },

    dropdownList: {
        marginTop: 6,
        width: 328,
        backgroundColor: '#fff',
        borderRadius: 12,
        gap: 6,
    },
    dropdownOption: {
        width: 304,
        height: 45,
        borderRadius: 8,
        backgroundColor: '#F9F9F9',
        paddingVertical: 14,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    optionText: {
        fontSize: 14,
        fontFamily: fonts.Medium,
        color: '#000',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    continueButton: {
        width: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 12,
    }
});
