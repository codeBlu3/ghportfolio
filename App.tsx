import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';


// Theming
import { Provider as PaperProvider } from "react-native-paper";
import {
  CombinedDarkThemeBp,
  CombinedDefaultThemeBp,
} from "./themes/themingConfig";
import { PreferencesContext } from "./themes/PreferencesContext";

import {styles} from './styles'


//
import {translations } from './i8n/translations'

const i18n = new I18n(translations);

i18n.locale = Localization.locale;
i18n.enableFallback = true;
// i18n.locale = 'ja'; //nippon

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  let theme = isThemeDark ? CombinedDarkThemeBp : CombinedDefaultThemeBp;
  //console.log(theme);

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );


  return (
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
    <View style={styles.container}>
      <Text >
        {i18n.t('welcome')} {i18n.t('name')}
      </Text>
      <Text>Current locale: {i18n.locale}</Text>
      <Text>Device locale: {Localization.locale}</Text>
    </View>
        </PaperProvider>
      </PreferencesContext.Provider>
  );
}

