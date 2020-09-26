import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  fetchItemAsync():Observable<Item[]>{
    return of([]);
  }
}
