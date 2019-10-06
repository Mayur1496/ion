import { Component } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private bluetoothSerial: BluetoothSerial) {}
  bluetoothOn() {
    if (!this.bluetoothSerial.isEnabled()) {
      this.bluetoothSerial.enable();
    }
  }

  bluetoothOff() {
    if (this.bluetoothSerial.isEnabled()) {
      this.bluetoothSerial.disconnect();
    }
  }
}
