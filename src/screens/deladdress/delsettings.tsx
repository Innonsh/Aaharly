import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import { Colors } from '../../theme/Colors';
import { fonts } from '../../theme/Fonts';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import { NavigationRoutes } from '../../navigation/NavigationRoutes';
import DropdownIcon from '../../assets/delivery/dropdown.svg';

const { width } = Dimensions.get('window');

interface DeliveryCardProps {
    title: string;
    selectedAddress: string | null;
    onSelect: (address: string) => void;
    isOpen: boolean;
    toggleOpen: () => void;
    zIndex: number;
    onAddNewAddress: () => void;
}

const DeliveryCard = ({ title, selectedAddress, onSelect, isOpen, toggleOpen, zIndex, onAddNewAddress }: DeliveryCardProps) => {
    const addresses = ['Home', 'College', 'Office', '+ Add new address'];

    return (
        <View style={[styles.cardContainer, { zIndex }]}>
            <AppText style={styles.cardTitle}>{title}</AppText>
            <TouchableOpacity style={styles.selectButton} onPress={toggleOpen} activeOpacity={0.7}>
                <AppText style={styles.selectButtonText}>
                    {selectedAddress || 'Select Address'}
                </AppText>
                <View style={[styles.chevronContainer, isOpen && styles.chevronRotated]}>
                    <DropdownIcon width={10} height={10} color="#fff" />
                </View>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownList}>
                    {addresses.map((addr) => (
                        <TouchableOpacity
                            key={addr}
                            style={styles.dropdownOption}
                            onPress={() => {
                                if (addr === '+ Add new address') {
                                    onAddNewAddress();
                                } else {
                                    onSelect(addr);
                                }
                                toggleOpen();
                            }}
                        >
                            <AppText style={styles.optionText}>{addr}</AppText>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default function DeliverySettingsScreen() {
    const navigation = useNavigation();
    const [lunchAddress, setLunchAddress] = useState<string | null>(null);
    const [dinnerAddress, setDinnerAddress] = useState<string | null>(null);

    const [openDropdown, setOpenDropdown] = useState<'lunch' | 'dinner' | null>(null);

    const handleContinue = () => {
        console.log('Lunch:', lunchAddress, 'Dinner:', dinnerAddress);
        navigation.navigate(NavigationRoutes.DELIVERY_SETTINGS_2 as never);
    };

    const handleAddNewAddress = () => {
        navigation.navigate(NavigationRoutes.DELIVERY_ADDRESS as never);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <BackArrow width={16} height={16} color="#000" />
                </TouchableOpacity>
                <AppText style={styles.headerTitle}>Delivery Settings</AppText>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.introSection}>
                    <AppText style={styles.introTitle}>Set Your Weekly Delivery Routine</AppText>
                    <AppText style={styles.introSubtitle}>
                        Choose where we should deliver your meals each day. You can edit it anytime later.
                    </AppText>
                </View>

                <View style={styles.cardsWrapper}>
                    <DeliveryCard
                        title="Lunch Delivery"
                        selectedAddress={lunchAddress}
                        onSelect={setLunchAddress}
                        isOpen={openDropdown === 'lunch'}
                        toggleOpen={() => setOpenDropdown(openDropdown === 'lunch' ? null : 'lunch')}
                        zIndex={openDropdown === 'lunch' ? 20 : 10}
                        onAddNewAddress={handleAddNewAddress}
                    />

                    <DeliveryCard
                        title="Dinner Delivery"
                        selectedAddress={dinnerAddress}
                        onSelect={setDinnerAddress}
                        isOpen={openDropdown === 'dinner'}
                        toggleOpen={() => setOpenDropdown(openDropdown === 'dinner' ? null : 'dinner')}
                        zIndex={openDropdown === 'dinner' ? 20 : 5}
                        onAddNewAddress={handleAddNewAddress}
                    />
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    variant="primary"
                    style={styles.continueButton}
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
