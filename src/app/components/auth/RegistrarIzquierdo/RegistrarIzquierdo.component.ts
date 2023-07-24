import { Component, OnInit } from '@angular/core';
import {  ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user.model';
import { TablasBasicasService } from '../../dashboard/components/tablas-basicas/tablas-basicas.service';
import { DbService } from '../db.service';
import { cobrosPermisos, contabilidadPermisos, empleadosPermisos, facturacionPermisos, inventarioPermisos, pagosPermisos, PermisosUsuario } from '../permisosUsuario';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-RegistrarIzquierdo',
  templateUrl: './RegistrarIzquierdo.component.html',
  styleUrls: ['./RegistrarIzquierdo.component.css']
})
export class RegistrarIzquierdoComponent implements OnInit {


  username:string;
  email:string;
  password:string;


  usuario:string;
  usuarios:any;

  permisos:PermisosUsuario;

  contabilidad: contabilidadPermisos;
  facturacion : facturacionPermisos;
  inventario  : inventarioPermisos;
  cobros      : cobrosPermisos;
  pagos       : pagosPermisos;
  empleados   : empleadosPermisos;

  constructor(private toastr:ToastrService,private db:DbService,private auth:SeguridadService, private wtablas:TablasBasicasService) { }

  ngOnInit() {
    this.permisos = this.initPermisosDefault();
    this.cargarUsuarios();
  }


  cargarUsuarios(){
    this.wtablas.getUsuario().subscribe((resp) => {
      this.usuarios = resp;
    });
  }

  

  cargarPermisos(username) {
    console.log(username)
    this.db.getDoc('permisos',username).subscribe((resp:PermisosUsuario) => {
      
      console.log(resp);
      this.permisos = resp;
      console.log(this.permisos);
    })
  }



  reset(){
    this.username = "";
    this.email = "";
    this.password = "";
    
  }



  initPermisosDefault(){

    this.contabilidad = {
      puc                  : false,
      comprobantesContables: false,
      conciliacion         : false,
      informes             : false,
      libroAux             : false,
      traslados            : false,

    }

    this.facturacion = {
      cotizacion:false,
      crear:false,
      despachos:false,
      listado:false,
      proforma:false,
      notaDebitoV   : false,
      notaCreditoV: false,

    }

    this.inventario = {
      bodegas          : false,
      orden            : false,
      crearNotaCredito : false,
      crearOrden       : false,
      ingresarOrden    : false,
      productos        : false,
      listadoProductos : false,
      notaCredito      : false,
      ajuste           : false,
      consumo          : false,
      kardex           : false,
  } 
  this.pagos = {
      cxp    : false,
      egresos: false,
      crear  : false,   
  } 
  this.cobros = {
      cxc    : false,
      ingreso: false,
      crear  : false,   
  } 
  this.empleados = {
      crear  : false,
      listado: false,
    
  } 



    let permisos = {
      superusuario:false,
      wtablas:false,
      contabilidad:this.contabilidad,
      facturacion:this.facturacion,
      inventario:this.inventario,
      pagos:this.pagos,
      cobros:this.cobros,
      empleados:this.empleados

    }

    return  permisos;


  }
  guardar(){
    let data = {
      "username":this.username,
      "email":this.email,
      "password":this.password
    }
    this.auth.registrarUsuario(data).subscribe(resp => {

      let p = this.initPermisosDefault();
      // console.log(this.permisos);
      this.db.createDoc(p,'permisos/',resp.user).then(() =>{
        this.reset();
        this.toastr.success('Usuario creado');
      });

      this.cargarUsuarios();
      console.log(resp)
    })
  }

  guardarPermisos(){
      this.db.createDoc(this.permisos,'permisos/',this.usuario).then(() =>{
        this.toastr.success('permisos creados');
      });
  }


  guardarDefault(){
     let p = this.initPermisosDefault();
    // console.log(this.permisos);
    this.db.createDoc(p,'permisos/',this.usuario).then(() =>{

    });
  }

}
