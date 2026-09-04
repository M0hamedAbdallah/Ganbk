/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { 
  Text as DefaultText, 
  useColorScheme, 
  View as DefaultView, 
  ScrollView  as DefaultScrollView,
  Image as DefaultImage,
  TouchableOpacity as DefaultTouchableOpacity
} from 'react-native';

import Colors from '../constants/Colors';
import React from 'react';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & React.ComponentProps<typeof DefaultText>;
export type ViewProps = ThemeProps & React.ComponentProps<typeof DefaultView>;
export type ScrollViewProps = ThemeProps & React.ComponentProps<typeof DefaultScrollView>;
export type ImageProps = ThemeProps & React.ComponentProps<typeof DefaultImage>;
export type TouchableOpacityProps = ThemeProps & React.ComponentProps<typeof DefaultTouchableOpacity>;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme: 'light' | 'dark' = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const TouchableOpacity = React.forwardRef((props:TouchableOpacityProps,ref) =>{
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultTouchableOpacity   style={[{ backgroundColor }, style]} {...otherProps} />;
})

export function ImageEdit(props: ImageProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultImage tintColor={color} style={[style]} {...otherProps} />;
}