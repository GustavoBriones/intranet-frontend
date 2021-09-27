import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@app/shared/guards';

const routes: Routes = [
  {
    path: 'asociacion',
    loadChildren: () => import('./asociacion/asociacion.module').then(a => a.AsociacionModule),
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenedoresRoutingModule { }
