import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styles: [
  ]
})
export class ImageListComponent implements OnInit {

  imageList:any[];
  rowIndexArray:any[];
  uploadPlaceholderImage:string = environment.uploadPlaceholder;

  constructor(
    private service:ImageService
  ) { }

  ngOnInit(): void {
    this.service.getImageDetailList().subscribe(res=>{
      this.imageList = res.map(item=>{ return item.payload.val()});
      this.rowIndexArray = Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
    });
  }

}
