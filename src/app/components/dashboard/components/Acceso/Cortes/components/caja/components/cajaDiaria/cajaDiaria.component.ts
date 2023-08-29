import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CajaServiceService } from '../../cajaService.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cajaDiaria',
  templateUrl: './cajaDiaria.component.html',
  styleUrls: ['./cajaDiaria.component.css']
})
export class CajaDiariaComponent implements OnInit {
  public dataBarber:any= [];
  public dataCaja:any= [];
  constructor(private home:CajaServiceService,private cp:CurrencyPipe,public formBuilder:FormBuilder) { 
    this.home.getReporte().subscribe((resp:any) => {
      this.dataBarber = [];
      
      // console.log()
      for (let x in resp.data){
 
        
        let data = resp["data"]
        // console.log(data)
        
          
          // // console.log(this.cp.transform(parseInt(data[j].totalBarbero)));
          data[x].totalBarbero = this.cp.transform(parseInt(data[x].totalBarbero));
          
          
           // console.log(data[x]);
          
          // data[j].totalBarbero = this.cp.transform(parseInt(data[j].totalBarbero));
          this.dataBarber.push(data[x]);

          // console.log(this.dataBarber);
        
        
        
      }

      // console.log(this.dataBarber);
      
      
       
      
    })

    this.home.getReporteCaja().subscribe((resp:any) => {
      this.dataCaja = resp;
      // console.log(resp);
      
    })
    

  }

  ngOnInit() {
   
    

  }

}
