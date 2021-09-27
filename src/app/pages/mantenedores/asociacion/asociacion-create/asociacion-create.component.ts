import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAsociacion } from '@app/models/backend';
import { NotificationService } from '@app/services';
import { markFormGroupTouched } from '@app/shared';
import { Subscription } from 'rxjs';
import { AsociacionService } from '../shared/asociacion.service';

@Component({
  selector: 'app-asociacion-create',
  templateUrl: './asociacion-create.component.html',
  styleUrls: ['./asociacion-create.component.scss'],
})
export class AsociacionCreateComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  form!: FormGroup;
  isInline!: boolean;
  showSpinner: boolean = false;

  constructor(
    private asoService: AsociacionService,
    private notification: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
          ],
        },
      ],
      nombre: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(5)],
        },
      ],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createOn() {
    if (this.form.valid) {
      this.showSpinner = !this.showSpinner;
      const asociacion: IAsociacion = {
        asociacion_id: this.form.controls.id.value,
        nombre: this.form.controls.nombre.value,
      };
      this.subscription.add(
        this.asoService.asociacionCreate(asociacion).subscribe(
          (aso) => {
            this.notification.success(
              `La asociacion ${aso.nombre} fue creada con exito!`
            );
            this.router.navigate(['/mantenedores/asociacion']);
          },
          (error) => {
            this.notification.error(
              `No se pudo crear la Asociación: ${error.statusText}`
            );
          }
        )
      );
      this.showSpinner = !this.showSpinner;
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
