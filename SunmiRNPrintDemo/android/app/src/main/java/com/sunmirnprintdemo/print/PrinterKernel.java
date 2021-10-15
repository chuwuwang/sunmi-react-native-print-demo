package com.sunmirnprintdemo.print;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.RemoteException;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
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
        if (callback != null) {
            callback.invoke(state);
        }
    }

    @ReactMethod
    public void printText(String text, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                printerService.printText(text, innerResultCallback);
            }
        } catch (Exception e) {
            e.printStackTrace();
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
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void printLine(int line, Callback callback) {
        try {
            printResultCallback = callback;
            if (printerService != null) {
                printerService.lineWrap(line, innerResultCallback);
            }
        } catch (Exception e) {
            e.printStackTrace();
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
            if (printResultCallback != null) {
                printResultCallback.invoke(code, msg);
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
