import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { RegiaoComponent } from './modules/regiao/regiao.component';
import { RegiaoListComponent } from './modules/regiao/pages/regiao-list/regiao-list.component';
import { RegiaoFormComponent } from './modules/regiao/pages/regiao-form/regiao-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'regiao',
    loadChildren: () => import('./modules/regiao/regiao.module').then(m => m.RegiaoModule)
  },
  { 
    path: '**', 
    redirectTo: '/home' 
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
