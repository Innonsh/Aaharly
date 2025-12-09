import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AppText from '../../components/AppText';
import Input from '../../components/TextInput';
import { Colors } from '../../theme/Colors';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import { NavigationRoutes } from '../../navigation/NavigationRoutes';

import { styles } from './addressStyle';

const CustomToggle = ({ value, onValueChange }: { value: boolean, onValueChange: (val: boolean) => void }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onValueChange(!value)}
            style={{
                width: wp('18.61%'), // approx 67
                height: hp('3.75%'), // approx 30
                borderRadius: 100,
                borderWidth: 2,
                borderColor: value ? Colors.primary : '#E6E6E6',
                backgroundColor: value ? Colors.primary : '#FFFFFF',
                justifyContent: 'center',
                paddingHorizontal: wp('0.5%'),
                alignItems: value ? 'flex-end' : 'flex-start',
            }}
        >
            <View
                style={{
                    width: wp('6.11%'), // approx 22
                    height: wp('6.11%'), // approx 22 (keep it round)
                    borderRadius: wp('3.055%'),
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
                            <BackArrow width={wp('4%')} height={wp('4%')} color="#000" />
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
                            <View style={{ width: wp('3%') }} />
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
