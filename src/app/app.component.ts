import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'property-app';

  desc:any
  name:any
  size:any
  Key=environment.KEY;
  Base=environment.BASE;
  Table=environment.TABLE

  descAir:any;
  nameAir:any
  sizeAir:any
  records:any=[];
  
  propertyArr:any=[]

  airTableData:any=[]

  ngOnInit(): void {
    fetch(`https://api.airtable.com/v0/${this.Base}/${this.Table}`,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.Key}`,
      },
    })
  .then((response) => response.json())
  .then((data) =>{
    this.airTableData=data.records;
  });
  }
  addProp(){
    let obj={
      desc:this.desc,
      name:this.name,
      size:this.size
    }

    this.propertyArr.push(obj);

  }

  deleteRow(index:any){
    console.log("popop",index);
    this.propertyArr.splice(index)
  }

  deleteRowAir(id:any){
    
    fetch(`https://api.airtable.com/v0/${this.Base}/${this.Table}/${id}`,{
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.Key}`,
      },
    }).then((response) => response.json())
    .then((data) =>{
      this.ngOnInit();
    });
  }

  addPropAir(){

    fetch(`https://api.airtable.com/v0/${this.Base}/${this.Table}`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.Key}`,
      },
      body: JSON.stringify({
        records:[
          {
            "fields":{
              desc:this.descAir,
              name:this.nameAir,
              size:this.sizeAir
            }
          }
        ]
      })
    }).then((response) => response.json())
    .then((data) =>{
      this.ngOnInit();
    });

  }
}
