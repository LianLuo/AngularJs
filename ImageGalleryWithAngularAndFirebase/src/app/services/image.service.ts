import { Injectable } from '@angular/core';
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageDetailList: AngularFireList<any>;

  constructor(
    private storage: AngularFireStorage,
    private firebase: AngularFireDatabase
  ) { }

  uploadImage(filePath: string, image: any, callback: Function) {
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, image).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          callback(url);
        });
      })
    ).subscribe();
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
    return this.imageDetailList.snapshotChanges();
  }
}
