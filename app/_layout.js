import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text } from '../components/Themed';
import { useColorScheme, I18nManager, View, Image, TouchableOpacity } from 'react-native';
import Lang from '../src/lang/words.js';
import WordsContext from "../src/lang/wordsContext.js";
import direction from '../src/direction/direction.js';
import DirectionContext from '../src/direction/directionContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from "i18n-js";
import { EventRegister } from 'react-native-event-listeners';
import auth from "../firebase/config/firebase-config.js";
// import messaging from '@react-native-firebase/messaging';
import { onAuthStateChanged } from 'firebase/auth';

const i18n = new I18n(Lang);




export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [locale, setlocale] = useState('en');
  const [userInfo, setUserInfo] = useState();

  i18n.locale = locale;
  i18n.enableFallback = true;

  useEffect(() => {
    const check = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // alert(JSON.stringify(user));
        setUserInfo(user)
      } else {
        // alert('not sign in');
      }
    })
    return () => check();
  })

  useEffect(() => {
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       console.log(
    //         'Notification caused app to open from quit state:',
    //         remoteMessage.notification,
    //       );
    //     }
    //   });
    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log('here',
    //     remoteMessage.notification,)
    // })
  })

  const getlang = async () => {
    try {
      await AsyncStorage.getItem('@lang', (err, item) => {
        if (item != null || item != undefined) {
          i18n.locale = item;
          setlocale(item);
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    const listener = EventRegister.addEventListener('Lang', (data) => {
      getlang();
    })
    getlang();
    return () => {
      EventRegister.removeEventListener('Lang');
    }
  }, [locale])


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
      <WordsContext.Provider value={locale === 'en' ? Lang.en : Lang.ar} >
        <DirectionContext.Provider value={(locale === 'en') ? ((!(I18nManager.isRTL)) ? direction.en : direction.ar) : ((I18nManager.isRTL) ? direction.en : direction.ar)}>

          <Stack screenOptions={{}}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name="Support" options={{
              headerLeft: () => {
                if (i18n.t('lang') === 'en') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={(colorScheme == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23 }} />
                  </TouchableOpacity>
                }
              },
              headerRight: () => {
                if (i18n.t('lang') === 'ar') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={(colorScheme == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                  </TouchableOpacity>
                }
              },
              headerTitle: () => {
                return <View style={{ width: "85%", marginLeft: 23 }}>
                  <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                    {i18n.t('Support')}
                  </Text>
                </View>
              },
              headerBackVisible: (I18nManager.isRTL) ? true : false
            }} />
            <Stack.Screen name="Confirm" options={{
              headerLeft: () => {
                if (i18n.t('lang') === 'en') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={(colorScheme == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23 }} />
                  </TouchableOpacity>
                }
              },
              headerRight: () => {
                if (i18n.t('lang') === 'ar') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={(colorScheme == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                  </TouchableOpacity>
                }
              },
              headerTitle: () => {
                return <View style={{ width: "85%", marginLeft: 23 }}>
                  <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                    {i18n.t('Confirm')}
                  </Text>
                </View>
              },
              headerBackVisible: (I18nManager.isRTL) ? true : false
            }} />
            <Stack.Screen name="Setting" options={{
              headerShown: false
            }} />
            <Stack.Screen name="Language" options={{
              headerLeft: () => {
                if (i18n.t('lang') === 'en') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23 }} />
                  </TouchableOpacity>
                }
              },
              headerRight: () => {
                if (i18n.t('lang') === 'ar') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                  </TouchableOpacity>
                }
              },
              headerTitle: () => {
                return <View style={{ width: "85%", marginLeft: 23 }}>
                  <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                    {i18n.t('Language')}
                  </Text>
                </View>
              },
              headerBackVisible: (I18nManager.isRTL) ? true : false
            }} />
            <Stack.Screen name="Details" options={{ headerShown: false }} />
            <Stack.Screen name="Profile" options={{ headerShown: false }} />
            <Stack.Screen name="Login" options={{
              headerLeft: () => {
                if (i18n.t('lang') === 'en') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23 }} />
                  </TouchableOpacity>
                }
              },
              headerRight: () => {
                if (i18n.t('lang') === 'ar') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={useColorScheme() == 'dark' ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                  </TouchableOpacity>
                }
              },
              headerTitle: () => {
                return <View style={{ width: "85%", marginLeft: 23 }}>
                  <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                    {i18n.t('LogIN')}
                  </Text>
                </View>
              },
              headerBackVisible: (I18nManager.isRTL) ? true : false
            }} />
            <Stack.Screen name="LoadingScreen" options={{ headerShown: false }} />
            <Stack.Screen name="Location" options={{
              headerLeft: () => {
                if (i18n.t('lang') === 'en') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={(colorScheme == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23 }} />
                  </TouchableOpacity>
                }
              },
              headerRight: () => {
                if (i18n.t('lang') === 'ar') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={(colorScheme == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                  </TouchableOpacity>
                }
              },
              headerTitle: () => {
                return <View style={{ width: "85%", marginLeft: 23 }}>
                  <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                    {i18n.t('Location')}
                  </Text>
                </View>
              },
              headerBackVisible: (I18nManager.isRTL) ? true : false
            }} />
            <Stack.Screen name="Search" options={{
              headerLeft: () => {
                if (i18n.t('lang') === 'en') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={(colorScheme == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23 }} />
                  </TouchableOpacity>
                }
              },
              headerRight: () => {
                if (i18n.t('lang') === 'ar') {
                  return <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => router.back()}>
                    <Image source={require('../src/assets/arrow-left.png')} tintColor={(colorScheme == 'dark') ? 'white' : 'black'} style={{ width: 23, height: 23, transform: [{ rotate: '180deg' }] }} />
                  </TouchableOpacity>
                }
              },
              headerTitle: () => {
                return <View style={{ width: "85%", marginLeft: 23 }}>
                  <Text style={{ fontSize: 23, fontWeight: 'bold' }}>
                    {i18n.t('search')}
                  </Text>
                </View>
              },
              headerBackVisible: (I18nManager.isRTL) ? true : false
            }} />
            <Stack.Screen name="Data" options={{ headerShown: false }} />
            <Stack.Screen name="ChatUser" options={{ headerShown: false }} />
          </Stack>
        </DirectionContext.Provider>
      </WordsContext.Provider>
    </ThemeProvider>
  );
}


