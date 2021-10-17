package com.sunmirnprintdemo.print;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.RemoteException;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.sunmi.peripheral.printer.InnerPrinterCallback;
import com.sunmi.peripheral.printer.InnerPrinterManager;
import com.sunmi.peripheral.printer.InnerResultCallback;
import com.sunmi.peripheral.printer.SunmiPrinterService;

public class PrinterKernel extends ReactContextBaseJavaModule {

    private static final String TAG = "PrinterKernel";

    private static ReactApplicationContext reactContext;
    private static final PrinterKernel instance = new PrinterKernel();

    public SunmiPrinterService printerService;

    private Promise initPrinterPromise;
    private Promise printResultPromise;
    private Callback printResultCallback;

    @NonNull
    @Override
    public String getName() {
        return "SunmiPrintModule";
    }

    private PrinterKernel() {

    }

    public static PrinterKernel getInstance(ReactApplicationContext context) {
        reactContext = context;
        return instance;
    }

    @ReactMethod
    public void initPrinter(Promise promise) {
        try {
            initPrinterPromise = promise;
            InnerPrinterManager.getInstance().bindService(reactContext, innerPrinterCallback);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void getPrinterStatus(Callback callback) {
        int state = -1;
        try {
            if (printerService != null) {
                state = printerService.updatePrinterState();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        returnCallback(callback, state);
    }

    @ReactMethod
    public void printText(String text, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                printerService.printText(text, innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void printImage(String data, Callback callback) {
        try {
            byte[] bytes = Base64.decode(data, Base64.DEFAULT);
            Bitmap bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
            printResultCallback = callback;
            if (printerService != null) {
                printerService.printBitmap(bitmap, innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void printBarcode(String data, int symbology, int height, int width, int textPosition, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                printerService.printBarCode(data, symbology, height, width, textPosition, innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void printQRCode(String data, int moduleSize, int errorLevel, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                printerService.printQRCode(data, moduleSize, errorLevel, innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void printTable(ReadableArray colsTextArr, ReadableArray colsWidthArr, ReadableArray colsAlignArr, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                int textSize = colsTextArr.size();
                String[] colsTextArray = new String[textSize];
                for (int i = 0; i < textSize; i++) {
                    colsTextArray[i] = colsTextArr.getString(i);
                }
                int widthSize = colsWidthArr.size();
                int[] colsWidthArray = new int[widthSize];
                for (int i = 0; i < widthSize; i++) {
                    colsWidthArray[i] = colsWidthArr.getInt(i);
                }
                int alignSize = colsAlignArr.size();
                int[] colsAlignArray = new int[alignSize];
                for (int i = 0; i < alignSize; i++) {
                    colsAlignArray[i] = colsAlignArr.getInt(i);
                }
                printerService.printColumnsString(colsTextArray, colsWidthArray, colsAlignArray, innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void printLine(int line, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                printerService.lineWrap(line, innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void reset(Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                printerService.printerInit(innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void setBold(boolean bold, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                byte[] returnText = new byte[3];
                returnText[0] = 0x1B;
                returnText[1] = 0x45;
                if (bold) {
                    returnText[2] = 0x01;
                } else {
                    returnText[2] = 0x00;
                }
                printerService.sendRAWData(returnText, innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void setHeight(int height, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                byte[] returnText = new byte[3];
                returnText[0] = 0x1B;
                returnText[1] = 0x33;
                returnText[2] = (byte) height;
                printerService.sendRAWData(returnText, innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void setFontSize(int size, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                printerService.setFontSize(size, innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void setAlignment(int alignment, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                printerService.setAlignment(alignment, innerResultCallback);
            } else {
                returnCallback(callback, false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            returnCallback(callback, false);
        }
    }

    @ReactMethod
    public void enterPrinterBuffer() {
        try {
            if (printerService != null) {
                printerService.enterPrinterBuffer(true);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void exitPrinterBuffer(Promise promise) {
        try {
            printResultPromise = promise;
            if (printerService != null) {
                if (promise != null) {
                    printerService.exitPrinterBufferWithCallback(true, innerResultCallback);
                } else {
                    printerService.exitPrinterBuffer(true);
                }
            } else {
                if (promise != null) {
                    promise.reject("-1", "Print failure");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            if (promise != null) {
                promise.reject("-1", "Print failure");
            }
        }
    }

    private void returnCallback(Callback callback, Object... args) {
        if (callback != null) {
            callback.invoke(args);
        }
    }

    private final InnerResultCallback innerResultCallback = new InnerResultCallback() {

        @Override
        public void onRunResult(boolean isSuccess) throws RemoteException {
            Log.e(TAG, "onRunResult isSuccess: " + isSuccess);
            if (printResultCallback != null) {
                printResultCallback.invoke(isSuccess);
            }
        }

        @Override
        public void onReturnString(String msg) throws RemoteException {
            Log.e(TAG, "onReturnString msg: " + msg);
        }

        @Override
        public void onRaiseException(int code, String msg) throws RemoteException {
            Log.e(TAG, "onRaiseException code: " + code + " msg: " + msg);
        }

        @Override
        public void onPrintResult(int code, String msg) throws RemoteException {
            Log.e(TAG, "onPrintResult code: " + code + " msg: " + msg);
            if (printResultPromise != null) {
                WritableMap map = Arguments.createMap();
                map.putString("code", code + "");
                map.putString("message", msg);
                printResultPromise.resolve(map);
            }
        }

    };

    private final InnerPrinterCallback innerPrinterCallback = new InnerPrinterCallback() {

        @Override
        protected void onConnected(SunmiPrinterService sunmiPrinterService) {
            Log.e(TAG, "onConnected");
            printerService = sunmiPrinterService;
            if (initPrinterPromise != null) {
                initPrinterPromise.resolve("Init printer success");
            }
        }

        @Override
        protected void onDisconnected() {
            Log.e(TAG, "onDisconnected");
            printerService = null;
            if (initPrinterPromise != null) {
                initPrinterPromise.reject("-1", "Init printer Failure");
            }
        }

    };

}
