import React, { useEffect } from 'react';
import { View, StyleProp, ViewStyle, DimensionValue } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withRepeat,
    withTiming,
    Easing,
    interpolate,
} from 'react-native-reanimated';

interface ShimmerPlaceholderProps {
    width?: DimensionValue | number;
    height?: DimensionValue | number;
    style?: StyleProp<ViewStyle>;
    borderRadius?: number;
}

const AnimatedStop = Animated.createAnimatedComponent(Stop);

const ShimmerPlaceholder: React.FC<ShimmerPlaceholderProps> = ({
    width = '100%',
    height = 20,
    style,
    borderRadius = 4,
}) => {
    const sv = useSharedValue(0);

    useEffect(() => {
        sv.value = withRepeat(
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            -1
        );
    }, []);

    const animatedProps1 = useAnimatedProps(() => {
        return { offset: interpolate(sv.value, [0, 1], [-0.3, 1.3]) };
    });
    const animatedProps2 = useAnimatedProps(() => {
        return { offset: interpolate(sv.value, [0, 1], [0, 1.6]) };
    });
    const animatedProps3 = useAnimatedProps(() => {
        return { offset: interpolate(sv.value, [0, 1], [0.3, 1.9]) };
    });

    return (
        <View
            style={[
                {
                    width: width as DimensionValue, // Type assertion for compatibility if strict
                    height: height as DimensionValue,
                    borderRadius,
                    overflow: 'hidden',
                    backgroundColor: '#F0F0F0',
                },
                style,
            ]}
        >
            <Svg height="100%" width="100%" preserveAspectRatio="none">
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                        <AnimatedStop
                            offset="0"
                            stopColor="#F0F0F0"
                            stopOpacity="1"
                            animatedProps={animatedProps1}
                        />
                        <AnimatedStop
                            offset="0.5"
                            stopColor="#FFFFFF"
                            stopOpacity="0.7"
                            animatedProps={animatedProps2}
                        />
                        <AnimatedStop
                            offset="1"
                            stopColor="#F0F0F0"
                            stopOpacity="1"
                            animatedProps={animatedProps3}
                        />
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
            </Svg>
        </View>
    );
};

export default ShimmerPlaceholder;
