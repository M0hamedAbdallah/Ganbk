import { Tabs, router } from 'expo-router';
import { useColorScheme, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { useContext, useEffect, useState } from 'react';
import WordsContext from '../../src/lang/wordsContext'
import directionContext from '../../src/direction/directionContext';
import auth from '../../firebase/config/firebase-config';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

// Proper tabPress listeners: the old code passed a plain function as
// `listeners`, which React Navigation invoked during every render and thus
// could navigate away at render time. Now the auth gate runs on tab press.
const requireAuthListeners = () => ({
  tabPress: (e) => {
    if (!auth?.currentUser) {
      e.preventDefault();
      router.push("/Login");
    }
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Languages = useContext(WordsContext);
  const direction = useContext(directionContext);

  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    setAppIsReady(true);
  }, []);

  if (!appIsReady) {
    return null;
  }

  const tabBarOptions = (
    title,
    icon
  ) => ({
    title,
    tabBarIcon: ({ color }) => (
      <Image source={icon} tintColor={color} style={{ width: 25, height: 25 }} />
    ),
    headerShown: false,
  });

  const screenOptions = {
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    tabBarLabelStyle: { fontWeight: "bold", fontSize: 10 },
    tabBarStyle: { height: 60, paddingBottom: 10, position: "relative", bottom: 0 },
  };

  if ((direction.lang == 'en')) {
    return (
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen
          name="Home"
          options={tabBarOptions(Languages.home, require('../../src/assets/home.png'))}
        />
        <Tabs.Screen
          name="MyAds"
          options={tabBarOptions(Languages.MyAds, require('../../src/assets/speaker.png'))}
          listeners={requireAuthListeners}
        />
        <Tabs.Screen
          name="Sell"
          options={tabBarOptions(Languages.sell, require('../../src/assets/add.png'))}
        />
        <Tabs.Screen
          name="Chat"
          options={tabBarOptions(Languages.chat, require('../../src/assets/chat.png'))}
          listeners={requireAuthListeners}
        />
        <Tabs.Screen
          name="Account"
          options={tabBarOptions(Languages.Account, require('../../src/assets/account.png'))}
        />
      </Tabs>
    );
  } else {
    return (
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen
          name="Account"
          options={tabBarOptions(Languages.Account, require('../../src/assets/account.png'))}
        />
        <Tabs.Screen
          name="MyAds"
          options={tabBarOptions(Languages.MyAds, require('../../src/assets/speaker.png'))}
          listeners={requireAuthListeners}
        />
        <Tabs.Screen
          name="Sell"
          options={tabBarOptions(Languages.sell, require('../../src/assets/add.png'))}
        />
        <Tabs.Screen
          name="Chat"
          options={tabBarOptions(Languages.chat, require('../../src/assets/chat.png'))}
          listeners={requireAuthListeners}
        />
        <Tabs.Screen
          name="Home"
          options={tabBarOptions(Languages.home, require('../../src/assets/home.png'))}
        />
      </Tabs>
    );
  }
}
