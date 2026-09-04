import { ThemeProvider, DarkTheme, DefaultTheme, Stack, router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Text } from '../components/Themed';
import { useColorScheme, I18nManager, View, Image, TouchableOpacity } from 'react-native';
import Lang from '../src/lang/words.js';
import WordsContext from "../src/lang/wordsContext.js";
import direction from '../src/direction/direction.js';
import DirectionContext from '../src/direction/directionContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from "i18n-js";
import { EventRegister } from '../src/utils/eventBus';
import auth from "../firebase/config/firebase-config.js";
import { onAuthStateChanged } from 'firebase/auth';

const i18n = new I18n(Lang);

// Back arrow used in screen headers. useColorScheme must live in a real
// component — the old code called it inside header callbacks, which violates
// the rules of hooks and crashes under React 19.
function BackButton({ rotated }) {
  const scheme = useColorScheme();
  return (
    <TouchableOpacity
      style={{ alignItems: 'center' }}
      onPress={() => {
        router.replace("/Home");
        router.back();
      }}
    >
      <Image
        source={require('../src/assets/arrow-left.png')}
        tintColor={scheme === 'dark' ? 'white' : 'black'}
        style={{
          width: 23,
          height: 23,
          ...(rotated ? { transform: [{ rotate: '180deg' }] } : {}),
        }}
      />
    </TouchableOpacity>
  );
}

// Screens that show a localized title + custom back affordance.
// [routeName, i18n title key]
const TITLED_SCREENS = [
  ['Support', 'Support'],
  ['Confirm', 'Confirm'],
  ['Language', 'Language'],
  ['Login', 'LogIN'],
  ['Location', 'Location'],
  ['Search', 'search'],
];

const HIDDEN_SCREENS = [
  '(tabs)', 'index', 'Setting', 'Details', 'Profile',
  'LoadingScreen', 'Data', 'ChatUser', 'DetailsShow', 'OTP',
];

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [locale, setlocale] = useState('en');
  const [userInfo, setUserInfo] = useState();

  i18n.locale = locale;
  i18n.enableFallback = true;

  useEffect(() => {
    // onAuthStateChanged returns its own unsubscribe function
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      }
    });
  }, []);

  const getlang = useCallback(async () => {
    try {
      const item = await AsyncStorage.getItem('@lang');
      if (item != null) {
        i18n.locale = item;
        setlocale(item);
      }
    } catch (error) {
      console.warn(error);
    }
  }, []);

  useEffect(() => {
    const listenerId = EventRegister.addEventListener('Lang', () => {
      getlang();
    });
    getlang();
    return () => {
      EventRegister.removeEventListener(listenerId);
    };
  }, [getlang]);

  // The original layout mirrored the header back button based on the active
  // language + layout direction, rotating the arrow for Arabic.
  const isAr = i18n.t('lang') === 'ar';
  const backOnLeft = isAr === I18nManager.isRTL;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
      <WordsContext.Provider value={locale === 'en' ? Lang.en : Lang.ar} >
        <DirectionContext.Provider value={(locale === 'en') ? ((!(I18nManager.isRTL)) ? direction.en : direction.ar) : ((I18nManager.isRTL) ? direction.en : direction.ar)}>
          <Stack screenOptions={{}}>
            {HIDDEN_SCREENS.map((name) => (
              <Stack.Screen key={name} name={name} options={{ headerShown: false }} />
            ))}
            {TITLED_SCREENS.map(([name, titleKey]) => (
              <Stack.Screen
                key={name}
                name={name}
                options={{
                  headerLeft: backOnLeft
                    ? () => <BackButton rotated={isAr} />
                    : undefined,
                  headerRight: !backOnLeft
                    ? () => <BackButton rotated={isAr} />
                    : undefined,
                  headerTitle: () => (
                    <View style={{ width: "85%", marginLeft: 23 }}>
                      <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                        {i18n.t(titleKey)}
                      </Text>
                    </View>
                  ),
                  headerBackVisible: false,
                }}
              />
            ))}
          </Stack>
        </DirectionContext.Provider>
      </WordsContext.Provider>
    </ThemeProvider>
  );
}
