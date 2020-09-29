import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styles: [
  ]
})
export class UploadImageComponent implements OnInit {

  imageUrl:string = null;
  fileToUpload:File = null;

  constructor(
    private imageService:UploadImageService
  ) { }

  ngOnInit(): void {
    this.revertDefaultImage();
  }

  handleFileInput(file:FileList){
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  onClickForFile(file:File){
  }

  onSubmit(caption, image){
    this.imageService.postFile(caption.value, this.fileToUpload).subscribe(res=>{
      caption.value = null;
      image.value = null;
      this.revertDefaultImage();
    });
  }

  private revertDefaultImage(){
    this.imageUrl = "/assets/img/image-upload.png";
  }

}
