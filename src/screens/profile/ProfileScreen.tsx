import React, { useContext } from 'react';
import { View, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch } from '../../store/hooks';
import { appLogout } from '../../store';
import { useProfile } from '../../hooks/useAccount';
import { LocalizationContext } from '../../contexts/LocalizationContext';
import { AuthContext } from '../../contexts/AuthContext';
import { NavigationRoutes } from '../../navigation/NavigationRoutes';
import AppText from '../../components/AppText';
import { styles } from './ProfileStyle';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../theme/Colors';
import Toast from 'react-native-toast-message';
import BackArrow from '../../assets/Icons/back_arrow.svg';
import { setUserProfile } from '../../store/reducer/userSlice';

const PencilIcon = () => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={Colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </Svg>
);
const HeartIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Svg>
);
const CalendarIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
        <Path d="M16 2v4" />
        <Path d="M8 2v4" />
        <Path d="M3 10h18" />
    </Svg>
);
const NavigationIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M3 11l19-9-9 19-2-8-8-2z" />
    </Svg>
);
const SupportIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </Svg>
);

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const dispatch = useAppDispatch();
    const { translations } = useContext(LocalizationContext);
    const { user: authUser } = useContext(AuthContext);
    const strings = translations as any;
    const { data: profileResponse, isLoading } = useProfile();
    const userData = profileResponse?.data || {};
    const name = userData.basic?.name || authUser?.displayName || 'User';
    const email = authUser?.email || userData.email || null;
    const phone = authUser?.phoneNumber || userData.phone || '+91-XXXXXXXXXX';
    const initial = name.charAt(0).toUpperCase();

    const menuItems = [
        { title: strings.profile.healthOverview, icon: <HeartIcon />, onPress: () => navigation.navigate(NavigationRoutes.NUTRITIONAL_OVERVIEW) },
        { title: strings.profile.yourPlans, icon: <CalendarIcon />, onPress: () => { } },
        { title: strings.profile.deliveryPreferences, icon: <NavigationIcon />, onPress: () => { } },
        { title: strings.profile.support, icon: <SupportIcon />, onPress: () => { } },
    ];
    const handleLogout = () => {
        Alert.alert(
            strings.profile.logout,
            strings.profile.logoutConfirm,
            [
                { text: strings.common.cancel, style: 'cancel' },
                {
                    text: strings.profile.logout,
                    style: 'destructive',
                    onPress: async () => {
                        await dispatch(appLogout() as any);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: NavigationRoutes.SPLASH }],
                        });
                    }
                }
            ]
        );
    };


    React.useEffect(() => {
        if (route.params?.showUpdateSuccess) {
            Toast.show({
                type: 'success',
                text1: strings.profile.updateSuccess || 'Profile updated successfully',
            });
            navigation.setParams({ showUpdateSuccess: undefined });
        }
    }, [route.params?.showUpdateSuccess]);

    // Ensure Redux is in sync with server data
    React.useEffect(() => {
        if (profileResponse?.data) {
            dispatch(setUserProfile(profileResponse.data));
        }
    }, [profileResponse?.data, dispatch]);

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.canGoBack() && navigation.goBack()}
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <BackArrow width={16} height={16} />
                </TouchableOpacity>
                <AppText variant="title" style={styles.headerTitle}>{strings.profile.subtitle}</AppText>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <AppText style={styles.avatarText}>{initial}</AppText>
                    </View>

                    <AppText variant="title1" style={styles.userName}>{name}</AppText>
                    {email ? (
                        <AppText variant="body" style={styles.userEmail}>{email}</AppText>
                    ) : (
                        <AppText variant="body" style={styles.userPhone}>{phone}</AppText>
                    )}

                    <TouchableOpacity
                        style={styles.editBtn}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate(NavigationRoutes.PROFILE_SETUP1, { isEdit: true })}
                    >
                        <AppText style={styles.editBtnText}>{strings.profile.editProfile}</AppText>
                        <PencilIcon />
                    </TouchableOpacity>
                </View>

                <View style={styles.menuSection}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.menuItem,
                                index !== menuItems.length - 1 && styles.menuItemBorder
                            ]}
                            activeOpacity={0.7}
                            onPress={item.onPress}
                        >
                            <View style={styles.iconContainer}>
                                {item.icon}
                            </View>
                            <AppText variant="body" style={styles.menuText}>{item.title}</AppText>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.logoutBtn}
                    activeOpacity={0.7}
                    onPress={handleLogout}
                >
                    <AppText variant="button" style={styles.logoutText}>{strings.profile.logout}</AppText>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
