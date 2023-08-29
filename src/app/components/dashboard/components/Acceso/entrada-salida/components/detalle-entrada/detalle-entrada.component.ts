import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-detalle-entrada',
  templateUrl: './detalle-entrada.component.html',
  styleUrls: ['./detalle-entrada.component.css']
})
export class DetalleEntradaComponent implements OnInit {
  isChecked:boolean = false;
  formVehiculo:FormGroup;
  nombreCorto:String;
  
  persona:any;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const person = JSON.parse(localStorage.getItem('personaEntrando'))
    if(person){
        this.persona = person;
        // console.log(this.persona);
        let name = this.persona.empleado.nombre.split(' ');
        let surname = this.persona.empleado.apellido.split(' ');
        this.nombreCorto = name[0] + " " + surname[0];

    } else{
      this.router.navigateByUrl('acceso/entrada/');
    } 
    this.formVehiculo = this.formBuilder.group({
      placa_vehiculo: ['',{
        validators:[
          Validators.required,
        ]
      }],
      carga_entrada: ['',{
        validators:[
        ]
      }],
      carga_salida: ['',{
        validators:[
        ]
      }],
      n_pomas: ['',{
        validators:[
        ]
      }],
      cantidad_pales: ['',{
        validators:[
        ]
      }],
      cajas_sueltas: ['',{
        validators:[
        ]
      }],
    });
  }

}
