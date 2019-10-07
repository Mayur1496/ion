import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private bluetoothSerial: BluetoothSerial, private bluetoothle: BluetoothLE) {}
  bluetoothOn() {
      this.bluetoothSerial.enable();
      // this.bluetoothle.enable();
  }

  bluetoothOff() {
    // this.bluetoothle.disable();
    this.bluetoothSerial.showBluetoothSettings();
  }
}
