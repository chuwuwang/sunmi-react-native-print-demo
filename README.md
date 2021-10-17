# sunmi-rn-print-demo
SUNMI print demo for React Native.

## Quick Integration

```
import SunmiPrintModule from './SunmiPrintModule';

SunmiPrintModule.xxx
```

## API

### 1. initPrinter()
Initialize the sunmi printer.
- Parameter
    - None
- Return
    - Promise
        - resolve(): a string message field.
        - reject(): string code field and message field.

### 2. getPrinterStatus()
Get printer status.
- Parameter
    - None
- Return
    - Callback, return an Number type status field, status:
        - 1 - The printer works normally
        - 2 - The printer is preparing
        - 3 - Abnormal communication
        - 4 - Out of pape
        - 5 - Overheating
        - 6 - Open the lid
        - 7 - Cut abnormal
        - 8 - Cut recovery
        - 9 - No mark detected
        - 505 - Printer not detected
        - 507 - Printer firmware upgrade failed

### 3. reset()
Reset the printer logic program (for example: layout, bold and other style settings), but does not clear the data in the buffer area, so incomplete print jobs will continue after resetting.
- Parameter
    - None
- Return
    - Callback, return a Boolean type instruction operation result.

### 4. setBold()
Set the font bold, the default is false.
- Parameter
    - Bool, true: set fond bold, false: cancel font bold.
- Return
    - Callback, return a Bool type instruction operation result.

### 5. setFontSize()
Set font size.
- Parameter
    - Number, font size.
- Return
    - Callback, return a Bool type instruction operation result.

### 6. setAlignment()
Set alignment mode
- Parameter
    - Number, alignment mode.
        - 0 - left
        - 1 - center
        - 2 - right
- Return
    - Callback, return a Bool type instruction operation result.

### 7. printText()
Print text.
- Parameter
    - String, print data.
- Return
    - Callback, return a Bool type instruction operation result. The processing result returned by this Callback refers to the execution result of the command processing, not the processing result of printing out the paper.

### 8. printImage()
Print picture.
- Parameter
    - String, the base64 string of the picture.
- Return
    - Callback, return a Bool type instruction operation result. The processing result returned by this Callback refers to the execution result of the command processing, not the processing result of printing out the paper.

**Note: Because SUNMI's V series and P series use 58mm printers. If you want the printed image to be centered, please make an image with a width of 384px.**

### 9. printBarcode()
Print barcode.
- Parameter
    - String, barcode data.
    - Number, barcode type, value 0-8.
        - 0 - UPC-A
        - 1 - UPC-E
        - 2 - JAN13(EAN13)
        - 3 - JAN8(EAN8)
        - 4 - CODE39
        - 5 - ITF
        - 6 - CODABAR
        - 7 - CODE93
        - 8 - CODE128
    - Number, barcode height, value 1-255, default: 162.
    - Number, barcode width, value 2-6, default: 2.
    - Number, text position, value 0-3.
        - 0 - Do not print text
        - 1 - The text is on the barcode
        - 2 - The text is under the barcode
        - 3 - Barcodes are printed up and down
- Return
    - Callback, return a Bool type instruction operation result. The processing result returned by this Callback refers to the execution result of the command processing, not the processing result of printing out the paper.

### 10. printQRCode()
Print QRCode.
- Parameter
    - String, qrcode data.
    - Number, qrode block size, unit: point, value 4 to 16.
    - Number, qrcode error correction level.
        - 0 - Error correction level L
        - 1 - Error correction level M
        - 2 - Error correction level Q
        - 3 - Error correction level H
- Return
    - Callback, return a Bool type instruction operation result. The processing result returned by this Callback refers to the execution result of the command processing, not the processing result of printing out the paper.

### 11. printTable()
Print Table.
- Parameter
    - Array, an array of text strings for each column.
    - Array, array of column widths, calculated in English characters, each middle character occupies two English characters, and each width is greater than 0.
    - Array, alignment of each column: 0 on the left, 1 on the center, and 2 on the right.
- Return
    - Callback, return a Bool type instruction operation result. The processing result returned by this Callback refers to the execution result of the command processing, not the processing result of printing out the paper.

### 12. printLine()
Print blank lines.
- Parameter
    - Number, number of print lines.
- Return
    - Callback, return a Bool type instruction operation result. The processing result returned by this Callback refers to the execution result of the command processing, not the processing result of printing out the paper.

### 13. enterPrinterBuffer()
Start transaction print.

The transaction printing mode is suitable for the needs to control the printing content and get the printing result feedback (whether to print out a small ticket). This mode is equivalent to the establishment of a transaction queue buffer. When the developer enters the transaction printing mode, it will be opened. You can add a printing method to a transaction queue. At this time, the printer will not print the content immediately. After the transaction is submitted, the printer will execute the tasks in the queue one by one. After the execution is completed, you will get the result feedback of the transaction.
- Parameter
    - None
- Return
    - None

### 14. exitPrinterBuffer()
Exit and commit the transaction to print.
- Parameter
    - None
- Return
    - Promise
        - resolve(): string code field and message field. code 0 means print success, others means failure.
        - reject(): string code field and message field.

## Remark

This Demo is only suitable for SUNMI P series and V series products, not suitable for other products. If you have other requirements, please contact me.
Email: chuwuwang@126.com
