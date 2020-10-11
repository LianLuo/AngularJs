import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: [
  ]
})
export class ImageComponent implements OnInit {

  defaultImageUrl: string = environment.defaultImage;
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  });

  constructor(
    private service: ImageService
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.defaultImageUrl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.defaultImageUrl = environment.defaultImage;
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name.split('.')[0]}_${new Date().getTime()}`;
      this.service.uploadImage(filePath, this.selectedImage,(url)=>{
        formValue['imageUrl'] = url;
        this.service.insertImageDetails(formValue);
        this.resetForm();
      });
      
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
      category: 'Animal'
    });
    this.defaultImageUrl = environment.defaultImage;
    this.selectedImage = null;
    this.isSubmitted = false;
  }


}
