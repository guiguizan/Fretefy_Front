import { RouterModule, Routes } from '@angular/router';
import { RegiaoComponent } from './regiao.component';
import { RegiaoListComponent } from './pages/regiao-list/regiao-list.component';
import { RegiaoFormComponent } from './pages/regiao-form/regiao-form.component';

const routes: Routes = [

  {
    path: '',
    component: RegiaoComponent, 
    children: [
      { path: '', component: RegiaoListComponent },
      { path: 'cadastrar', component: RegiaoFormComponent },
      { path: 'editar/:id', component: RegiaoFormComponent }
    ]
  }
];

export const  RegiaoRoutingModule = RouterModule.forChild(routes);