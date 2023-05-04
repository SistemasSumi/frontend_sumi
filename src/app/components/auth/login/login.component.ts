import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from '../seguridad.service';
import Swal from 'sweetalert2';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup; 

  iconoPassword:string = '';
  typePassword:string = '';

  verPassword:boolean = true;
  constructor(private router: Router,private formBuilder:FormBuilder, private auth: SeguridadService) { 

  }
  

  Login(){
    if(this.form.valid){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Iniciando..',
        text:'Espere por favor..'
      });
      Swal.showLoading();
      this.auth.login(this.form).subscribe(resp => {
        console.log(resp);
        Swal.close();
          if(this.form.value.recordarPassword){
            localStorage.setItem('Correo', this.form.value.Correo)
            localStorage.setItem('Password', this.form.value.Password)
          }
        
      },(ex) => {
        console.log(ex)
        console.log(ex.error)
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticacion.',
          html: `
          <div class="alert alert-danger" role="alert" style="text-align: justify;">
             ${ex.error.detail}
          </div>
          `,
          confirmButtonColor: '#4acf50',
          footer: '<a href="" style="color:#4acf50;">Recuperar cuenta?</a>'
        });
        
        console.log(ex.error.detail);
       
      });
    }
   
  }
  
  ObtenerErrorCampoEmail(){
    var campo = this.form.get('Correo');
    if (campo.hasError('required')) {
        return 'El Correo es requerido *';
    }else if (campo.hasError('email')) {
      return 'El Correo es invalido.';
    }else if (campo.hasError('emailMinusculas')){
      return campo.getError('emailMinusculas').mensaje;
    }
  }

  ObtenerErrorCampoPassword(){
    var campo = this.form.get('Password');

    if (campo.hasError('required')) {
      
      return 'La contraseña es requerida. ';
    }
    if (campo.hasError('minlength')) {
       return 'La contraseña debe ser de almenos 6 digitos. *';
    }
    return '';
  }
  
  ngOnInit(): void {
    if(this.auth.estaLogueado()){
      this.router.navigateByUrl('/home');
    }

    this.form = this.formBuilder.group({
      Correo: ['',{
        validators:[
          Validators.required,
       
        ]
      }],
      Password: ['',{
        validators:[
          Validators.required,
          Validators.minLength(4),
        ]
      }],
      recordarPassword:[true,{
        
      }]
   });
   this.changeInput();
   
  }


  changeInput(){
    this.verPassword = !this.verPassword
    if(this.verPassword){
      this.iconoPassword = 'fas fa-eye'
      this.typePassword = 'text'
    }else{
      this.iconoPassword = 'fas fa-eye-slash'
      this.typePassword = 'password'
    }
  }

  upper(){
    console.log("cambio")
   
  }
}
