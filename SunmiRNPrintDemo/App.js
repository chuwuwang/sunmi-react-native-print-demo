import React from 'react';
import type { Node } from 'react';
import {
  Alert,
  Image,
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

import RNFS from 'react-native-fs';
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
    SunmiPrintModule.initPrinter()
    .then(
      function(data) {
        ToastAndroid.show("init printer success", ToastAndroid.SHORT);
      }
    )
    .catch(
      function(code, message) {
        ToastAndroid.show(message + "(" + code + ")", ToastAndroid.SHORT);
      }
    );
  }

  /**
   * 1 - The printer works normally（打印机⼯作正常）
   * 2 - The printer is preparing（打印机准备中）
   * 3 - Abnormal communication（通讯异常）
   * 4 - Out of paper（缺纸）
   * 5 - Overheating（过热）
   * 6 - Open the lid（开盖）
   * 7 - Cut abnormal（切⼑异常）
   * 8 - Cut recovery（切⼑恢复）
   * 9 - No mark detected（未检测到⿊标）
   * 505 - Printer not detected（未检测到打印机）
   * 507 - Printer firmware upgrade failed（打印机固件升级失败）
   */
  function checkPrinterStatus() {
    SunmiPrintModule.getPrinterStatus(status => {
        ToastAndroid.show("printer status: " + status, ToastAndroid.SHORT);
      }
    );
  }

  /**
   * The processing result returned by this Callback refers to the execution result of the command processing, not the processing result of printing out the paper.
   * 该Callback返回处理结果是指命令处理执⾏结果，⽽不是打印出纸的处理结果。
   */
  function printText() {
    SunmiPrintModule.printText("Create native apps for Android and iOS using React, React Native combines the best parts of native development with React, " + 
      " a best-in-class JavaScript library for building user interfaces. Use a little—or a lot. You can use React Native today in your existing Android and " + 
      "iOS projects or you can create a whole new app from scratch.\n", isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
  }

  function printImage() {
    RNFS.readFileAssets("logo.png", "base64")
      .then(content => {
          console.log("printImage: " + content)
          SunmiPrintModule.printImage(content, isSuccess => {
              ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
            }
          );
        }
      )
      .catch(error => {
        alert(error)
      }
    );
  }

  function printBarcode() {
    Alert.alert('printBarcode');
  }

  function printQRCode() {
    Alert.alert('printQRCode');
  }

  function printLine() {
    SunmiPrintModule.printLine(4, isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
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
