import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICredenciales } from '@app/models/backend';
import { AuthService, NotificationService } from '@app/services';
import { markFormGroupTouched } from '@app/shared/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  form!: FormGroup;
  isInline!: boolean;
  showSpinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
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
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loginOn() {
    if (this.form.valid) {
      this.showSpinner = !this.showSpinner;
      const login: ICredenciales = {
        username: this.form.controls.username.value,
        password: this.form.controls.password.value,
      };
      this.subscription.add(
        this.authService.login(login).subscribe(
          (user) => {
            this.notification.success(`Bienvenido ${user.username}!`);
            this.router.navigate(['/static/home/']);
          },
          (error) => {
            this.notification.error('Ocurrió un error!');
          }
        )
      );
      this.showSpinner = !this.showSpinner;
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
