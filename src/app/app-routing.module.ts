import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/dashboard/components/home/home.component';
import { ConfiguracionComponent } from './components/dashboard/components/configuracion/configuracion.component';
import { EmpresaComponent } from './components/dashboard/components/empresa/empresa.component';
import { ProductosComponent } from './components/dashboard/components/inventario/productos/productos.component';
import { TercerosComponent } from './components/dashboard/components/configuracion/terceros/terceros.component';
import { PucComponent } from './components/dashboard/components/Contabilidad/puc/puc.component';
import { TablesBasicComponent } from './components/dashboard/components/configuracion/TablesBasic/TablesBasic.component';
import { ListadoProveedoresComponent } from './components/dashboard/components/configuracion/terceros/ListadoProveedores/ListadoProveedores.component';
import { CombrobantesContablesComponent } from './components/dashboard/components/Contabilidad/combrobantesContables/combrobantesContables.component';
import { FacturacionComponent } from './components/dashboard/components/Facturacion/Facturacion.component';
import { OrdenDeCompraComponent } from './components/dashboard/components/inventario/ordenDeCompra/ordenDeCompra.component';
import { FormOrdenComponent } from './components/dashboard/components/inventario/ordenDeCompra/form-orden/form-orden.component';
import { ListOrderComponent } from './components/dashboard/components/inventario/ordenDeCompra/list-order/list-order.component';
import { IngresoComprasComponent } from './components/dashboard/components/inventario/ingresoCompras/ingresoCompras.component';
import { IngresoPreviewComponent } from './components/dashboard/components/inventario/ingresoCompras/ingresoPreview/ingresoPreview.component';
import { StockComponent } from './components/dashboard/components/inventario/stock/stock.component';
import { NotaCreditoComponent } from './components/dashboard/components/inventario/notaCredito/notaCredito.component';
import { ListadoNotaCreditoComponent } from './components/dashboard/components/inventario/notaCredito/listadoNotaCredito/listadoNotaCredito.component';
import { FormNotaCreditoComprasComponent } from './components/dashboard/components/inventario/notaCredito/formNotaCreditoCompras/formNotaCreditoCompras.component';
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
import { FormEmpleadoComponent } from './components/dashboard/components/nomina/NEmpleados/formEmpleado/formEmpleado.component';
import { ListadoEmpleadoComponent } from './components/dashboard/components/nomina/NEmpleados/listadoEmpleado/listadoEmpleado.component';
import { ListadoCEComponent } from './components/dashboard/components/CE/ListadoCE/ListadoCE.component';
import { CIComponent } from './components/dashboard/components/CI/CI.component';
import { ListadoCIComponent } from './components/dashboard/components/CI/ListadoCI/ListadoCI.component';
import { ListadoClientesComponent } from './components/dashboard/components/configuracion/terceros/ListadoClientes/ListadoClientes.component';
import { InformesContabilidadComponent } from './components/dashboard/components/Contabilidad/InformesContabilidad/InformesContabilidad.component';
import { RegistrarIzquierdoComponent } from './components/auth/RegistrarIzquierdo/RegistrarIzquierdo.component';
import { PucGuard } from './guards/contabilidad/Puc.guard';
import { SecurityGuard } from './guards/security.guard';
import { PermisosResolveService } from './components/auth/permisos.resolve.service';
import { ProfileComponent } from './components/auth/Profile/Profile.component';
import { ListadoUsuariosComponent } from './components/auth/ListadoUsuarios/ListadoUsuarios.component';
import { PermisosUsuariosComponent } from './components/auth/PermisosUsuarios/PermisosUsuarios.component';
import { SameSizeDivDirective } from './SameSizeDiv.directive';
import { OrdenCompraGuard } from './guards/inventario/ordenCompra.guard';
import { CrearProductosGuard } from './guards/inventario/CrearProductos.guard';
import { VerProductosGuard } from './guards/inventario/VerProductos.guard';
import { KardexGuard } from './guards/inventario/Kardex.guard';
import { BodegasGuard } from './guards/inventario/Bodegas.guard';
import { CrearOrdenCompraGuard } from './guards/inventario/CrearOrden.guard';
import { IngresarGuard } from './guards/inventario/Ingresar.guard';
import { NotasCreditoCGuard } from './guards/inventario/VerNotasCreditoC.guard';
import { CrearNotaCreditoCGuard } from './guards/inventario/CrearNotaCreditoC.guard';
import { LibroAuxGuard } from './guards/contabilidad/LibroAuxiliar.guard';
import { InformesCGuard } from './guards/contabilidad/InformesC.guard';
import { MovimientosCGuard } from './guards/contabilidad/MovimientosC.guard';
import { ProductoDetalleComponent } from './components/dashboard/components/inventario/productos/ProductoDetalle/ProductoDetalle.component';
import { AnimatedPriceDirective } from './AnimatedPrice.directive';
import { CrearComprobanteComponent } from './components/dashboard/components/Contabilidad/combrobantesContables/crear-comprobante/crear-comprobante.component';
import { CuentasxCobrarComponent } from './components/dashboard/components/CuentasxCobrar/CuentasxCobrar.component';
import { EstadoCarteraCliente } from './components/dashboard/reportes/reportesContabilidad/EstadoCarteraCliente';
import { EstadoCarteraClienteComponent } from './components/dashboard/components/INFORMES/clientes/EstadoCarteraCliente/EstadoCarteraCliente.component';
import { CarteraVencidaClientesComponent } from './components/dashboard/components/INFORMES/clientes/CarteraVencidaClientes/CarteraVencidaClientes.component';
import { EstadoCarteraProveedorComponent } from './components/dashboard/components/INFORMES/proveedores/EstadoCarteraCliente/EstadoCarteraProveedor.component';
import { BalanceDePruebaComponent } from './components/dashboard/components/INFORMES/contabilidad/BalanceDePrueba/BalanceDePrueba.component';
import { EstadoSituacionFinancieraComponent } from './components/dashboard/components/INFORMES/contabilidad/EstadoSituacionFinanciera/EstadoSituacionFinanciera.component';
import { CxpComponent } from './components/dashboard/components/INFORMES/contabilidad/cxp/cxp.component';
import { AbonosRecibidosComponent } from './components/dashboard/components/INFORMES/contabilidad/AbonosRecibidos/AbonosRecibidos.component';
import { IV_GENERALComponent } from './components/dashboard/components/INFORMES/inventario/IV_GENERAL/IV_GENERAL.component';
import { IV_VENCIDOComponent } from './components/dashboard/components/INFORMES/inventario/IV_VENCIDO/IV_VENCIDO.component';
import { RotacionComprasComponent } from './components/dashboard/components/INFORMES/inventario/RotacionCompras/RotacionCompras.component';
import { RetencionesComponent } from './components/dashboard/components/configuracion/TablesBasic/modales/Retenciones/Retenciones.component';
import { RetencionesComprasComponent } from './components/dashboard/components/INFORMES/proveedores/RetencionesCompras/RetencionesCompras.component';
import { ComprasDetalladasComponent } from './components/dashboard/components/INFORMES/inventario/ComprasDetalladas/ComprasDetalladas.component';
import { RotacionVentasComponent } from './components/dashboard/components/INFORMES/inventario/RotacionVentas/RotacionVentas.component';
import { VentasComponent } from './components/dashboard/components/INFORMES/ventas/Ventas/Ventas.component';
import { VentasVendedorComponent } from './components/dashboard/components/INFORMES/ventas/VentasVendedor/VentasVendedor.component';
import { TrasladosFondosComponent } from './components/dashboard/components/Contabilidad/TrasladosFondos/TrasladosFondos.component';
import { FormTrasladosComponent } from './components/dashboard/components/Contabilidad/TrasladosFondos/FormTraslados/FormTraslados.component';
import { ListadoTrasladosComponent } from './components/dashboard/components/Contabilidad/TrasladosFondos/ListadoTraslados/ListadoTraslados.component';
import { GastosComponent } from './components/dashboard/components/CuentasxPagar/Gastos/Gastos.component';
import { ProspectoVentaComponent } from './components/dashboard/components/Facturacion/prospectoVenta/prospectoVenta.component';
import { PreviewEmpleadosComponent } from './components/dashboard/components/nomina/NEmpleados/PreviewEmpleados/PreviewEmpleados.component';
import { TrasladosGuard } from './guards/contabilidad/Traslados.guard';
import { CxcGuard } from './guards/cobros/cxc.guard';
import { IngresoGuard } from './guards/cobros/ingreso.guard';
import { ListadoCIGuard } from './guards/cobros/listadoCI.guard';
import { CxpGuard } from './guards/pagos/cxp.guard';
import { EgresoGuard } from './guards/pagos/egreso.guard';
import { ListadoCEGuard } from './guards/pagos/ListadoCE.guard';
import { CrearFacturaGuard } from './guards/facturacion/CrearFactura.guard';
import { ProformaGuard } from './guards/facturacion/proforma.guard';
import { ListadoFacturaGuard } from './guards/facturacion/listado.guard';
import { CotizacionGuard } from './guards/facturacion/Cotizacion.guard';
import { PagosGuard } from './guards/pagos/pagos.guard';
import { NotaCreditoVentasComponent } from './components/dashboard/components/Facturacion/notaCreditoVentas/notaCreditoVentas.component';
import { NotaCreditoVGuard } from './guards/facturacion/NotaCreditoV.guard';
import { CrearNCVComponent } from './components/dashboard/components/Facturacion/notaCreditoVentas/CrearNCV/CrearNCV.component';
import { ListadoNCVComponent } from './components/dashboard/components/Facturacion/notaCreditoVentas/ListadoNCV/ListadoNCV.component';
import { CvfFormComponent } from './components/dashboard/components/Facturacion/prospectoVenta/CcfForm/CcfForm.component';
import { ConciliacionComponent } from './components/dashboard/components/Contabilidad/conciliacion/conciliacion.component';



