import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  private Items:Item[] = [
    {
      ItemID:1,
      Name:'Chicken Tenders',
      Price:3.5
    },
    {
      ItemID:2,
      Name:'Chicken Tenders w/ Fries',
      Price:4.59
    },
    {
      ItemID:3,
      Name:'Chicken Tenders w/ Onion',
      Price:5.95
    },
    {
      ItemID:4,
      Name:'Grilled Cheese Sandwich',
      Price:2.5
    },
    {
      ItemID:5,
      Name:'Grilled Cheese Sandwich w/Fries',
      Price:3.99
    },
    {
      ItemID:6,
      Name:'Grilled Cheese Sandwich w/Onion',
      Price:4.99
    },
    {
      ItemID:7,
      Name:'Lettuce and Tomato Burger',
      Price:1.99
    },
    {
      ItemID:8,
      Name:'Soup',
      Price:2.5
    },
    {
      ItemID:9,
      Name:'Onion Rings',
      Price:2.99
    },
    {
      ItemID:10,
      Name:'Fries',
      Price:1.99
    },
    {
      ItemID:11,
      Name:'Sweet Potato Fries',
      Price:2.49
    },
    {
      ItemID:12,
      Name:'Sweet Potato Fries',
      Price:1.79
    },
    {
      ItemID:13,
      Name:'Botttle Water',
      Price:1.00
    },
    {
      ItemID:14,
      Name:'Canned Drinks',
      Price:1.00
    }
  ];

  fetchItemAsync():Observable<Item[]>{
    return of(this.Items);
  }
}
