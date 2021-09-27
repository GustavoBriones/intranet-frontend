import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { AsociacionRoutingModule } from './asociacion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, ControlsModule, IndicatorsModule } from '@app/shared';
import { AsociacionCreateComponent } from './asociacion-create/asociacion-create.component';
import { AsociacionListComponent } from './asociacion-list/asociacion-list.component';
import { AsociacionDeleteComponent } from './asociacion-delete/asociacion-delete.component';
import { FiltroAsociacionPipe } from './shared/filtro-asociacion.pipe';


@NgModule({
  declarations: [
    AsociacionCreateComponent,
    AsociacionListComponent,
    AsociacionDeleteComponent,
    FiltroAsociacionPipe
  ],
  imports: [
    CommonModule,
    AsociacionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    ControlsModule,
    ButtonsModule,
    IndicatorsModule
  ]
})
export class AsociacionModule { }
