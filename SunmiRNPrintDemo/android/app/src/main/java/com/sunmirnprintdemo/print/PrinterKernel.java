package com.sunmirnprintdemo.print;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.sunmi.peripheral.printer.InnerPrinterCallback;
import com.sunmi.peripheral.printer.InnerPrinterManager;
import com.sunmi.peripheral.printer.SunmiPrinterService;

public class PrinterKernel extends ReactContextBaseJavaModule {

    private static final String TAG = "PrinterKernel";

    private static ReactApplicationContext reactContext;
    private static final PrinterKernel instance = new PrinterKernel();

    public SunmiPrinterService printerService;

    private Promise initPrinterPromise;

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
            InnerPrinterManager.getInstance().bindService(reactContext, printerCallback);
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

    private final InnerPrinterCallback printerCallback = new InnerPrinterCallback() {

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
