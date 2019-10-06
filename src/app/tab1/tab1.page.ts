import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  playing = false;
  recording = false;
  state = '';
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [{ filename: 'dummy' }];

  constructor(private media: Media, private file: File, private storage: Storage) {}

  startRecording() {
    this.fileName = 'recording' + new Date().getUTCDate().toString() + new Date().getHours().toString()
     + new Date().getMinutes().toString() + new Date().getSeconds().toString() + '.3gp';
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    this.audio = this.media.create(this.filePath);

    this.audio.startRecord();
    this.recording = true;
    this.state = 'Recording';
  }

  stopRecording() {
    if (this.recording) {
      this.audio.stopRecord();
      let data = { filename: this.fileName };
      this.audioList.push(data);
      localStorage.setItem('recordings', JSON.stringify(this.audioList));
      this.recording = false;
      this.state = '';
    }
  }

  getRecordings() {
    if (localStorage.getItem('recordings')) {
      this.audioList = JSON.parse(localStorage.getItem('recordings'));
      console.log(this.audioList);
    }
  }

  ionViewWillEnter() {
    this.getRecordings();
  }

  playAudio(file, id) {
      this.playing = true;
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
      this.audio.play();
      this.audio.setVolume(0.8);
  }

  stopAudio(file, id) {
    if (this.playing) {
      this.playing = false;
      this.audio.stop();
    }
  }

  renameFile(file, id, newname) {
    /*
    let folderPath = this.file.externalDataDirectory.replace(/file:\/\//g, '');
    let oldfilePath = folderPath + file;
    let tempaudio = this.media.create(oldfilePath);
    window.resolveLocalFileSystemURL(
      folderPath, (dir) => {
        dir.getFile( newname, {create: true}, (file) => {
          file.createWriter((fileWriter) => {
            fileWriter.write(tempaudio);
            fileWriter.onwrite = () => {
              console.log('renamed succesfully');
            };
          });
        });
      }
    );
    */
  }

}
