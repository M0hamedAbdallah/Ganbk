
import { Link, Tabs, router } from 'expo-router';
import { Pressable, useColorScheme, Image } from 'react-native';
import Colors from '../../constants/Colors';
import { useContext, useEffect, useState } from 'react';
import WordsContext from '../../src/lang/wordsContext'
import directionContext from '../../src/direction/directionContext';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Languages = useContext(WordsContext);
  const direction = useContext(directionContext);

  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    setAppIsReady(true);
  })

  if (!appIsReady) {
    return null;
  }
  if ((direction.lang == 'en')) {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 10 },
          tabBarStyle: { height: 60, paddingBottom: 10, position: "relative", bottom: 0 }
        }}>
        <Tabs.Screen
          name="Home"
          options={{
            title: Languages.home,
            tabBarIcon: ({ color }) => <Image source={require('../../src/assets/home.png')} tintColor={color} style={{ width: 25, height: 25 }} />,
            headerShown: false,

          }}
        />
        <Tabs.Screen
          name="MyAds"
          options={{
            title: Languages.MyAds,
            tabBarIcon: ({ color }) => <Image source={require('../../src/assets/speaker.png')} tintColor={color} style={{ width: 25, height: 25 }} />,
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="Sell"
          options={{
            title: Languages.sell,
            tabBarIcon: ({ color }) => {
              return (
                <Image source={require('../../src/assets/add.png')} tintColor={color} style={{ width: 25, height: 25 }} />
              )
            },
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="Chat"
          options={{
            title: Languages.chat,
            tabBarIcon: ({ color }) => <Image source={require('../../src/assets/chat.png')} tintColor={color} style={{ width: 25, height: 25 }} />,
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="Account"
          options={{
            title: Languages.Account,
            tabBarIcon: ({ color }) => <Image source={require('../../src/assets/account.png')} tintColor={color} style={{ width: 25, height: 25 }} />,
            headerShown: false
          }}
        />
      </Tabs>
    );
  } else {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 10 },
          tabBarStyle: { height: 60, paddingBottom: 10, position: "relative", bottom: 0 }
        }}>
        <Tabs.Screen
          name="Account"
          options={{
            title: Languages.Account,
            tabBarIcon: ({ color }) => <Image source={require('../../src/assets/account.png')} tintColor={color} style={{ width: 25, height: 25 }} />,
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="MyAds"
          options={{
            title: Languages.MyAds,
            tabBarIcon: ({ color }) => <Image source={require('../../src/assets/speaker.png')} tintColor={color} style={{ width: 25, height: 25 }} />,
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="Sell"
          options={{
            title: Languages.sell,
            tabBarIcon: ({ color }) => {
              return (
                <Image source={require('../../src/assets/add.png')} tintColor={color} style={{ width: 25, height: 25 }} />
              )
            },
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="Chat"
          options={{
            title: Languages.chat,
            tabBarIcon: ({ color }) => <Image source={require('../../src/assets/chat.png')} tintColor={color} style={{ width: 25, height: 25 }} />,
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="Home"
          options={{
            title: Languages.home,
            tabBarIcon: ({ color }) => <Image source={require('../../src/assets/home.png')} tintColor={color} style={{ width: 25, height: 25 }} />,
            headerShown: false
          }}
        />
      </Tabs>
    );
  }
}
