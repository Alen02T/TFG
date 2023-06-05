import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./individual/teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'tab-menu',
    loadChildren: () => import('./components/tab-menu/tab-menu.module').then( m => m.TabMenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
