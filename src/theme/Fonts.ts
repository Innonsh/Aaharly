export const fonts = {
  Regular: 'Matter-Regular',
  Medium: 'Matter-Medium',
  Bold: 'Matter-Bold',
  SemiBold: 'Matter-SemiBold',
  Light: 'Matter-Light',
};

export const fontConfig = {
  default: {
    fontFamily: fonts.Regular,
    fontWeight: 'normal' as const,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: fonts.Regular,
    fontWeight: 'normal' as const,
    letterSpacing: 0,
  },
  labelLarge: {
    fontFamily: fonts.Regular,
    fontWeight: 'normal' as const,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontFamily: fonts.Regular,
    fontWeight: 'normal' as const,
    letterSpacing: 0,
  },
  regular: {
    fontFamily: fonts.Regular,
    fontWeight: 'normal' as const,
    letterSpacing: 0,
  },
  medium: {
    fontFamily: fonts.SemiBold,
    fontWeight: '500' as const,
    letterSpacing: 0,
  },
  bold: {
    fontFamily: fonts.Bold,
    fontWeight: 'bold' as const,
    letterSpacing: 0.2,
  },
  Light:{
    fontFamily: fonts.Light,
    fontWeight: '300' as const,
    letterSpacing: 0,
  }
};