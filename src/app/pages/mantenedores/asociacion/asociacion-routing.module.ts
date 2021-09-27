import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociacionCreateComponent } from './asociacion-create/asociacion-create.component';
import { AsociacionListComponent } from './asociacion-list/asociacion-list.component';

const routes: Routes = [
  {
    path: '',
    component: AsociacionListComponent
  },
  {
    path: 'crear',
    component: AsociacionCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsociacionRoutingModule { }
