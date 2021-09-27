import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAsociacion } from '@app/models/backend';

@Component({
  selector: 'app-asociacion-delete',
  templateUrl: './asociacion-delete.component.html',
  styleUrls: ['./asociacion-delete.component.scss']
})
export class AsociacionDeleteComponent {

  constructor(
    public dialog: MatDialogRef<AsociacionDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAsociacion
  ) { }

}
