import "react-native-gesture-handler";
import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
import AppNavigator from "./Navigation/AppNavigator";
import { Provider } from "react-redux";
import store from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";


SplashScreen.preventAutoHideAsync();

// AsyncStorage.clear()


export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          roboto: require("./assets/fonts/Roboto-Light.ttf"),
          medium: require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
          play: require("./assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
          rale: require("./assets/fonts/Raleway-VariableFont_wght.ttf"),
          nanu: require("./assets/fonts/NanumMyeongjo-Bold.ttf"),
        });
      } catch (err) {
        console.log(err);
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayout} style={styles.container}>
      <StatusBar style="auto" />
      <Provider store={store}>
      <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: "play",
  },
});
