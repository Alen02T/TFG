import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErroresRoutingModule } from './errores-routing.module';
import { ErroresComponent } from './errores.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ServerErrorComponent } from './server-error/server-error.component';


@NgModule({
  declarations: [
    ErroresComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    ServerErrorComponent
  ],
  imports: [
    CommonModule,
    ErroresRoutingModule
  ]
})
export class ErroresModule { }
