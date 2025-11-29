import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'registro',
		loadComponent: () => import('./forms/registro/registro.component').then(m => m.RegistroComponent)
	},
	{
		path: 'productos',
		loadComponent: () => import('./forms/productos/productos.component').then(m => m.ProductosComponent)
	}
	,
	{
		path: 'factura',
		loadComponent: () => import('./forms/facturas/factura.component').then(m => m.FacturaComponent)
	}
];
