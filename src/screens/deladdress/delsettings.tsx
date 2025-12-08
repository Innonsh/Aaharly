import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/AppText';
import Button from '../../components/Button';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import { NavigationRoutes } from '../../navigation/NavigationRoutes';
import DropdownIcon from '../../assets/delivery/dropdown.svg';

import { styles } from './delSettingsStyle';
import { DeliveryCardProps } from '../../types/deladdress/delAddress';

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
