import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';
import { ButtonDangerModule } from './button-danger/button-danger.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ButtonDangerModule
  ],
  exports: [
    ButtonModule,
    ButtonDangerModule
  ]
})
export class ButtonsModule { }
