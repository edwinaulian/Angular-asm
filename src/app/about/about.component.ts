import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';



const inventory = [
    {name: 'dana', quantity: 2},
    {name: 'meja', quantity: 1},
    {name: 'kursi', quantity: 5}
    ];   
const result = inventory.find( fruit => fruit.name === 'meja' );


export class MyItems {    
    Value: string;    
    constructor(Value:string)    
    {    
      this.Value = Value; 
    }    
  }

  export class MyItems2 {    
    Value2: string;    
    constructor(Value:string)    
    {    
      this.Value2 = Value;    
    }    
  }

@Component({
    templateUrl: 'about.component.html',
  })

export class AboutComponent implements OnInit {
  users: User[] = [];     
  myItems: MyItems[] = new Array();   
  myItems2: MyItems2[] = new Array();   
  IsForUpdate: boolean = false;    
  newItem: any = {};    
  newItem2: any = {};
  updatedItem: any;    
 

    constructor(private userService: UserService) {

        this.myItems.push(    
            new MyItems("Mans"),    
            new MyItems("Ariel"),    
            new MyItems("Uki"),    
            new MyItems("Jon"),    
            new MyItems("David")    
          );    
    }

    ngOnInit() {
        console.log(result)
        console.log('han', inventory[1]);
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    AddItem() { 
        this.myItems.push(    
          this.newItem    
        );    
        this.newItem = {};   
        
        // this.myItems2.push(
        //     this.newItem2
        // );
        // this.newItem2 = {};
      }  

       // Edit item
        EditItem(i: any) {  
            this.newItem.Value = this.myItems[i].Value;  
            this.updatedItem = i;  
            this.IsForUpdate = true;  
        }  

        // Update Item 
        UpdateItem() {  
        let data = this.updatedItem;  
        for (let i = 0; i < this.myItems.length; i++) {  
        if (i == data) {  
            this.myItems[i].Value = this.newItem.Value;  
        }  
        }  
        this.IsForUpdate = false;  
        this.newItem = {};  
    }  

    // Delete tem
    DeleteItem(i: any) {  
        this.myItems.splice(i, 1);  
    } 
}