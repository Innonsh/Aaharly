import React from 'react';
import { View, StyleProp, ViewStyle, DimensionValue } from 'react-native';
import { Shimmer } from 'react-native-fast-shimmer';

interface ShimmerPlaceholderProps {
    width?: DimensionValue | number;
    height?: DimensionValue | number;
    style?: StyleProp<ViewStyle>;
    borderRadius?: number;
}

const ShimmerPlaceholder: React.FC<ShimmerPlaceholderProps> = ({
    width = '100%',
    height = 20,
    style,
    borderRadius = 4,
}) => {
    return (
        <View
            style={[
                {
                    width: width as DimensionValue,
                    height: height as DimensionValue,
                    borderRadius,
                    overflow: 'hidden',
                },
                style,
            ]}
        >
            <Shimmer style={{ flex: 1 }} />
        </View>
    );
};

export default ShimmerPlaceholder;
