import React from 'react';
import type {Node} from 'react';
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

        <Text/>

        <Text style={styles.clickText} onPress={reset}>Reset Printer Setting</Text>
        <Text style={styles.clickText} onPress={setBold}>Set Text Bold</Text>
        <Text style={styles.clickText} onPress={setFontSize}>Plus Text Font Size</Text>
        <Text style={styles.clickText} onPress={setAlignment}>Set Text Alignment Center</Text>
        
        <Text/>

        <Text style={styles.clickText} onPress={printLine}>Print Line</Text>
        <Text style={styles.clickText} onPress={printText}>Print Text</Text>
        <Text style={styles.clickText} onPress={printImage}>Print Image</Text>
        <Text style={styles.clickText} onPress={printTable}>Print Table</Text>
        <Text style={styles.clickText} onPress={printQRCode}>Print QRCode</Text>
        <Text style={styles.clickText} onPress={printBarcode}>Print Barcode</Text>
        <Text style={styles.clickText} onPress={printTransaction}>Transaction Print</Text>

        <Text/>

        <Text style={styles.clickText} onPress={printAirFoodSample}>Print AirFood Style Sample</Text>

        <Text/>
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
        ToastAndroid.show(message + " (" + code + ")", ToastAndroid.SHORT);
      }
    );
  }

  /**
   * Get printer status（获取打印机状态）
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
   * callback - Result callback.
   */
  function checkPrinterStatus() {
    SunmiPrintModule.getPrinterStatus(status => {
        ToastAndroid.show("printer status: " + status, ToastAndroid.SHORT);
      }
    );
  }

  /**
   * Reset the printer logic program (for example: layout, bold and other style settings), but does not clear the data in the buffer area, so incomplete print jobs will continue after resetting.
   * 重置打印机的逻辑程序（例如：排版, 加粗等样式设置）, 但不清空缓存区数据, 因此未完成的打印作业将在重置后继续。
   * callback - Result callback.
   */
  function reset() {
    SunmiPrintModule.reset(isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
  }

  /**
   * Set the font bold, the default is false（设置字体加粗，默认false）
   * callback - Result callback.
   */
  function setBold() {
    SunmiPrintModule.setBold(true, isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
  }

  /**
   * Set font size
   */
  function setFontSize() {
    SunmiPrintModule.setFontSize(30, isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
  }

  /**
   * Set alignment mode（设置对齐模式）
   * alignment - alignment mode（对⻬⽅式）
   *    0 - left（居左）
   *    1 - center（居中）
   *    2 - right（居右）
   */
  function setAlignment() {
    SunmiPrintModule.setAlignment(1, isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
  }

  /**
   * Print text
   * callback - The processing result returned by this Callback refers to the execution result of the command processing, not the processing result of printing out the paper.
   * 该Callback返回处理结果是指命令处理执⾏结果, ⽽不是打印出纸的处理结果。
   */
  function printText() {
    SunmiPrintModule.printText("Create native apps for Android and iOS using React, React Native combines the best parts of native development with React, " + 
      " a best-in-class JavaScript library for building user interfaces. Use a little—or a lot. You can use React Native today in your existing Android and " + 
      "iOS projects or you can create a whole new app from scratch.\n", isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
  }

  /**
   * Print image
   * data - the base64 string of the picture（图片的base64字符串）
   */
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

  /**
   * Print barcode
   * data - barcode data（⼀维码内容）
   * symbology - barcode type（条码类型 0-8）:
   *    0 - UPC-A
   *    1 - UPC-E
   *    2 - JAN13(EAN13)
   *    3 - JAN8(EAN8)
   *    4 - CODE39
   *    5 - ITF
   *    6 - CODABAR
   *    7 - CODE93
   *    8 - CODE128
   * height - barcode height, value 1-255, default: 162（条码⾼度, 取值 1 - 255, 默认：162）
   * width - barcode width, value 2-6, default: 2（条码宽度, 取值 2 - 6, 默认：2）
   * textPosition - Text position (⽂字位置 0-3):
   *    0 - Do not print text（不打印⽂字）
   *    1 - The text is on the barcode（⽂字在条码上⽅）
   *    2 - The text is under the barcode（⽂字在条码下⽅）
   *    3 - Barcodes are printed up and down（条码上下⽅均打印）
   */
  function printBarcode() {
    SunmiPrintModule.printBarcode("1234567890", 8, 162, 2, 2, isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
  }

  /**
   * Print QRCode
   * data - qrcode data（二维码数据）
   * moduleSize - qrode block size, unit: point, value 4 to 16（QR码块⼤⼩, 单位:点, 取值 4 ⾄ 16）
   * errorLevel - qrcode error correction level (⼆维码纠错等级 0-3)
   *      0 - Error correction level L (纠错级别 L 7%)
   *      1 - Error correction level M (纠错级别 M 15%)
   *      2 - Error correction level Q (纠错级别 Q 25%)
   *      3 - Error correction level H (纠错级别 H 30%)
   */
  function printQRCode() {
    SunmiPrintModule.printQRCode("SUNMI Tech.", 4, 3, isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
  }

  /**
   * Print table
   * colsTextArr - An array of text strings for each column.
   * colsWidthArr - Array of column widths, calculated in English characters, each middle character occupies two English characters, and each width is greater than 0.
   * colsAlign - Alignment of each column: 0 on the left, 1 on the center, and 2 on the right.
   * callback - Result callback.
   */
  function printTable() {
    var colsAlign = [0, 0, 2];
    var colsWidthArr = [2, 6, 3];
    SunmiPrintModule.setFontSize(18, null);
    var colsTextArr = ['x10', 'Pak Nasser’s Nasi Lemak (Combo) (RM3 Off Merdeka Special', 'MYR 17.00'];
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
  }

  function printLine() {
    SunmiPrintModule.printLine(4, isSuccess => {
        ToastAndroid.show("execution result: " + isSuccess, ToastAndroid.SHORT);
      }
    );
  }

  /**
   * Start transaction print（开始事务打印）
   */
  function enterPrinterBuffer() {
    SunmiPrintModule.enterPrinterBuffer();
  }

  /**
   * Exit and commit the transaction to print（退出并提交事务打印）
   */
  function exitPrinterBuffer() {
    SunmiPrintModule.exitPrinterBuffer()
    .then(
      function(map) {
        ToastAndroid.show(map.message + " (" + map.code + ")", ToastAndroid.SHORT);
      }
    )
    .catch(
      function(code, message) {
        ToastAndroid.show(message + " (" + code + ")", ToastAndroid.SHORT);
      }
    );
  }

  function printTransaction() {
    enterPrinterBuffer()
    SunmiPrintModule.printLine(2, null)
    SunmiPrintModule.printText("Create native apps for Android and iOS using React, React Native combines the best parts of native development with React, " + 
    " a best-in-class JavaScript library for building user interfaces. Use a little—or a lot. You can use React Native today in your existing Android and " + 
    "iOS projects or you can create a whole new app from scratch.\n", null)
    SunmiPrintModule.printLine(1, null)
    SunmiPrintModule.printQRCode("1234567890", 4, 3, null)
    SunmiPrintModule.printLine(1, null)
    SunmiPrintModule.printBarcode("1234567890", 8, 162, 2, 2, null)
    SunmiPrintModule.printLine(1, null)
    var colsAlign = [0, 0, 2];
    var colsWidthArr = [2, 6, 3];
    SunmiPrintModule.setFontSize(18, null);
    var colsTextArr = ['x10', 'Pak Nasser’s Nasi Lemak (Combo) (RM3 Off Merdeka Special', 'MYR 17.00'];
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)
    SunmiPrintModule.printLine(4, null)
    exitPrinterBuffer()
  }

  function printAirFoodSample() {
    SunmiPrintModule.reset(null);
    SunmiPrintModule.enterPrinterBuffer();
    
    var imageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAYAAAABICAIAAABwabWFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODEyRDI5OUMxMjc2MTFFNzhEQjdGREI0RjM5MzVENzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODEyRDI5OUQxMjc2MTFFNzhEQjdGREI0RjM5MzVENzQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MTJEMjk5QTEyNzYxMUU3OERCN0ZEQjRGMzkzNUQ3NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MTJEMjk5QjEyNzYxMUU3OERCN0ZEQjRGMzkzNUQ3NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt2rxCkAAB9MSURBVHja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";
    SunmiPrintModule.printImage(imageBase64, null);
    
    SunmiPrintModule.printLine(2, null);
    
    SunmiPrintModule.setBold(true, null);
    SunmiPrintModule.setAlignment(1, null);
    SunmiPrintModule.setFontSize(36, null);
    SunmiPrintModule.printText("10000211139\n", null);

    SunmiPrintModule.setBold(false, null);
    SunmiPrintModule.setFontSize(24, null);
    SunmiPrintModule.printText("Santan Nu Sentral\n", null);

    SunmiPrintModule.printText("2 items\n", null);

    SunmiPrintModule.printText("------------------------------\n", null);
    
    SunmiPrintModule.setBold(false, null);
    SunmiPrintModule.setAlignment(0, null);
    SunmiPrintModule.printText("Order receive: 28 Sep 2021 14:80\n", null);

    var colsAlign = [0, 0];
    var colsWidthArr = [1, 3];
    SunmiPrintModule.setFontSize(18, null);
    var colsTextArr = ["Driver:", "Muhammad Iqbal Rashid +60 1234 5678"];
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)
    var colsTextArr = ["Customer:", "John Doe +60 1234 5678"];
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)

    SunmiPrintModule.setFontSize(24, null);
    SunmiPrintModule.setAlignment(1, null);
    SunmiPrintModule.printText("------------------------------\n", null);

    var colsAlign = [0, 0, 2];
    var colsWidthArr = [2, 6, 3];
    SunmiPrintModule.setFontSize(18, null);
    var colsTextArr = ["x10", "Pak Nasser’s Nasi Lemak (Combo) (RM3 Off Merdeka Special", "MYR 17.00"];
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)

    SunmiPrintModule.setFontSize(24, null);
    SunmiPrintModule.setAlignment(1, null);
    SunmiPrintModule.printText("------------------------------\n", null);

    var colsAlign = [0, 2];
    var colsWidthArr = [1, 1];
    SunmiPrintModule.setFontSize(24, null);
    var colsTextArr = ["Subtotal", "MYR 34.00"];
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)
    
    var colsTextArr = ["Delivery Fee", "MYR 2.00"];
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)

    SunmiPrintModule.setBold(true, null);
    SunmiPrintModule.setFontSize(30, null);
    var colsTextArr = ["Total", "MYR 36.00"];
    SunmiPrintModule.printTable(colsTextArr, colsWidthArr, colsAlign, null)

    SunmiPrintModule.setBold(false, null);
    SunmiPrintModule.setFontSize(24, null);
    SunmiPrintModule.setAlignment(1, null);
    SunmiPrintModule.printText("------------------------------\n", null);

    SunmiPrintModule.printLine(4, null);
    SunmiPrintModule.exitPrinterBuffer()
    .then(
      function(map) {
        ToastAndroid.show(map.message + " (" + map.code + ")", ToastAndroid.SHORT);
      }
    )
    .catch(
      function(code, message) {
        ToastAndroid.show(message + " (" + code + ")", ToastAndroid.SHORT);
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
