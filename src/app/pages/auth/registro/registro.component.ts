import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@app/models/backend';
import { AuthService, NotificationService } from '@app/services';
import { markFormGroupTouched, regex } from '@app/shared/utils';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  form!: FormGroup;
  isInline!: boolean;
  showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.pattern(regex.email),
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
      apellidos: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(5)],
        },
      ],
      username: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(5)],
        },
      ],
      password: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(5)],
        },
      ],
      passwordRepeat: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(5)],
        },
      ],
    });
  }

  registroOn() {
    if (this.form.valid) {
      this.showSpinner = !this.showSpinner;
      const usuario: IUser = {
        username: this.form.controls.username.value,
        nombre: this.form.controls.nombre.value,
        apellidos: this.form.controls.apellidos.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      };
      this.authservice.registrar(usuario).subscribe(
        (user) => {
          this.notification.success(
            `El usuario ${user.username} fue registrado`
          );
          this.router.navigate(['/static/home']);
        },
        (error) => {
          this.notification.error('Error al realizar el registro');
        }
      );
      this.showSpinner = !this.showSpinner;
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
