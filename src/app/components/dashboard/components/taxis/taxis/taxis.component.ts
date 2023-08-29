import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../nomina/empresas/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { SeguridadService } from '../../../../auth/seguridad.service';
import { ProgressComponent } from '../../../../../../src/app/components/dashboard/util/progress/progress.component';
import { TaxisService } from './taxis.service';
import Swal from 'sweetalert2';
import { ConductorService } from '../conductores/conductor.service';

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent implements OnInit {
  currentTab = 0; 
  textButtonGuardar ="";
  typeButtonGuardar ="";
  editar:Boolean = false;
  editarTurnos:Boolean = false;
  taxisList:any[];
  ListConductores:any[];

  formTaxis = this.formBuilder.group({
    id: ['',{
      validators:[

      ]
    }],   
    placa: ['',{
      validators:[
        Validators.required,
      ]
    }],
    modelo: ['',{
      validators:[
        Validators.required,
      ]
    }],
    soat: ['',{
      validators:[
        Validators.required,
      ]
    }],
    tecno: ['',{
      validators:[
        Validators.required,
      ]
    }],
  });

  formTaxisKm = this.formBuilder.group({
    id: ['',{
      validators:[

      ]
    }],
    km: ['',{
      validators:[

      ]
    }],
    km_fin: ['',{
      validators:[

      ]
    }],
    
  });



  formTurnos = this.formBuilder.group({
    id: ['',{
      validators:[

      ]
    }],   
    taxi: ['',{
      validators:[
        Validators.required,
      ]
    }],
    turno: ['',{
      validators:[
        Validators.required,
      ]
    }],
    conductor: ['',{
      validators:[
        Validators.required,
      ]
    }],
    tarifa: ['',{
      validators:[
        Validators.required,
      ]
    }],
  });


  constructor(private conductor:ConductorService,private taxis:TaxisService,private auth:SeguridadService,private formBuilder: FormBuilder,private  toastr: ToastrService,private empresa:EmpresaService) { }

  ngOnInit() {
   this.cargar();
   this.conductor.getConductores().subscribe((resp:any) => {
      this.ListConductores = resp;
    });
  }


  nuevo(){
    this.resetFormTaxi();
  }

  guardarTaxiKm(){
    let km =  parseInt(this.formTaxisKm.value.km);
    let km_fin = km + 6000
    this.formTaxisKm.get('km_fin').setValue(km_fin);

    // console.log(this.formTaxisKm.value);
    
    this.taxis.saveTaxiKm(this.formTaxisKm).subscribe(resp => {
        // console.log(resp);
        this.toastr.success("Kilometraje Agregado","SarpTaxis");
        this.resetFormTaxisKm();
        this.cargar();
    })
  }

  updateTaxiKm(){
    this.taxis.saveTaxiKm(this.formTaxisKm).subscribe(resp => {
        // console.log(resp);
        this.toastr.success("Kilometraje Actualizado","SarpTaxis");
        this.resetFormTaxisKm();
        this.cargar();
    })
  }

  nuevoTurno(){
    this.resetFormTurno();
  }



  guardarTurno(){
    if(!this.editarTurnos){
      this.taxis.saveTurno(this.formTurnos).subscribe(resp => {
        // console.log(resp);
        this.cargar();
        this.resetFormTurno();
        Swal.fire({
          title: 'SUMIPROD-INTRANET',
          icon: 'success',
          text: "El turno se registro con exito!",
          
        })
      })
    }else{
      this.taxis.updateTurno(this.formTurnos).subscribe(resp => {
        // console.log(resp);
        this.cargar();
        this.resetFormTurno();
        Swal.fire({
          title: 'SUMIPROD-INTRANET',
          icon: 'success',
          text: "El turno se actualizo con exito!",
          
        })
      })
    }
  }


  
  crearTurnos(id_taxi:any){
    this.nuevoTurno();
    this.formTurnos.get('taxi').setValue(id_taxi);
    // console.log(id_taxi);
    
  }

  registrarKilometraje(id_taxi:any,km:any,km_fin:any){

    this.formTaxisKm.get('id').setValue(id_taxi);
    this.formTaxisKm.get('km').setValue(km);
    this.formTaxisKm.get('km_fin').setValue(km_fin);
    
  }
  

  editarTurno(turno:any){
    this.editarTurnos = true;
    // console.log(turno);
    
    this.formTurnos.get('id').setValue(turno.id_turno)
    this.formTurnos.get('turno').setValue(turno.turno)
    this.formTurnos.get('taxi').setValue(turno.taxi)
    this.formTurnos.get('tarifa').setValue(turno.tarifa)
    this.formTurnos.get('conductor').setValue(turno.conductor)
   
    
  }

  editarTaxi(taxi:any){
    this.editar = true;
    // console.log(taxi);
    
    this.formTaxis.get('id').setValue(taxi.taxi.id_taxi)
    this.formTaxis.get('placa').setValue(taxi.taxi.placa)
    this.formTaxis.get('modelo').setValue(taxi.taxi.modelo)
    this.formTaxis.get('soat').setValue(taxi.taxi.soat)
    this.formTaxis.get('tecno').setValue(taxi.taxi.tecno)
    
    
  }

  cargar(){
    this.taxis.getTaxis().subscribe((resp:any) => {
      // for(let x in resp){
      //   this.taxisList.push(x);
      // }
       this.taxisList = resp;
       // console.log(this.taxisList);
       
    })
  }
  guardar(){

    if(!this.editar){
      this.taxis.saveTaxi(this.formTaxis).subscribe(resp => {
        // console.log(resp);
        this.cargar();
        this.resetFormTaxi();
        Swal.fire({
          title: 'SUMIPROD-INTRANET',
          icon: 'success',
          text: "El taxi se registro con exito!",
          
        })
      })
    }else{
      this.taxis.updateTaxi(this.formTaxis).subscribe(resp => {
        // console.log(resp);
        this.cargar();
        this.resetFormTaxi();
        Swal.fire({
          title: 'SUMIPROD-INTRANET',
          icon: 'success',
          text: "El taxi se actualizo con exito!",
          
        })
      })
    }

  }

  resetFormTaxi(){
    this.editar = false;
   $("#formTaxis").trigger("reset");
  }
  resetFormTaxisKm(){
   $("#formTaxisKm").trigger("reset");
  }

  
  resetFormTurno(){
    this.editarTurnos = false;
   $("#formTurnos").trigger("reset");
  }

}
