import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { BaseToastProps } from 'react-native-toast-message';
import Svg, { Path, Circle } from 'react-native-svg';

// Icons using SVG for crisp rendering
const SuccessIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="12" fill="#4ADE80" />
        <Path d="M16 9L10.5 14.5L8 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const InfoIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="12" fill="#3B82F6" />
        <Path d="M16 9L10.5 14.5L8 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const WarningIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M12 2L2 22H22L12 2Z" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinejoin="round" />
        <Path d="M12 8V16" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 18H12.01" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const ErrorIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M12 2L2 22H22L12 2Z" fill="#EF4444" stroke="#EF4444" strokeWidth="2" strokeLinejoin="round" />
        <Path d="M12 8V16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 18H12.01" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

type IconType = 'success' | 'info' | 'warning' | 'error';

const getIcon = (type: IconType) => {
    switch (type) {
        case 'success': return <SuccessIcon />;
        case 'info': return <InfoIcon />;
        case 'warning': return <WarningIcon />;
        case 'error': return <ErrorIcon />;
        default: return <SuccessIcon />;
    }
};

const CustomToast = ({ text1, type }: BaseToastProps & { type: IconType }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {getIcon(type)}
            </View>
            <AppText style={styles.text}>{text1}</AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333', // Dark background
        borderRadius: 15, // Pill shape
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
        minWidth: 200,
        maxWidth: '90%',
    },
    iconContainer: {
        marginRight: 12,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});

export const toastConfig = {
    success: (props: BaseToastProps) => <CustomToast {...props} type="success" />,
    info: (props: BaseToastProps) => <CustomToast {...props} type="info" />,
    warning: (props: BaseToastProps) => <CustomToast {...props} type="warning" />,
    error: (props: BaseToastProps) => <CustomToast {...props} type="error" />,
};

export default CustomToast;
