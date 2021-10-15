import React from 'react';
import type {Node} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  ToastAndroid
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import SunmiPrintModule from './SunmiPrintModule';

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
        <Text style={styles.clickText} onPress={initPrinter}>Init Printer</Text>
        <Text style={styles.clickText} onPress={checkPrinterStatus}>Check Printer Status</Text>
        <Text style={styles.clickText} onPress={printText}>Print Text</Text>
        <Text style={styles.clickText} onPress={printImage}>Print Image</Text>
        <Text style={styles.clickText} onPress={printBarcode}>Print Barcode</Text>
        <Text style={styles.clickText} onPress={printQRCode}>Print QRCode</Text>
        <Text style={styles.clickText} onPress={printLine}>Print Line</Text>
      </ScrollView>
    </SafeAreaView>
  );

  function initPrinter() {
    SunmiPrintModule.initPrinter().then(
      function(data) {
        ToastAndroid.show("init printer success", ToastAndroid.SHORT);
      }
    ).catch(
      function(code, message) {
        ToastAndroid.show(message + "($code)", ToastAndroid.SHORT);
      }
    );
  }

  function checkPrinterStatus() {
    SunmiPrintModule.getPrinterStatus( (status) => {
        ToastAndroid.show("printer status: " + status, ToastAndroid.SHORT);
      }
    );
  }

  function printText() {
    Alert.alert('printText');
  }

  function printImage() {
    Alert.alert('printImage');
  }

  function printBarcode() {
    Alert.alert('printBarcode');
  }

  function printQRCode() {
    Alert.alert('printQRCode');
  }

  function printLine() {
    Alert.alert('printLine');
  }

};

const styles = StyleSheet.create(
  {
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
  }
);

export default App;