const routes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
    { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
    // { path: 'home', component: HomeComponent,canActivate:[AuthGuard],resolve: {permisos:PermisosResolveService}},
    { path: 'crear-usuario', component: RegistrarIzquierdoComponent},
    {
      path: 'settings', 
      component: ConfiguracionComponent,
      children: [
          { path: 'crear-usuarios',component:RegistrarIzquierdoComponent,},
          { path: 'listado-usuarios',component:ListadoUsuariosComponent,},
          { path: 'permisos-usuarios',component:PermisosUsuariosComponent,},
          // { path: '**',component:ConfiguracionComponent, }
      ],
      canActivate:[AuthGuard]
    },

    
    { path: 'configuracion', component: ConfiguracionComponent,canActivate:[AuthGuard]},
    { path: 'tablas-Basicas', component: TablesBasicComponent,canActivate:[AuthGuard]},
    { path: 'puc', component: PucComponent,canActivate:[AuthGuard,PucGuard]},
    { 
      path: 'traslados', 
      component: TrasladosFondosComponent,
      children:[

        { path: 'listado',component:ListadoTrasladosComponent,canActivate:[TrasladosGuard] },
        { path: 'nuevo',component:FormTrasladosComponent,canActivate:[TrasladosGuard] },
        { path: 'editar',component:FormTrasladosComponent,canActivate:[TrasladosGuard] },
        { path: '**',component:ListadoTrasladosComponent,canActivate:[TrasladosGuard] }
      ],
      canActivate:[AuthGuard,TrasladosGuard]
    },
    // { path: 'traslados', component: TrasladosFondosComponent,canActivate:[AuthGuard,PucGuard]},
    { path: 'conciliacion', component: ConciliacionComponent,canActivate:[AuthGuard,LibroAuxGuard]},
    { path: 'libroAux', component: LibroAuxiliarComponent,canActivate:[AuthGuard,LibroAuxGuard]},
    { path: 'reportes-contables', component: InformesContabilidadComponent,canActivate:[AuthGuard,InformesCGuard]},
    { path: 'comprobantes-contables', component: CombrobantesContablesComponent,canActivate:[AuthGuard,MovimientosCGuard]},
    { path: 'comprobantes-contables-crear', component: CrearComprobanteComponent,canActivate:[AuthGuard,MovimientosCGuard]},
    
    
    // { path: 'configuracion/empresa', component: EmpresaComponent,canActivate:[AuthGuard]},
    // { path: 'crear-productos', component: ProductosComponent,canActivate:[AuthGuard]},


    { path: 'gastos', component: GastosComponent,canActivate:[AuthGuard,PagosGuard]},
    { path: 'cxp', component: CuentasxPagarComponent,canActivate:[AuthGuard,CxpGuard]},
    { path: 'ce', component: CEComponent,canActivate:[AuthGuard,EgresoGuard]},
    { path: 'listado_ce', component: ListadoCEComponent,canActivate:[AuthGuard,ListadoCEGuard]},
    
    { path: 'cxc', component: CuentasxCobrarComponent,canActivate:[AuthGuard,CxcGuard]},
    { path: 'ci', component: CIComponent,canActivate:[AuthGuard,IngresoGuard]},
    { path: 'listado_ci', component: ListadoCIComponent,canActivate:[AuthGuard,ListadoCIGuard]},
    
    
    { 
      path: 'informes', 
      component: INFORMESComponent,
      children: [
        { path: 'cliente/estadoCartera',component:EstadoCarteraClienteComponent,canActivate:[CxcGuard]},
        { path: 'cliente/CarteraVencida',component:CarteraVencidaClientesComponent,canActivate:[CxcGuard]},
        
        
        { path: 'proveedor/EstadoCartera',component:EstadoCarteraProveedorComponent,canActivate:[CxpGuard]},
        
        
        { path: 'inventario/vencido',component:IV_VENCIDOComponent,canActivate:[BodegasGuard]},
        { path: 'inventario/general',component:IV_GENERALComponent,canActivate:[BodegasGuard]},
        
        { path: 'compras/rotacion',component:RotacionComprasComponent,canActivate:[OrdenCompraGuard]},
        { path: 'compras/retencion',component:RetencionesComprasComponent,canActivate:[OrdenCompraGuard]},
        { path: 'compras/detalladas',component:ComprasDetalladasComponent,canActivate:[OrdenCompraGuard]},


        { path: 'ventas/rotacion',component:RotacionVentasComponent,canActivate:[OrdenCompraGuard]},
        { path: 'ventas/detalladas',component:VentasComponent,canActivate:[OrdenCompraGuard]},
        { path: 'ventas/vendedor',component:VentasVendedorComponent,canActivate:[OrdenCompraGuard]},
        
        { path: 'contabilidad/abonos',component:AbonosRecibidosComponent,canActivate:[InformesCGuard]},
        { path: 'contabilidad/cxp',component:CxpComponent,canActivate:[InformesCGuard]},
        { path: 'contabilidad/BalanceDePrueba',component:BalanceDePruebaComponent,canActivate:[InformesCGuard]},
        { path: 'contabilidad/EstadoSituacionFinanciera',component:EstadoSituacionFinancieraComponent,canActivate:[InformesCGuard]},
        
    ],
      canActivate:[AuthGuard]
    },
    { path: 'configuracion_nomina', component: NConfigComponent,canActivate:[AuthGuard]},
    { 
      path: 'productos', 
      component: ProductosComponent,
        children: [
          { path: 'add',component:CrearProductoComponent,canActivate:[CrearProductosGuard]},
          { path: 'listado',component:ListarProductosComponent,canActivate:[VerProductosGuard]},
          { path: 'kardex/:id',component:PreviewKardexComponent,canActivate:[KardexGuard]},
          
          { path: 'editar/:id',component:CrearProductoComponent,canActivate:[CrearProductosGuard]},
          { path: '**',component:ListarProductosComponent,canActivate:[VerProductosGuard] }
      ],
      canActivate:[AuthGuard]
    },
    { 
      path: 'inventario', 
      component: ProductoDetalleComponent,
        children: [
          { path: 'lotes/:id',component:ListarProductosComponent,canActivate:[VerProductosGuard]},
          { path: 'kardex/:id',component:PreviewKardexComponent,canActivate:[KardexGuard]},
          // { path: '**',component:ProductoDetalleComponent,canActivate:[VerProductosGuard] }
      ],
      canActivate:[AuthGuard,BodegasGuard]
    },
    { path: 'stock', component: StockComponent,canActivate:[AuthGuard,BodegasGuard],},
    
    { 
      path: 'purchaseOrder', 
      component: OrdenDeCompraComponent,
        children: [
          { path: 'addPurchaseOrder',component:FormOrdenComponent,canActivate:[CrearOrdenCompraGuard]},
          { path: 'inventoryEntry/:id',component:IngresoComprasComponent,canActivate:[IngresarGuard]},
          { path: 'inventoryEntryPreview/:id',component:IngresoPreviewComponent,},
          { path: 'EditPurchaseOrder/:id',component:FormOrdenComponent,canActivate:[CrearOrdenCompraGuard]},
          { path: '**',component:ListOrderComponent, canActivate:[OrdenCompraGuard] }
      ],
      canActivate:[AuthGuard,OrdenCompraGuard]
    },
    { 
      path: 'nota-credito', 
      component: NotaCreditoComponent,
        children: [
          { path: 'addNotaCompras',component:FormNotaCreditoComprasComponent,canActivate:[CrearNotaCreditoCGuard]},
          { path: 'listado-nota-credito-compras',component:FormOrdenComponent,canActivate:[NotasCreditoCGuard]},
          { path: '**',component:ListadoNotaCreditoComponent,canActivate:[NotasCreditoCGuard] }
      ],
      canActivate:[AuthGuard,NotasCreditoCGuard]
    },
    { 
      path: 'facturacion', 
      component: FacturacionComponent,
        children: [
          { path: 'addFactura',component:CrearFacturaVentaComponent, canActivate:[AuthGuard,CrearFacturaGuard]},
          { path: 'proformas',component:ProformasComponent, canActivate:[AuthGuard,ProformaGuard]},
          { path: 'facturas',component:ListadoFacturasComponent, canActivate:[AuthGuard,ListadoFacturaGuard]},
          { path: 'cotizacion',component:ProspectoVentaComponent, canActivate:[AuthGuard,CotizacionGuard]},
          { 
            path: 'cotizacion',
            component:ProspectoVentaComponent,
            children: [
              { path: 'add',component:CvfFormComponent, canActivate:[AuthGuard,NotaCreditoVGuard]},
              { path: 'listado',component:ListadoNCVComponent, canActivate:[AuthGuard,NotaCreditoVGuard]},

            ],
            canActivate:[AuthGuard,CotizacionGuard]
          },
          { path: 'preview/:id',component:PreviewFacturasComponent, canActivate:[AuthGuard,ListadoFacturaGuard]},
          { 
            path: 'nota-credito',
            component:NotaCreditoVentasComponent,
            children: [
              { path: 'add',component:CrearNCVComponent, canActivate:[AuthGuard,NotaCreditoVGuard]},
              { path: 'listado',component:ListadoNCVComponent, canActivate:[AuthGuard,NotaCreditoVGuard]},

            ],
            canActivate:[AuthGuard,NotaCreditoVGuard]
          },
          { path: 'editar/:id',component:EditarFacturasComponent,canActivate:[AuthGuard,CrearFacturaGuard]},
          { path: '**',component:CrearFacturaVentaComponent, canActivate:[AuthGuard,CrearFacturaGuard] }
      ],
      canActivate:[AuthGuard]
    },
    // { 
    //   path: 'empleados', 
    //   component: NEmpleadosComponent,
    //     children: [
    //       { path: 'nuevo',component:FormEmpleadoComponent,},
    //       { path: 'listado',component:ListadoEmpleadoComponent,},
    //       // { path: 'preview',component:PreviewEmpleadosComponent,},
    //       { path: '**',component:ListadoEmpleadoComponent, }

         
    //   ],
    //   canActivate:[AuthGuard]
    // },

    // { path: 'nueva-factura', component: FacturacionComponent,canActivate:[AuthGuard]},
    { path: 'preview/empleado', component: PreviewEmpleadosComponent,canActivate:[AuthGuard]},
    { path: 'terceros', component: TercerosComponent,canActivate:[AuthGuard,MovimientosCGuard]},
    { path: 'terceros/:id', component: TercerosComponent,canActivate:[AuthGuard,MovimientosCGuard]},
    { path: 'proveedores', component: ListadoProveedoresComponent,canActivate:[AuthGuard,MovimientosCGuard]},
    { path: 'clientes', component: ListadoClientesComponent,canActivate:[AuthGuard,MovimientosCGuard]},
    { path: 'login', component: LoginComponent },
    { path: '', pathMatch: 'full', redirectTo:'login' },
    { path: '**', pathMatch: 'full', redirectTo:'home' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
   
  ],
 
})
export class AppRoutingModule { }
