import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: AddClienteComponent
  },
  {
    path: 'clientes',
    component: ListaClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
