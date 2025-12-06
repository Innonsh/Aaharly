import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../components/AppText';
import Input from '../../components/TextInput';
import { Colors } from '../../theme/Colors';
import { fonts } from '../../theme/Fonts';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import { NavigationRoutes } from '../../navigation/NavigationRoutes';
import Button from '../../components/Button';

const { width } = Dimensions.get('window');

const CustomToggle = ({ value, onValueChange }: { value: boolean, onValueChange: (val: boolean) => void }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onValueChange(!value)}
            style={{
                width: 67,
                height: 30,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: value ? Colors.primary : '#E6E6E6',
                backgroundColor: value ? Colors.primary : '#FFFFFF',
                justifyContent: 'center',
                paddingHorizontal: 2,
                alignItems: value ? 'flex-end' : 'flex-start',
            }}
        >
            <View
                style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: value ? '#FFFFFF' : '#E6E6E6',
                }}
            />
        </TouchableOpacity>
    );
};

export default function AddressScreen() {
    const navigation = useNavigation();
    const [fullAddress, setFullAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [deliveryNote, setDeliveryNote] = useState('');
    const [addressType, setAddressType] = useState('Home');
    const [isDefault, setIsDefault] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <BackArrow width={16} height={16} color="#000" />
                        </TouchableOpacity>
                        <AppText style={styles.headerTitle}>Add Address</AppText>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <AppText style={styles.label}>Full Address</AppText>
                            <Input
                                value={fullAddress}
                                onChangeText={setFullAddress}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <AppText style={styles.label}>Landmark</AppText>
                            <Input
                                value={landmark}
                                onChangeText={setLandmark}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={{ flex: 1 }}>
                                <AppText style={styles.label}>Pincode</AppText>
                                <Input
                                    value={pincode}
                                    onChangeText={setPincode}
                                    style={styles.input}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{ width: 12 }} />
                            <View style={{ flex: 1 }}>
                                <AppText style={styles.label}>City</AppText>
                                <Input
                                    value={city}
                                    onChangeText={setCity}
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        {/* Address Type Chips */}
                        <View style={styles.chipsContainer}>
                            {['Home', 'Office', 'College', 'Other'].map((type) => (
                                <TouchableOpacity
                                    key={type}
                                    style={[
                                        styles.chip,
                                        addressType === type && styles.chipSelected,
                                    ]}
                                    onPress={() => setAddressType(type)}
                                >
                                    <AppText
                                        style={[
                                            styles.chipText,
                                            addressType === type && styles.chipTextSelected,
                                        ]}
                                    >
                                        {type}
                                    </AppText>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.inputGroup}>
                            <AppText style={styles.label}>
                                Delivery Note <AppText style={{ color: '#999' }}>(Optional)</AppText>
                            </AppText>
                            <Input
                                value={deliveryNote}
                                onChangeText={setDeliveryNote}
                                style={styles.input}
                            />
                        </View>

                        {/* Default Toggle */}
                        <View style={styles.defaultContainer}>
                            <AppText style={styles.defaultLabel}>Set as Default Address</AppText>
                            <CustomToggle value={isDefault} onValueChange={setIsDefault} />
                        </View>
                    </View>

                    {/* Save Button */}
                    <View style={styles.saveButtonContainer}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => navigation.navigate(NavigationRoutes.DELIVERY_SETTINGS as never)}
                        >
                            <AppText style={styles.saveButtonText}>Save Address</AppText>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 65, 
        paddingHorizontal: 16,
        gap: 130, 
        width: 393,
        height: 24,
    },
    backButton: {
        padding: 4,
        marginLeft: -4,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
        color: '#000',
    },
    formContainer: {
        marginTop: 24, 
        paddingHorizontal: 16,
        width: 361, 
        gap: 12, 
        alignSelf: 'center', 
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontFamily: fonts.Medium,
        color: '#000',
        marginBottom: 4,
    },
    input: {
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipsContainer: {
        flexDirection: 'row',
        gap: 8,
        marginVertical: 4,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8, 
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipSelected: {
        backgroundColor: Colors.primary,    
    },
    chipText: {
        fontFamily: fonts.Medium,
        fontSize: 14,
        color: '#000',
    },
    chipTextSelected: {
        color: '#fff',
    },
    defaultContainer: {
        marginTop: 12,
        width: 145,
        height: 64,
        gap: 8,
        justifyContent: 'center',
    },
    defaultLabel: {
        fontSize: 16,
        fontFamily: fonts.Medium,
        color: '#000',
    },
    saveButtonContainer: {
        marginTop: 187, 
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    saveButton: {
        width: 361,
        height: 56,
        backgroundColor: '#FF6B35',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        fontFamily: fonts.SemiBold,
        fontSize: 16,
        color: '#fff',
    },
});
