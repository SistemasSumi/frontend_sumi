import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule}  from '@angular/common/http';
import {ReactiveFormsModule,FormsModule } from '@angular/forms'


import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';

import { DataTablesModule } from "angular-datatables";
import { ToastrModule } from 'ngx-toastr';
import { DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CurrencyPipe } from '@angular/common'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/dashboard/components/home/home.component';

import { environment } from 'src/environments/environment';

import { ExitoComponent } from './components/dashboard/util/mensajes/exito/exito.component';

import { InputImageComponent } from './components/dashboard/util/input-image/input-image.component';

import { PipesModule } from './pipes/pipes.module';
import { ConfiguracionComponent } from './components/dashboard/components/configuracion/configuracion.component';
import { EmpresaComponent } from './components/dashboard/components/empresa/empresa.component';
import { InputImageComponent2 } from './components/dashboard/util/input-image-2/input-image.component';
import { ProductosComponent } from './components/dashboard/components/inventario/productos/productos.component';
import { TercerosComponent } from './components/dashboard/components/configuracion/terceros/terceros.component';
import { IngresoComprasComponent } from './components/dashboard/components/inventario/ingresoCompras/ingresoCompras.component';
import { KardexComponent } from './components/dashboard/components/inventario/kardex/kardex.component';
import { StockComponent } from './components/dashboard/components/inventario/stock/stock.component';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { PucComponent } from './components/dashboard/components/Contabilidad/puc/puc.component';
import { TablesBasicComponent } from './components/dashboard/components/configuracion/TablesBasic/TablesBasic.component';
import { FormaPagoModalComponent } from './components/dashboard/components/configuracion/TablesBasic/modales/FormaPagoModal/FormaPagoModal.component';
import { ImpuestosComponent } from './components/dashboard/components/configuracion/TablesBasic/modales/Impuestos/Impuestos.component';
import { RetencionesComponent } from './components/dashboard/components/configuracion/TablesBasic/modales/Retenciones/Retenciones.component';
import { ModalDescuentoClienteComponent } from './components/dashboard/components/configuracion/terceros/modals/ModalDescuentoCliente/ModalDescuentoCliente.component';
import { ModalDescuentoProveedorComponent } from './components/dashboard/components/configuracion/terceros/modals/ModalDescuentoProveedor/ModalDescuentoProveedor.component';
import { ModalRetencionClienteComponent } from './components/dashboard/components/configuracion/terceros/modals/ModalRetencionCliente/ModalRetencionCliente.component';
import { ModalRetencionProveedorComponent } from './components/dashboard/components/configuracion/terceros/modals/ModalRetencionProveedor/ModalRetencionProveedor.component';
import { ListadoProveedoresComponent } from './components/dashboard/components/configuracion/terceros/ListadoProveedores/ListadoProveedores.component';
import { CombrobantesContablesComponent } from './components/dashboard/components/Contabilidad/combrobantesContables/combrobantesContables.component';
import { CrearComprobanteComponent } from './components/dashboard/components/Contabilidad/combrobantesContables/crear-comprobante/crear-comprobante.component';
import { FacturacionComponent } from './components/dashboard/components/Facturacion/Facturacion.component';
import { OrdenDeCompraComponent } from './components/dashboard/components/inventario/ordenDeCompra/ordenDeCompra.component';
import { FormOrdenComponent } from './components/dashboard/components/inventario/ordenDeCompra/form-orden/form-orden.component';
import { ListOrderComponent } from './components/dashboard/components/inventario/ordenDeCompra/list-order/list-order.component';
import { PDividerComponent } from './components/shared/p-divider/p-divider.component';
import { TooltipModule } from './components/shared/tooltip/tooltip.module';
import { IngresoPreviewComponent } from './components/dashboard/components/inventario/ingresoCompras/ingresoPreview/ingresoPreview.component';
import { NotaCreditoComponent } from './components/dashboard/components/inventario/notaCredito/notaCredito.component';
import { FormNotaCreditoComprasComponent } from './components/dashboard/components/inventario/notaCredito/formNotaCreditoCompras/formNotaCreditoCompras.component';
import { ListadoNotaCreditoComponent } from './components/dashboard/components/inventario/notaCredito/listadoNotaCredito/listadoNotaCredito.component';
import { CrearFacturaVentaComponent } from './components/dashboard/components/Facturacion/crear-factura-venta/crear-factura-venta.component';
import { BlurFormatDirective } from './blur-format.directive';
import { ProformasComponent } from './components/dashboard/components/Facturacion/proformas/proformas.component';
import { EditarFacturasComponent } from './components/dashboard/components/Facturacion/editar-facturas/editar-facturas.component';
import { ListadoFacturasComponent } from './components/dashboard/components/Facturacion/ListadoFacturas/ListadoFacturas.component';
import { PreviewFacturasComponent } from './components/dashboard/components/Facturacion/previewFacturas/previewFacturas.component';
import { CrearProductoComponent } from './components/dashboard/components/inventario/productos/crear-producto/crear-producto.component';
import { ListarProductosComponent } from './components/dashboard/components/inventario/productos/listar-productos/listar-productos.component';
import { PreviewKardexComponent } from './components/dashboard/components/inventario/PreviewKardex/PreviewKardex.component';
import { LibroAuxiliarComponent } from './components/dashboard/components/Contabilidad/libro-auxiliar/libro-auxiliar.component';
import { CuentasxPagarComponent } from './components/dashboard/components/CuentasxPagar/CuentasxPagar.component';
import { CEComponent } from './components/dashboard/components/CE/CE.component';
import { INFORMESComponent } from './components/dashboard/components/INFORMES/INFORMES.component';
import { NEmpleadosComponent } from './components/dashboard/components/nomina/NEmpleados/NEmpleados.component';
import { NConfigComponent } from './components/dashboard/components/nomina/NConfig/NConfig.component';
import { ListadoEmpleadoComponent } from './components/dashboard/components/nomina/NEmpleados/listadoEmpleado/listadoEmpleado.component';
import { FormEmpleadoComponent } from './components/dashboard/components/nomina/NEmpleados/formEmpleado/formEmpleado.component';
import { ModalPrestacionesComponent } from './components/dashboard/components/nomina/NEmpleados/modalPrestaciones/modalPrestaciones.component';
import { ListadoCEComponent } from './components/dashboard/components/CE/ListadoCE/ListadoCE.component';
import { CIComponent } from './components/dashboard/components/CI/CI.component';
import { ListadoCIComponent } from './components/dashboard/components/CI/ListadoCI/ListadoCI.component';
import { ModalDatosContactoComponent } from './components/dashboard/components/configuracion/terceros/modals/ModalDatosContacto/ModalDatosContacto.component';
import { ModalDatosBancariosComponent } from './components/dashboard/components/configuracion/terceros/modals/ModalDatosBancarios/ModalDatosBancarios.component';
import { ListadoClientesComponent } from './components/dashboard/components/configuracion/terceros/ListadoClientes/ListadoClientes.component';
import { InformesContabilidadComponent } from './components/dashboard/components/Contabilidad/InformesContabilidad/InformesContabilidad.component';
import { RegistrarIzquierdoComponent } from './components/auth/RegistrarIzquierdo/RegistrarIzquierdo.component';
import { UpperCaseInputDirective } from './to-uppercase.directive';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ExitoComponent,
    InputImageComponent,
    InputImageComponent2,
    ConfiguracionComponent,
    EmpresaComponent,
    FacturacionComponent,
    ProductosComponent,
    TercerosComponent,
    IngresoComprasComponent,
    KardexComponent,
    StockComponent,
    PucComponent,
    TablesBasicComponent,
    FormaPagoModalComponent,
    ImpuestosComponent,
    RetencionesComponent,
    ModalDescuentoClienteComponent,
    ModalDescuentoProveedorComponent,
    ModalRetencionClienteComponent,
    ModalRetencionProveedorComponent,
    ListadoProveedoresComponent,
    CombrobantesContablesComponent,
    CrearComprobanteComponent,
    OrdenDeCompraComponent,
    FormOrdenComponent,
    ListOrderComponent,
    PDividerComponent,
    IngresoComprasComponent,
    IngresoPreviewComponent,
    NotaCreditoComponent,
    ListadoNotaCreditoComponent,
    FormNotaCreditoComprasComponent,
    CrearFacturaVentaComponent,
    BlurFormatDirective,
    ProformasComponent,
    EditarFacturasComponent,
    ListadoFacturasComponent,
    PreviewFacturasComponent,
    CrearProductoComponent,
    ListarProductosComponent,
    PreviewKardexComponent,
    LibroAuxiliarComponent,
    CuentasxPagarComponent,
    CEComponent,
    INFORMESComponent,
    NEmpleadosComponent,
    NConfigComponent,
    ListadoEmpleadoComponent,
    FormEmpleadoComponent,
    ModalPrestacionesComponent,
    ListadoCEComponent,
    CIComponent,
    ListadoCIComponent,
    ModalDatosContactoComponent,
    ModalDatosBancariosComponent,
    ListadoClientesComponent,
    InformesContabilidadComponent,
    RegistrarIzquierdoComponent,
    UpperCaseInputDirective





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    PipesModule,
    TooltipModule,

   
    ToastrModule.forRoot()
  ],
  providers: [DatePipe,CurrencyPipe,FiltroPipe,{provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
