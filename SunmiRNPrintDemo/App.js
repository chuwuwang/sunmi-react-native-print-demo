import React from 'react';
import type {Node} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="#FF6900"
        transparent="True"
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.titleText}>SUNMI RN Print Demo</Text>

        <Text style={styles.clickText} onPress={() => Alert.alert('xxxx')}>
          Check Printer Status
        </Text>
        <Text style={styles.clickText} onPress={() => Alert.alert('xxxx')}>
          Print Text
        </Text>
        <Text style={styles.clickText} onPress={() => Alert.alert('xxxx')}>
          Print Image
        </Text>
        <Text style={styles.clickText} onPress={() => Alert.alert('xxxx')}>
          Print Barcode
        </Text>
        <Text style={styles.clickText} onPress={() => Alert.alert('xxxx')}>
          Print QRCode
        </Text>
        <Text style={styles.clickText} onPress={() => Alert.alert('xxxx')}>
          Print Lines
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    height: 48,
    fontSize: 16,
    paddingLeft: 16,
    color: 'white',
    backgroundColor: '#FF6900',
    textAlignVertical: 'center',
  },
  clickText: {
    height: 40,
    fontSize: 12,
    marginTop: 16,
    marginEnd: 16,
    marginStart: 16,
    borderRadius: 4,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#FF6900',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  transparent: {
    color: '#transparent',
  },
});

export default App;
