import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AccesoFincaService } from '../../acceso-finca.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app'
import  {auth} from 'firebase';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit, AfterViewInit{
  // formCedula:FormGroup;
  // formCode:FormGroup;
  // persona:[];
  // phone:string;
  // verificationCode:string;
  // smsEnviado:boolean;

  // recaptchaVerifier:auth.RecaptchaVerifier;
  // confirmationResult:auth.ConfirmationResult;
  
  constructor(public acceso:AccesoFincaService,private formBuilder: FormBuilder, public router:Router) { }

  ngOnInit(): void {
    // firebase.initializeApp(environment.firebaseConfig);
    
    // this.formCedula = this.formBuilder.group({
    //   cedula: ['',{
    //     validators:[
    //       Validators.required,
    //     ]
    //   }],
    // });
    
    // this.formCode = this.formBuilder.group({
    //   code: ['',{
    //     validators:[
    //       Validators.required,
    //     ]
    //   }],
    // });
  }

 


  getPerson(form:FormGroup){
    // this.acceso.getPerson(form.value.cedula).subscribe((resp:any) =>{
    //   this.persona = resp; 
    //   // console.log(resp);
    //   this.phone = "+57"+resp.empleado.telefonos;
    //   // console.log(this.phone);
    //   this.sendSmsCode();
      
    // })
    
  }

  ngAfterViewInit() {
      // this.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
      //   'size': 'invisible',
      //   'callback': function(response) {
      //     // reCAPTCHA solved, allow signInWithPhoneNumber.
      //     // console.log(response);
      //   }
      // });
      // this.recaptchaVerifier.render();
  }

  sendSmsCode(){
    // const appVerification = this.recaptchaVerifier;
    // const phoneNumber     = this.phone;

    // this.acceso.sendSmsVerification(phoneNumber, appVerification).then(result => {
    //   this.confirmationResult = result;
    //   this.smsEnviado = true;
    // }).catch(error => // console.log(error));

  }

  verificarSmsCode(formCode:FormGroup){
    // this.verificationCode = formCode.value.code;
    // this.confirmationResult.confirm(this.verificationCode).then(result => {
    //   this.router.navigateByUrl('acceso/detalle-entrada');
      
    // }).catch(error => // console.log('el codigo no es valido'));
  }

}


