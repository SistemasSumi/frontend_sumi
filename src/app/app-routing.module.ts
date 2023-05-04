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
import { ContaGuard } from './guards/conta.guard';



const routes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
    { path: 'crear-usuario', component: RegistrarIzquierdoComponent,canActivate:[AuthGuard]},
    // {
    //   path: 'configuracion', 
    //   component: ConfiguracionComponent,
    //   children: [
    //       { path: 'empresa',component:EmpresaComponent,},
    //       { path: '**',component:ConfiguracionComponent, }
    //   ],
    //   canActivate:[AuthGuard]
    // },

    
    { path: 'configuracion', component: ConfiguracionComponent,canActivate:[AuthGuard]},
    { path: 'tablas-Basicas', component: TablesBasicComponent,canActivate:[AuthGuard]},
    { path: 'puc', component: PucComponent,canActivate:[AuthGuard,ContaGuard]},
    { path: 'libroAux', component: LibroAuxiliarComponent,canActivate:[AuthGuard]},
    { path: 'reportes-contables', component: InformesContabilidadComponent,canActivate:[AuthGuard]},
    { path: 'comprobantes-contables', component: CombrobantesContablesComponent,canActivate:[AuthGuard]},
    { path: 'configuracion/empresa', component: EmpresaComponent,canActivate:[AuthGuard]},
    { path: 'crear-productos', component: ProductosComponent,canActivate:[AuthGuard]},
    { path: 'cxp', component: CuentasxPagarComponent,canActivate:[AuthGuard]},
    { path: 'ce', component: CEComponent,canActivate:[AuthGuard]},
    { path: 'ci', component: CIComponent,canActivate:[AuthGuard]},
    { path: 'listado_ce', component: ListadoCEComponent,canActivate:[AuthGuard]},
    { path: 'listado_ci', component: ListadoCIComponent,canActivate:[AuthGuard]},
    { path: 'informes', component: INFORMESComponent,canActivate:[AuthGuard]},
    { path: 'configuracion_nomina', component: NConfigComponent,canActivate:[AuthGuard]},
    { 
      path: 'productos', 
      component: FacturacionComponent,
        children: [
          { path: 'add',component:CrearProductoComponent,},
          { path: 'listado',component:ListarProductosComponent,},
          { path: 'kardex/:id',component:PreviewKardexComponent,},
          
          { path: 'editar/:id',component:ProductosComponent,},
          { path: '**',component:ProductosComponent, }
      ],
      canActivate:[AuthGuard]
    },
    { path: 'stock', component: StockComponent,canActivate:[AuthGuard]},
    
    { 
      path: 'purchaseOrder', 
      component: OrdenDeCompraComponent,
        children: [
          { path: 'addPurchaseOrder',component:FormOrdenComponent,},
          { path: 'inventoryEntry/:id',component:IngresoComprasComponent,},
          { path: 'inventoryEntryPreview/:id',component:IngresoPreviewComponent,},
          { path: 'EditPurchaseOrder/:id',component:FormOrdenComponent,},
          { path: '**',component:ListOrderComponent, }
      ],
      canActivate:[AuthGuard]
    },
    { 
      path: 'nota-credito', 
      component: NotaCreditoComponent,
        children: [
          { path: 'addNotaCompras',component:FormNotaCreditoComprasComponent,},
          { path: 'listado-nota-credito-compras',component:FormOrdenComponent,},
          { path: '**',component:ListadoNotaCreditoComponent, }
      ],
      canActivate:[AuthGuard]
    },
    { 
      path: 'facturacion', 
      component: FacturacionComponent,
        children: [
          { path: 'addFactura',component:CrearFacturaVentaComponent,},
          { path: 'proformas',component:ProformasComponent,},
          { path: 'facturas',component:ListadoFacturasComponent,},
          { path: 'preview/:id',component:PreviewFacturasComponent,},
          { path: 'editar/:id',component:EditarFacturasComponent,},
          { path: '**',component:CrearFacturaVentaComponent, }
      ],
      canActivate:[AuthGuard]
    },
    { 
      path: 'empleados', 
      component: NEmpleadosComponent,
        children: [
          { path: 'nuevo',component:FormEmpleadoComponent,},
          { path: 'listado',component:ListadoEmpleadoComponent,},
          { path: '**',component:ListadoEmpleadoComponent, }

         
      ],
      canActivate:[AuthGuard]
    },

    // { path: 'nueva-factura', component: FacturacionComponent,canActivate:[AuthGuard]},
    { path: 'terceros', component: TercerosComponent,canActivate:[AuthGuard]},
    { path: 'terceros/:id', component: TercerosComponent,canActivate:[AuthGuard]},
    { path: 'proveedores', component: ListadoProveedoresComponent,canActivate:[AuthGuard]},
    { path: 'clientes', component: ListadoClientesComponent,canActivate:[AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: '', pathMatch: 'full', redirectTo:'login' },
    { path: '**', pathMatch: 'full', redirectTo:'home' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
    
  ]
})
export class AppRoutingModule { }
