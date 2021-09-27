import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAsociacion } from '@app/models/backend';
import { NotificationService } from '@app/services';
import { Subscription } from 'rxjs';
import { AsociacionDeleteComponent } from '../asociacion-delete/asociacion-delete.component';
import { AsociacionService } from '../shared/asociacion.service';

@Component({
  selector: 'app-asociacion-list',
  templateUrl: './asociacion-list.component.html',
  styleUrls: ['./asociacion-list.component.scss'],
})
export class AsociacionListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  asociaciones!: IAsociacion[];
  filtro: string = '';

  constructor(
    private asoService: AsociacionService,
    private notification: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAsociaciones();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAsociaciones(){
    this.subscription.add(
      this.asoService.asociacionAll().subscribe((res) => {
        this.asociaciones = res;
      })
    );
  }

  editAsociacion(aso: IAsociacion) {
    console.log(aso);
  }

  deleteAsociacion(aso: IAsociacion) {
    const dialogDelete = this.dialog.open(AsociacionDeleteComponent, {
      data: aso,
    });
    dialogDelete.afterClosed().subscribe((result) => {
      if (result) {
        this.subscription.add(
          this.asoService.asociacionDelete(aso).subscribe(
            (res) => {
              if (res) {
                this.getAsociaciones();
                this.notification.success('Asociación elimanada!');
              }
            },
            (error) => {
              this.notification.error(`Ocurrio un error: ${error.statusText}`);
            }
          )
        );
      }
    });
  }
}
