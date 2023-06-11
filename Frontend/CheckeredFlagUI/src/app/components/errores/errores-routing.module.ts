import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ErroresComponent } from './errores.component';
const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
  },
  {
    path: '500',
    component: ServerErrorComponent,
  },
  {
    path: '401',
    component:NotAuthorizedComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '400',
    component: NotFoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErroresRoutingModule { }
