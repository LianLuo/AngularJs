import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(
    private http:HttpClient
  ) { }

  postFile(caption:string, fileToUpload:File){
    const endpoint = "http://localhost:5000/api/uploadimage";
    const formData : FormData = new FormData();
    formData.append("Image", fileToUpload, fileToUpload.name);
    formData.append("ImageCaption", caption);
    return this.http.post(endpoint, formData);
  }
}
