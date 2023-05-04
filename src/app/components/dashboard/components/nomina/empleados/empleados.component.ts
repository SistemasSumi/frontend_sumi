import { AfterViewInit, Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProgressComponent } from '../../../../../../src/app/components/dashboard/util/progress/progress.component';
import { loadScript } from '../../../../../metodos/loadScript';
import { OverlayContainer } from '@angular/cdk/overlay';
import { EmpresaService } from '../empresas/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { SeguridadService } from '../../../../../../src/app/components/auth/seguridad.service';




@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosNominaComponent implements OnInit,AfterViewInit  {
 
  currentTab = 0; 
  textButtonGuardar ="";
  typeButtonGuardar ="";
  

  formEmpleados:FormGroup = this.formBuilder.group({
      
    nombres: ['',{
      validators:[
        Validators.required,
      ]
    }],   
    apellidos: ['',{
      validators:[
        Validators.required,
      ]
    }],
    correo: ['',{
      validators:[
        Validators.email,
      ]
    }],
    tipo_documento: ['',{
      validators:[
        Validators.required,
      ]
    }],
    documento: ['',{
      validators:[
        Validators.required,
      ]
    }],
  
    telefono: ['',{
      validators:[
        Validators.required,
      ]
    }],
    tipo_contrato: ['',{
      validators:[
        Validators.required,
      ]
    }],
    termino_contrato: ['',{
      validators:[
        Validators.required,
      ]
    }],
    fecha_contratacion: ['',{
      validators:[
        Validators.required,
      ]
    }],
    fecha_terminacion: ['',{
      validators:[
        Validators.required,
      ]
    }],
    subsidio_trasnporte: [true,{
      validators:[
        Validators.required,
      ]
    }],
    riesgo: ['',{
      validators:[
        Validators.required,
      ]
    }],
    salario_base: ['',{
      validators:[
        Validators.required,
      ]
    }],
    valor_salario: [0,{
      validators:[
        Validators.required,
      ]
    }],
    cargo: ['',{
      validators:[
        Validators.required,
      ]
    }],
    area: ['',{
      validators:[
        Validators.required,
      ]
    }],
    centro_costo: ['',{
      validators:[
        Validators.required,
      ]
    }],
    dias_vaciones: [0,{
      validators:[
        Validators.required,
      ]
    }],
    metodo_pago: ['',{
      validators:[
        Validators.required,
      ]
    }],
    banco: ['',{
    }],
    tipo_cuenta: ['',{
    }],
    numero_cuenta: ['',{
    }],
    cuenta_cobro: [0,{
    }],
    cuenta_contable: ['',{
    }],
    cuenta_contrapartida: ['',{
    }],





  

  });    




  // themeDark:boolean = true;

  tiposDocumentos:any;
  tiposContrato:any;
  terminosContrato:any;
  riegos:any;
  bancos:any;


// booleanos 
  termino:boolean = true;
  efectivo:boolean;

  

  constructor( private auth:SeguridadService,private formBuilder: FormBuilder,private  toastr: ToastrService,private empresa:EmpresaService) {
    this.empresa.getTiposDocumentos().subscribe((resp:any) => {
      this.tiposDocumentos = resp.tiposDocumentos;
      this.tiposContrato = resp.tiposContrato;
      this.terminosContrato = resp.terminoContrato;
      this.riegos = resp.riegosLaborales;
      this.bancos = resp.bancos;
    });
   }


  

   onChangeTermino(e:string){
      if(e == "Término indefinido"){
        console.log(e);
        this.formEmpleados.get('fecha_terminacion').disable();
        this.termino = false;
      }else{
        this.formEmpleados.get('fecha_terminacion').enable();
        this.termino = true;


      }
      
   }

   onChangeMetodoPago(e:string){
      if(e == "Efectivo"){
        console.log(e);
        this.efectivo = true;
      }else{
       
        this.efectivo = false;


      }
      
   }
    

  ngOnInit() {
    this.showTab(this.currentTab);
    // this.loadScript('../assets/libs/flatpickr/flatpickr.min.js'); 
    // this.loadScript('../assets/js/pages/project-create.init.js'); 
 
  }
 

  showTab(n) {
    // This function will display the specified tab of the form...
    var x:any =  document.getElementsByClassName("wizard-tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
      this.typeButtonGuardar = "submit";
      this.textButtonGuardar = "Guardar"
    } else {
      this.textButtonGuardar = "Guardar y continuar"
      this.typeButtonGuardar = "button";

    }
    //... and run a function that will display the correct step indicator:
    this.fixStepIndicator(n)
}


 nextPrev(n) {
  // This function will figure out which tab to display
  var x:any = document.getElementsByClassName("wizard-tab");

  // Hide the current tab:
  x[this.currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  this.currentTab = this.currentTab + n;
  // if you have reached the end of the form...
  if (this.currentTab >= x.length) {
    this.currentTab = this.currentTab - n;
      x[this.currentTab].style.display = "block";
  }
  // Otherwise, display the correct tab:
  this.showTab(this.currentTab)
}

fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step-wizard-item");
  for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" current-item", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " current-item";
}



  goNext(progress: ProgressComponent) {
    progress.next();
  }

  onStateChange(event) {
    console.log(event);
  }

  ngAfterViewInit() {}


  public loadScript(url: string) {
    const body = document.getElementById("cajascriptPage");
    const script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.defer = true;
    body.append(script);
  }
  

}
