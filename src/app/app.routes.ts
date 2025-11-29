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
	,
	{
		path: 'validador-asincronico',
		loadComponent: () => import('./forms/validador-asincronico/registro-avanzado.component').then(m => m.RegistroAvanzadoComponent)
	}
	,
	{
		path: 'perfil-usuario',
		loadComponent: () => import('./forms/perfil-usuario/perfil-usuario.component').then(m => m.PerfilUsuarioComponent)
	}
];
