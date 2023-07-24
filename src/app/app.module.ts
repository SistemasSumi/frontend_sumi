import { NgModule , LOCALE_ID} from '@angular/core';
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
import { ProfileComponent } from './components/auth/Profile/Profile.component';
import { ActualizarProfileComponent } from './components/auth/Profile/ActualizarProfile/ActualizarProfile.component';
import { InputImageBaseComponent } from './components/dashboard/util/InputImageBase/InputImageBase.component';
import { ListadoUsuariosComponent } from './components/auth/ListadoUsuarios/ListadoUsuarios.component';
import { PermisosUsuariosComponent } from './components/auth/PermisosUsuarios/PermisosUsuarios.component';
import { SameSizeDivDirective } from './SameSizeDiv.directive';
import { ProductoDetalleComponent } from './components/dashboard/components/inventario/productos/ProductoDetalle/ProductoDetalle.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { httpInterceptorProviders } from './providers/http-interceptor.provider';
import { AnimatedPriceDirective } from './AnimatedPrice.directive';
import { Precios_bajos_modalComponent } from './components/dashboard/components/Facturacion/precios_bajos_modal/precios_bajos_modal.component';
import { SkeletonComponent } from './components/dashboard/util/skeleton/skeleton.component';
import { CuentasxCobrarComponent } from './components/dashboard/components/CuentasxCobrar/CuentasxCobrar.component';
import { EstadoCarteraClienteComponent } from './components/dashboard/components/INFORMES/clientes/EstadoCarteraCliente/EstadoCarteraCliente.component';
import { CarteraVencidaClientesComponent } from './components/dashboard/components/INFORMES/clientes/CarteraVencidaClientes/CarteraVencidaClientes.component';
import { EstadoCarteraProveedorComponent } from './components/dashboard/components/INFORMES/proveedores/EstadoCarteraCliente/EstadoCarteraProveedor.component';
import { BalanceDePruebaComponent } from './components/dashboard/components/INFORMES/contabilidad/BalanceDePrueba/BalanceDePrueba.component';
import { EstadoSituacionFinancieraComponent } from './components/dashboard/components/INFORMES/contabilidad/EstadoSituacionFinanciera/EstadoSituacionFinanciera.component';
import { CxcComponent } from './components/dashboard/components/INFORMES/contabilidad/cxc/cxc.component';
import { CxpComponent } from './components/dashboard/components/INFORMES/contabilidad/cxp/cxp.component';
import { AbonosRecibidosComponent } from './components/dashboard/components/INFORMES/contabilidad/AbonosRecibidos/AbonosRecibidos.component';
import { IV_GENERALComponent } from './components/dashboard/components/INFORMES/inventario/IV_GENERAL/IV_GENERAL.component';
import { IV_VENCIDOComponent } from './components/dashboard/components/INFORMES/inventario/IV_VENCIDO/IV_VENCIDO.component';
import { RotacionComprasComponent } from './components/dashboard/components/INFORMES/inventario/RotacionCompras/RotacionCompras.component';
import { RetencionesComprasComponent } from './components/dashboard/components/INFORMES/proveedores/RetencionesCompras/RetencionesCompras.component';
import { ComprasDetalladasComponent } from './components/dashboard/components/INFORMES/inventario/ComprasDetalladas/ComprasDetalladas.component';
import { DateRangeInputComponent } from './components/dashboard/util/DateRangeInput/DateRangeInput.component';
import { RotacionVentasComponent } from './components/dashboard/components/INFORMES/inventario/RotacionVentas/RotacionVentas.component';
import { VentasComponent } from './components/dashboard/components/INFORMES/ventas/Ventas/Ventas.component';
import { VentasVendedorComponent } from './components/dashboard/components/INFORMES/ventas/VentasVendedor/VentasVendedor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



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
    UpperCaseInputDirective,
    ProfileComponent,
    ActualizarProfileComponent,
    InputImageBaseComponent,
    ListadoUsuariosComponent,
    PermisosUsuariosComponent,
    SameSizeDivDirective,
    ProductoDetalleComponent,
    AnimatedPriceDirective,
    Precios_bajos_modalComponent,
    SkeletonComponent,
    CuentasxCobrarComponent,
    EstadoCarteraClienteComponent,
    CarteraVencidaClientesComponent,
    EstadoCarteraProveedorComponent,
    BalanceDePruebaComponent,
    EstadoSituacionFinancieraComponent,
    CxcComponent,
    CxpComponent,
    AbonosRecibidosComponent,
    IV_GENERALComponent,
    IV_VENCIDOComponent,
    RotacionComprasComponent,
    RetencionesComprasComponent,
    ComprasDetalladasComponent,
    DateRangeInputComponent,
    RotacionVentasComponent,
    VentasComponent,
    VentasVendedorComponent




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
    AngularFireMessagingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    PipesModule,
    TooltipModule,
    NgbModule,
   

   
    ToastrModule.forRoot()
  ],
  providers: [DatePipe,CurrencyPipe,FiltroPipe,
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    // httpInterceptorProviders,
    // { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
